import { execCli } from "./execCli";

jest.mock("../../util/log");

describe("init command", () => {
  it("fails without vercel login", async () => {
    await expect(async () => {
      await execCli("deploy");
    }).rejects.toThrowError(
      /Error: No existing credentials found\. Please run `vercel login`/
    );
  });
});
