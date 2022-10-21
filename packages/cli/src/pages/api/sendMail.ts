import type { NextApiRequest, NextApiResponse } from "next";
import { MjmlError } from "mjml-react";
import { sendMail } from "../../moduleManifest";
import renderTemplate from "../../util/renderTemplate";

type Data = {
  error?: string; // api error messages
  mjmlErrors?: MjmlError[];
  result?: any;
};

async function validApiKey(apiKey: string | string[] | undefined) {
  if (!apiKey) return false;

  const host = process.env.MM_DEV ? "http://localhost:3883" : "yourInstallUrl";
  const response = await fetch(`${host}/api/apiKeys/${apiKey}/validate`);

  return 200 === response.status;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { templateName, previewName, props, ...mailOptions } = req.body;

  let html = req.body.html;

  if (!(await validApiKey(req.headers && req.headers["x-api-key"])))
    return res.status(401).json({
      error: "invalid API key",
    });

  // validate at least one of to, cc, bcc exists
  if (
    typeof mailOptions.to === "undefined" &&
    typeof mailOptions.cc === "undefined" &&
    typeof mailOptions.bcc === "undefined"
  ) {
    return res.status(403).json({ error: "to, cc, or bcc must be specified" });
  }

  // validate subject
  if (typeof mailOptions.subject !== "string") {
    return res.status(403).json({ error: "subject must be specified" });
  }

  if (!html) {
    // validate template name
    if (typeof templateName !== "string") {
      return res
        .status(403)
        .json({ error: "templateName or html must be specified" });
    }

    // render template if html doesn't exist
    const {
      error,
      mjmlErrors,
      html: renderedHtml,
    } = renderTemplate(templateName.replace(/\.[jt]sx?$/, ""), props);

    if (error) {
      return res.status(404).json({ error, mjmlErrors });
    }
    html = renderedHtml;
  }

  const sendMailResult = await sendMail({ previewName, ...mailOptions });

  res.status(200).json({ result: sendMailResult });
}
