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
    "!<rootDir>/src/main/adapters/**/*.ts",
    "!<rootDir>/src/main/factories/**/*.ts",
    "!<rootDir>/src/main/server/server.ts",
    "!<rootDir>/src/main/config/**/*.ts",
    "!<rootDir>/src/main/index.ts",
  ],
  coverageDirectory: "coverage",
};
