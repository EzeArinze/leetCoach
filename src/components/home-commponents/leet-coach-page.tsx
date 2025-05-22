import { useState } from "react";

import SavedProblems from "../leet-components/saved-problems";
import ProblemInput from "../leet-components/problem-input";
import { toast } from "sonner";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import type { SavedProblem } from "../../utils/types";
import { useStreamTips } from "../../services/api-services/request-tips";
// import { useRequestExplanation } from "../../services/api-services/request-explanation";
import { useResponseContext } from "../../context/response-context";
import { useStreamExplanation } from "../../services/api-services/request-explanation";

export default function Home() {
  const [problem, setProblem] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [savedProblems, setSavedProblems] = useLocalStorage<SavedProblem[]>(
    "savedProblems",
    []
  );

  const { setTipResponse, setExplanationResponse } = useResponseContext();

  const { mutate: TipsMutattion, isPending: isLoadingTips } = useStreamTips(
    (token) => {
      setTipResponse((prev: string) => prev + token);
    }
  );

  const { mutate: ExplanationMutation, isPending: isLoadingExplanation } =
    useStreamExplanation((token) => {
      setExplanationResponse((prev: string) => prev + token);
    });

  const handleGetTips = async () => {
    if (!problem.trim()) return;
    setTipResponse("");

    TipsMutattion(problem, {
      onError: (error) => {
        console.error("Error fetching tips:", error);
        setTipResponse("Failed to fetch tips");
      },
    });
  };

  const handleExplainProblem = async () => {
    if (!problem.trim()) return;
    setExplanationResponse("");

    ExplanationMutation(problem, {
      onError(error) {
        toast.error(error.message);
        setExplanationResponse("Failed to get explanation on this problem");
      },
    });
  };

  const handleSaveForLater = () => {
    if (!problem.trim()) return;

    const newProblem = {
      id: savedProblems.length + 1,
      title: `Problem ${savedProblems.length + 1}`,
      description:
        problem.substring(0, 100) + (problem.length > 100 ? "..." : ""),
    };

    setSavedProblems([...savedProblems, newProblem]);
    setIsSaved(true);

    toast("Event has been created", {
      duration: 3000,
    });
    setTimeout(() => setIsSaved(false), 3000);
  };

  const loadSavedProblem = (problemText: string) => {
    setProblem(problemText);
    // Reset responses
    setTipResponse("");
    setExplanationResponse("");
  };

  return (
    <section className="flex-1 flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow-md m-2 p-4">
      <main className="flex min-[80%] flex-col items-center w-full p-4 rounded-lg">
        <div className="w-full max-w-[800px] space-y-8">
          <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                AI LeetCode Coach
              </h1>
              <SavedProblems
                savedProblems={savedProblems}
                onLoadProblem={loadSavedProblem}
              />
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              Paste your LeetCode problem below to get tips, explanations, and
              guidance - not just solutions.
            </p>
          </div>
          <div className="space-y-6 w-full">
            <ProblemInput
              problem={problem}
              setProblem={setProblem}
              onGetTips={handleGetTips}
              onExplainProblem={handleExplainProblem}
              onSaveForLater={handleSaveForLater}
              isLoadingTips={isLoadingTips}
              isLoadingExplanation={isLoadingExplanation}
              isSaved={isSaved}
            />
          </div>
        </div>
      </main>
    </section>
  );
}
