module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom-fourteen",
  testMatch: ["**/__integration_tests__/**/*.ts"],
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json",
    },
  },
};
