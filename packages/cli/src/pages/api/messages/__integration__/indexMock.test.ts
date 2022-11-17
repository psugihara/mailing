import { NextApiRequest, NextApiResponse } from "next";
import { createMocks } from "node-mocks-http";
import messagesIndex from "../index";
import createMessage from "../../../../util/createMessage";
import { createApiKey } from "../../__integration__/util/apiKeys";

jest.mock("../../../../util/createMessage");

describe("/api/messages", () => {
  describe("GET", () => {
    test("returns 405", async () => {
      const { req, res } = createMocks({
        method: "GET",
        query: {
          animal: "dog",
        },
      });

      await messagesIndex(
        req as unknown as NextApiRequest,
        res as unknown as NextApiResponse
      );

      expect(res.statusCode).toBe(405);
    });
  });

  describe("POST", () => {
    test("calls createMessage with ", async () => {
      const { req, res } = createMocks({
        method: "POST",
        body: {
          to: "to@mailing.dev",
          from: "from@mailing.dev",
          html: "<h1>Hello</h1>",
          subject: "Hello",
          templateName: "template",
          previewName: "preview",
        },
        headers: {
          "x-api-key": await createApiKey(),
        },
      });

      await messagesIndex(
        req as unknown as NextApiRequest,
        res as unknown as NextApiResponse
      );

      expect(createMessage).toHaveBeenCalledTimes(1);
      expect(createMessage).toHaveBeenCalledWith({
        to: "to@mailing.dev",
        from: "from@mailing.dev",
        html: "<h1>Hello</h1>",
        subject: "Hello",
        templateName: "template",
        previewName: "preview",
      });
    });
  });
});
