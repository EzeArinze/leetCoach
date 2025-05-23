import { Button } from "../../components/ui/button";
import { List, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import {
  useProblemQueries,
  type Problem,
} from "../../services/api-services/problem-service";

interface SavedProblemsProps {
  savedProblems: Problem[] | undefined;
  onLoadProblem: (problemText: string) => void;
}

export default function SavedProblems({
  savedProblems,
  onLoadProblem,
}: SavedProblemsProps) {
  const { useDeleteProblem } = useProblemQueries();
  const { mutate: DeleteProblem } = useDeleteProblem();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <List className="h-4 w-4 mr-2 " />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-xs sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle>Your Saved Problems</DialogTitle>
          <DialogDescription>
            Click on a problem to load it into the editor.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[50vh] overflow-y-auto w-full">
          {savedProblems?.map((savedProblem) => (
            <li key={savedProblem?.title} className="flex items-center w-full">
              <Button
                variant="ghost"
                className="flex-1 justify-start text-left h-auto py-2 min-w-0"
                onClick={() =>
                  onLoadProblem(
                    `${savedProblem.title}: ${savedProblem.description}`
                  )
                }
              >
                <div className="w-full min-w-0">
                  <div className="font-medium">{savedProblem.title}</div>
                  <div className="text-sm text-gray-500 truncate overflow-hidden whitespace-nowrap w-full min-w-0">
                    {savedProblem.description}
                  </div>
                </div>
              </Button>
              <div>
                <X
                  className="w-4 h-4 hover:cursor-pointer"
                  onClick={() => DeleteProblem(savedProblem.id)}
                />
              </div>
            </li>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
