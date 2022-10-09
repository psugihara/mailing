import type { Config } from "jest";
import nextJest from "next/jest";

let config: Config;

const shared = {
  setupFilesAfterEnv: ["<rootDir>/testSetup.ts"],
};

if (process.env.NEXT_CLI_TESTS) {
  const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: "./packages/cli",
  });

  // Add any custom config to be passed to Jest
  const customJestConfig = {
    ...shared,
    testEnvironment: "jest-environment-jsdom",
    testMatch: [
      "<rootDir>/packages/cli/src/pages/**/__test__/**/*.[jt]s?(x)",
      "<rootDir>/packages/cli/src/components/**/__test__/**/*.[jt]s?(x)",
    ],
  };

  // createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
  config = createJestConfig(customJestConfig);
} else {
  config = {
    ...shared,
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
}

export default config;
