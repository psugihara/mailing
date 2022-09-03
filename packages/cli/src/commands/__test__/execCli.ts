import { exec } from "child_process";

export async function execCli(command: string, opts?: { debug: boolean }) {
  return new Promise((resolve, reject) => {
    const child = exec(`FORCE_COLOR=0 ${__dirname}/../../dev.js ${command}`);
    let out = "";
    child.stdout?.on("data", (stream) => {
      out += stream.toString();
      if (opts?.debug) console.log(out);
    });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code) {
        reject(new Error(`existd with code ${code}`));
      }
      resolve(out);
    });
  });
}

export function execCliChild(command: string, opts?: { debug: boolean }) {
  return exec(`FORCE_COLOR=0 ${__dirname}/../../dev.js ${command}`);
}
