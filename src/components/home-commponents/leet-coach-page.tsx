import { useState } from "react";

import SavedProblems from "../leet-components/saved-problems";
import ProblemInput from "../leet-components/problem-input";
import ResponseDisplay from "../leet-components/response-display";
import AdditionalResources from "../leet-components/additional-resources";
import { toast } from "sonner";
import {
  tipsResponse,
  explanationResponseValue,
} from "../../utils/constants/dummyResponse";
import { useLocalStorage } from "../../hooks/useLocalStorage";

interface SavedProblem {
  id: number;
  title: string;
  description: string;
}

export default function Home() {
  const [problem, setProblem] = useState("");
  const [tipResponse, setTipResponse] = useState("");
  const [explanationResponse, setExplanationResponse] = useState("");
  const [isLoadingTips, setIsLoadingTips] = useState(false);
  const [isLoadingExplanation, setIsLoadingExplanation] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const [savedProblems, setSavedProblems] = useLocalStorage<SavedProblem[]>(
    "savedProblems",
    []
  );

  const handleGetTips = async () => {
    if (!problem.trim()) return;

    setIsLoadingTips(true);
    setTipResponse("");
    setShowResources(false);

    // Simulate AI response with a delay
    setTimeout(() => {
      setIsLoadingTips(false);
      setTipResponse(tipsResponse);
    }, 2000);
  };

  const handleExplainProblem = async () => {
    if (!problem.trim()) return;

    setIsLoadingExplanation(true);
    setExplanationResponse("");
    setShowResources(false);

    // Simulate AI response with a delay
    setTimeout(() => {
      setIsLoadingExplanation(false);
      setExplanationResponse(explanationResponseValue);
    }, 2000);
  };

  const handleSaveForLater = () => {
    if (!problem.trim()) return;

    // Create a new problem entry
    const newProblem = {
      id: savedProblems.length + 1,
      title: `Problem ${savedProblems.length + 1}`,
      description:
        problem.substring(0, 100) + (problem.length > 100 ? "..." : ""),
    };

    // Add to saved problems
    setSavedProblems([...savedProblems, newProblem]);
    setIsSaved(true);

    toast("Event has been created", {
      description: "Sunday, December 03, 2023 at 9:00 AM",
      duration: 3000,
    });

    // Reset saved status after 3 seconds for demo purposes
    setTimeout(() => setIsSaved(false), 3000);
  };

  const loadSavedProblem = (problemText: string) => {
    setProblem(problemText);
    // Reset responses
    setTipResponse("");
    setExplanationResponse("");
    setShowResources(false);
  };

  const handleDontUnderstand = () => {
    setShowResources(true);
  };

  return (
    <section className="flex-1 flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow-md m-2 p-6">
      <main className="flex min-h-screen flex-col items-center w-full p-4 rounded-lg">
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

            {(tipResponse || explanationResponse) && (
              <ResponseDisplay
                tipResponse={tipResponse}
                explanationResponse={explanationResponse}
                onDontUnderstand={handleDontUnderstand}
              />
            )}

            {showResources && <AdditionalResources />}
          </div>
        </div>
      </main>
    </section>
  );
}
