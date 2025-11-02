/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "tsconfig.json" }],
  },
  moduleNameMapper: {
    // Handle CSS imports (stub them)
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    // Handle path aliases (if you use @/components etc)
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};
