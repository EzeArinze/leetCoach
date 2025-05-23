import { Button } from "../../components/ui/button";
import { Loader2, BookmarkPlus, CheckCircle, HelpCircle } from "lucide-react";
// import CodeMirrorEditor from "./code-mirror-editor";
import { lazy, Suspense } from "react";
import { useSupabaseUser } from "../../hooks/useSupabaseUser";

const CodeMirrorEditor = lazy(() => import("./code-mirror-editor"));

interface ProblemInputProps {
  problem: string;
  setProblem: (value: string) => void;
  onGetTips: () => void;
  onExplainProblem: () => void;
  onSaveForLater: () => void;
  isLoadingTips: boolean;
  isLoadingExplanation: boolean;
  isSaved: boolean;
}

export default function ProblemInput({
  problem,
  setProblem,
  onGetTips,
  onExplainProblem,
  onSaveForLater,
  isLoadingTips,
  isLoadingExplanation,
  isSaved,
}: ProblemInputProps) {
  const { user } = useSupabaseUser();

  const isDisabled = !user || !problem.trim() || isSaved;

  return (
    <div className="space-y-4">
      <Suspense
        fallback={
          <div className="border rounded-md bg-gray-900 text-gray-400 p-4 min-h-[250px] flex items-center justify-center">
            Loading editor...
          </div>
        }
      >
        <CodeMirrorEditor
          value={problem}
          onChange={setProblem}
          placeholder="Paste your LeetCode problem here..."
          language="javascript"
        />
      </Suspense>

      <div className="grid grid-cols-1 gap-3 w-full sm:grid-cols-2 sm:gap-3">
        <Button
          className="w-full"
          onClick={onGetTips}
          disabled={isLoadingTips || !problem.trim()}
        >
          {isLoadingTips ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Thinking...
            </>
          ) : (
            "Get Tips & Hints"
          )}
        </Button>

        <Button
          className="w-full"
          variant="outline"
          onClick={onExplainProblem}
          disabled={isLoadingExplanation || !problem.trim()}
        >
          {isLoadingExplanation ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <HelpCircle className="mr-2 h-4 w-4" />
              Help Me Understand
            </>
          )}
        </Button>

        <Button
          className="w-full"
          variant="secondary"
          onClick={onSaveForLater}
          disabled={isDisabled}
        >
          {isSaved ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Saved
            </>
          ) : (
            <>
              {!user ? (
                <>
                  <BookmarkPlus className="mr-2 h-4 w-4" />
                  Sign in to save
                </>
              ) : (
                <>
                  <BookmarkPlus className="mr-2 h-4 w-4" />
                  Save For Later
                </>
              )}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
