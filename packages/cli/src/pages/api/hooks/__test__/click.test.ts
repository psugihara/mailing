import { NextApiRequest, NextApiResponse } from "next";
import { createMocks } from "node-mocks-http";
import Analytics from "../../../../util/analytics";
import handleClick from "../click";
import prisma from "../../../../../prisma";

jest.mock("../../../../util/analytics");

describe("/api/hooks/click", () => {
  describe("POST", () => {
    test("returns 405", async () => {
      const { req, res } = createMocks({
        method: "POST",
        query: {
          animal: "dog",
        },
      });

      await handleClick(
        req as unknown as NextApiRequest,
        res as unknown as NextApiResponse
      );

      expect(res.statusCode).toBe(405);
    });
  });

  describe("GET", () => {
    test("redirects correctly", async () => {
      jest.spyOn(prisma.click, "upsert").mockImplementation();
      const url = "http://mailing.dev/fun?utm_source=test";
      const messageId = "abcd-1234";
      const encoded = Buffer.from(url).toString("base64");
      const { req, res } = createMocks({
        method: "GET",
        query: {
          url: encoded,
          messageId: messageId,
        },
      });

      await handleClick(
        req as unknown as NextApiRequest,
        res as unknown as NextApiResponse
      );

      expect(res.statusCode).toBe(307);
      expect(res._getRedirectUrl()).toBe(url);
      // Ensure analytics are called
      expect(Analytics.track).toHaveBeenCalledTimes(1);
      expect(Analytics.track).toHaveBeenCalledWith({
        event: "email.click",
        properties: {
          url: url,
          messageId: messageId,
        },
      });
    });
  });
});
