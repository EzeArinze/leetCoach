import { useState } from "react";

import { Play, Beaker, LogIn } from "lucide-react";
import { Button } from "../ui/button";
import { getPlaceholder } from "../../utils/constant";
import type { ExecutionResult } from "../../utils/types";
import { executeCode } from "../../utils/simulate";
import { useLanguageContext } from "../../context/language-context";
import Error from "../error";

import { lazy, Suspense } from "react";
import { useSupabaseUser } from "../../hooks/useSupabaseUser";

const CodeMirrorEditor = lazy(() => import("./code-mirror-editor"));

export default function SolutionEditor() {
  const [isRunning, setIsRunning] = useState(false);
  const [executionResult, setExecutionResult] =
    useState<ExecutionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [solution, setSolution] = useState("");

  const { selectedLanguage } = useLanguageContext();
  const { user } = useSupabaseUser();

  const isDisabled = !user || isRunning || !solution.trim();

  // Define some default test cases for the Two Sum problem
  const testCases = [
    { input: [2, 7, 11, 15], target: 9, expected: [0, 1] },
    { input: [3, 2, 4], target: 6, expected: [1, 2] },
  ];

  const handleRunCode = async () => {
    if (!solution.trim()) return;

    setIsRunning(true);
    setExecutionResult(null);
    setError(null);

    try {
      // Simulate code execution (replace with real API call if needed)
      const result = await executeCode(solution, selectedLanguage, testCases);
      setExecutionResult(result);
    } catch (err) {
      console.error("Error running code:", err);
      setError("An unknown error occurred while testing solution");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-hidden">
        <Suspense
          fallback={
            <div className="border rounded-md bg-gray-900 text-gray-400 p-4 min-h-[250px] flex items-center justify-center">
              Loading editor...
            </div>
          }
        >
          <CodeMirrorEditor
            value={solution}
            onChange={setSolution}
            placeholder={getPlaceholder(selectedLanguage)}
            headerTitle="Your Solution"
            className="h-full"
          />
        </Suspense>
      </div>

      <div className="mt-4 shrink-0">
        <Button
          className="w-full"
          onClick={handleRunCode}
          disabled={isDisabled}
        >
          {isRunning ? (
            <>
              <Beaker className="mr-2 h-4 w-4 animate-spin" />
              Running...
            </>
          ) : (
            <>
              {!user ? (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign in To Run
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Run Code
                </>
              )}
            </>
          )}
        </Button>
      </div>
      <Error error={error || null} />

      {executionResult && (
        <div className="mt-4 border rounded-md overflow-hidden shrink-0">
          <div className="bg-gray-800 text-gray-300 px-4 py-2 text-xs font-medium border-b border-gray-700 flex justify-between">
            <span>Output</span>
            {executionResult.executionTime && executionResult.memoryUsed && (
              <span>
                Runtime: {executionResult.executionTime} | Memory:{" "}
                {executionResult.memoryUsed}
              </span>
            )}
          </div>
          <div className="bg-gray-900 text-gray-100 p-4 font-mono text-sm whitespace-pre-wrap max-h-[150px] overflow-auto hide-scrollbar">
            {/* {executionResult.output} */}

            {executionResult.testResults &&
              executionResult.testResults.length > 0 && (
                <div className="">
                  <div className="font-semibold mb-2">Test Results:</div>
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b border-gray-800">
                        <th className="pb-2">Input</th>
                        <th className="pb-2">Expected</th>
                        <th className="pb-2">Output</th>
                        <th className="pb-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {executionResult.testResults.map((test, index) => (
                        <tr key={index} className="border-b border-gray-800">
                          <td className="py-2 pr-4">{test.input}</td>
                          <td className="py-2 pr-4">{test.expected}</td>
                          <td className="py-2 pr-4">{test.actual}</td>
                          <td className="py-2">
                            <span
                              className={
                                test.passed ? "text-green-500" : "text-red-500"
                              }
                            >
                              {test.passed ? "✓ Passed" : "✗ Failed"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
}
