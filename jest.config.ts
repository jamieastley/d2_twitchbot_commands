import { Config } from "jest";

const config: Config = {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts", "!**/vendor/**"],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  transform: {
    ".(ts|tsx)": ["ts-jest", { tsconfig: "tsconfig.test.json" }],
  },
  coverageReporters: ["json-summary", "clover", "text"],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/coverage",
    "package.json",
    "package-lock.json",
    "pnpm-lock.json",
    "jest.setup.ts",
  ],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

module.exports = config;
