module.exports = {
  roots: ["<rootDir>/src"],
  preset: "ts-jest",
  setupFiles: ["dotenv/config"],
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  verbose: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageDirectory: "coverage",
};
