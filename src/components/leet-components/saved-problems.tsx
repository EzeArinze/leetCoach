import { Button } from "../../components/ui/button";
import { List } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";

interface SavedProblem {
  id: number;
  title: string;
  description: string;
}

interface SavedProblemsProps {
  savedProblems: SavedProblem[];
  onLoadProblem: (problemText: string) => void;
}

export default function SavedProblems({
  savedProblems,
  onLoadProblem,
}: SavedProblemsProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <List className="h-4 w-4 mr-2 " />
          {/* <span className="hidden">Saved Problems</span> */}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Your Saved Problems</DialogTitle>
          <DialogDescription>
            Click on a problem to load it into the editor.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[300px] overflow-y-auto">
          {savedProblems.length > 0 ? (
            <ul className="space-y-2">
              {savedProblems.map((savedProblem) => (
                <li key={savedProblem.id}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left h-auto py-2"
                    onClick={() =>
                      onLoadProblem(
                        `${savedProblem.title}: ${savedProblem.description}`
                      )
                    }
                  >
                    <div>
                      <div className="font-medium">{savedProblem.title}</div>
                      <div className="text-sm text-gray-500 truncate">
                        {savedProblem.description}
                      </div>
                    </div>
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center py-4 text-gray-500">
              No saved problems yet.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
