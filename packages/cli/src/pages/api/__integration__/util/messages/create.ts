import { Api } from "../index";
import { createApiKey } from "../apiKeys";

interface CreateMessageFormData {
  to: string | string[];
  bcc?: string | string[];
  cc?: string | string[];
  from: string;
  subject: string;
  html: string;
  templateName?: string;
  previewName?: string;
}

export async function apiCreateMessage() {
  const apiKey = await createApiKey();
  const instance = new ApiCreateMessage({ apiKey });
  return instance.perform();
}

export class ApiCreateMessage extends Api<CreateMessageFormData> {
  path = "/api/messages";

  formData = {
    to: `ok${Math.random()}@ok.com`,
    from: "from@mailing.dev",
    subject: "subject",
    html: "<body>html</body>",
  };

  constructor({ apiKey }: { apiKey?: string } = {}) {
    super();
    this.fetchData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (apiKey) {
      this.fetchData.headers["X-API-Key"] = apiKey;
    }
  }
}
