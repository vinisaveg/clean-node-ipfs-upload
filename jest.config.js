module.exports = {
  roots: ["<rootDir>/src"],
  preset: "ts-jest",
  setupFiles: ["dotenv/config"],
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  verbose: true,
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/infra/uploader/pinata/utils/pinata-helper.ts",
  ],
  coverageDirectory: "coverage",
};
