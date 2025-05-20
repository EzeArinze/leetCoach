import { Button } from "../../components/ui/button";
import { Loader2, BookmarkPlus, CheckCircle, HelpCircle } from "lucide-react";
import CodeMirrorEditor from "./code-mirror-editor";

// Dynamically import CodeMirror to avoid SSR issues
// const CodeMirrorEditor = dynamic(() => import("./code-mirror-editor"), {
//   ssr: false,
//   loading: () => (
//     <div className="border rounded-md bg-gray-900 text-gray-400 p-4 min-h-[250px] flex items-center justify-center">
//       Loading editor...
//     </div>
//   ),
// });

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
  return (
    <div className="space-y-4">
      <CodeMirrorEditor
        value={problem}
        onChange={setProblem}
        placeholder="Paste your LeetCode problem here..."
        language="javascript"
      />

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          className="flex-1"
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
          className="flex-1"
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
          className="flex-1"
          variant="secondary"
          onClick={onSaveForLater}
          disabled={!problem.trim() || isSaved}
        >
          {isSaved ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Saved
            </>
          ) : (
            <>
              <BookmarkPlus className="mr-2 h-4 w-4" />
              Save For Later
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
