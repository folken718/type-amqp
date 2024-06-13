export default [
  {
    files: ["src/**/*.js", "src/**/*.ts" ],
    ignores: ["**./dist", "**./node_modules", "**/.vscode"],  
    rules: {
      semi: "error",
      "prefer-const": "error"
    }
  }
];