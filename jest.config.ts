import type { Config } from "jest";

const config: Config = {
  setupFilesAfterEnv: ["<rootDir>/testSetup.ts"],
  preset: "ts-jest",
  testEnvironment: "node",
  // TODO: keep testTimeout low and use jest.setTimeout for long ones
  testTimeout: 60000,
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js)$": "babel-jest",
  },
  testPathIgnorePatterns: [
    "scripts",
    "<rootDir>/emails/",
    "<rootDir>/.mailing/",
    "<rootDir>/packages/cli/.mailing/",
    "<rootDir>/packages/cli/src/pages",
    "<rootDir>/packages/cli/src/components",
  ],
  watchPathIgnorePatterns: [
    "<rootDir>/emails/",
    "<rootDir>/packages/cli/src/emails/",
    "<rootDir>/packages/cli/src/generator_templates/ts/emails/",
    "<rootDir>/.mailing/",
    "tmp-testMailQueue.json",
  ],
};

export default config;
