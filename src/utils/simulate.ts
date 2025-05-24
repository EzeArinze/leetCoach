import axios from "axios";

const KEY = import.meta.env.VITE_JUDGE_API;

export const executeCode = async (
  code: string,
  language: string,
  testCases: { input: string; expected: string }[]
) => {
  const langMap: Record<string, number> = {
    javascript: 63,
    python: 71,
    cpp: 54,
    java: 62,
  };

  const languageId = langMap[language.toLowerCase()];
  const results = [];

  for (const testCase of testCases) {
    // Dynamically create full source code with function call
    const fullCode = `${code}

// Run test case
console.log(JSON.stringify(${testCase.input}));`;

    const { data: submission } = await axios.post(
      "https://judge0-ce.p.rapidapi.com/submissions",
      {
        source_code: fullCode,
        language_id: languageId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": `${KEY}`,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
      }
    );

    const token = submission.token;

    // Poll until execution is complete
    let result;
    while (true) {
      const { data: res } = await axios.get(
        `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
        {
          headers: {
            "X-RapidAPI-Key": `${KEY}`,
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
        }
      );

      if (res.status.id >= 3) {
        result = res;
        break;
      }
      await new Promise((r) => setTimeout(r, 1000));
    }

    const actual = result.stdout?.trim();
    results.push({
      input: testCase.input,
      expected: testCase.expected,
      actual,
      passed: actual === testCase.expected,
      executionTime: result.time,
      memoryUsed: `${result.memory} KB`,
    });
  }

  return {
    success: true,
    output: "Execution completed",
    testResults: results,
  };
};
