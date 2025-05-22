export type Tips = {
  tips: string;
};

export interface SavedProblem {
  id: number;
  title: string;
  description: string;
}

export interface SolutionEditorProps {
  solution: string;
  setSolution: (value: string) => void;
  // language: "javascript" | "python" | "java" | "cpp";
}

export interface TestResult {
  input: string;
  expected: string;
  actual: string;
  passed: boolean;
}

export interface ExecutionResult {
  success: boolean;
  output: string;
  testResults?: TestResult[];
  error?: string;
  executionTime?: string;
  memoryUsed?: string;
}
