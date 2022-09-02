import { resolve } from "path";
import { outputFile, readdirSync } from "fs-extra";
import { ArgumentsCamelCase } from "yargs";
import { getPreviewsDirectory } from "../util/paths";
import { error, log } from "../util/log";
import { render } from "../util/mjml";
import registerRequireHooks from "./util/registerRequireHooks";
import { capture } from "../util/postHog";
import { defaults, setConfig } from "../util/config";
import { buildHandler } from "../util/buildHandler";

export type ExportPreviewsArgs = ArgumentsCamelCase<{
  emailsDir?: string;
  outDir?: string;
  quiet?: boolean;
  anonymousId?: string | null;
}>;

export const command = "export-previews";

export const builder = {
  "emails-dir": {
    default: defaults().emailsDir,
    description: "the directory of your email templates",
  },
  "out-dir": {
    default: defaults().outDir,
    description: "directory in which we output the html",
  },
  quiet: {
    default: defaults().quiet,
    descriptioin: "less output",
    boolean: true,
  },
};

export const describe = "export previews as html";

function camelToSnakeCase(str: string) {
  return str
    .replace(/[A-Z]/g, (letter: string) => `_${letter.toLowerCase()}`)
    .replace(/^_/, "");
}

export function previewFilename(moduleName: string, functionName: string) {
  return camelToSnakeCase(
    `${moduleName.replace(/\.[j|t]sx/, "")}_${functionName}.html`
  );
}

export const handler = buildHandler(
  async (argv: ExportPreviewsArgs) => {
    if (!argv.outDir) throw new Error("outDir option is not set");

    const outDir = argv.outDir;

    if (typeof outDir !== "string") {
      error("please specify an outDir like --outDir ./html");
      return;
    }

    const previewsPath = getPreviewsDirectory(argv.emailsDir);
    if (!previewsPath) {
      error(
        "Could not find emails directory. Have you initialized the project with `mailing init`?"
      );
      return;
    }

    registerRequireHooks();

    log(`Exporting preview html to`);
    log(outDir);

    let count = 0;

    readdirSync(previewsPath)
      .filter((path) => !/^\./.test(path))
      .forEach(async (p) => {
        const previewPath = resolve(previewsPath, p);
        const previewModule = require(previewPath);
        await Promise.all(
          Object.keys(require(previewPath)).map((previewFunction) => {
            const filename = previewFilename(p, previewFunction);
            log(`  |-- ${filename}`);
            count++;

            const { html, errors } = render(previewModule[previewFunction]());
            if (errors.length) {
              error(`MJML errors rendering ${filename}:`, errors);
            }
            return outputFile(resolve(outDir, filename), html);
          })
        );
      });

    log(`✅ Processed ${count} previews`);
  },
  {
    captureOptions: () => {
      return { event: "export-previews invoked" };
    },
  }
);
