import type { ExecutionResult } from "./types";

export const executeCode = (
  code: string,
  language: string,
  testCases: unknown[]
) => {
  console.log(code, language, testCases);

  return new Promise<ExecutionResult>((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        output: "Function executed successfully!",
        testResults: [
          {
            input: "[2,7,11,15], target = 9",
            expected: "[0,1]",
            actual: "[0,1]",
            passed: true,
          },
          {
            input: "[3,2,4], target = 6",
            expected: "[1,2]",
            actual: "[1,2]",
            passed: true,
          },
        ],
        executionTime: "125ms",
        memoryUsed: "12.4MB",
      });
    }, 1000);
  });
};
