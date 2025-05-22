import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import SolutionEditor from "./solution-editor";

interface ResponseDisplayProps {
  tipResponse: string;
  explanationResponse: string;
}

const constColors =
  "bg-gray-800 text-gray-100 dark:bg-gray-900 p-4 overflow-auto max-h-[600px] font-mono text-sm hide-scrollbar";

const headerColors =
  "bg-gray-800 text-gray-300 px-4 py-2 text-xs font-medium border-b border-gray-700";

export default function ResponseDisplay({
  tipResponse,
  explanationResponse,
}: ResponseDisplayProps) {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="tips" className="w-full ">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tips">Tips & Hints</TabsTrigger>
          <TabsTrigger value="explanation">Problem Explanation</TabsTrigger>
          <TabsTrigger value="solution">Solution</TabsTrigger>
        </TabsList>
        <TabsContent value="tips" className="mt-2">
          {tipResponse ? (
            <div className="rounded-md overflow-hidden">
              <div className={`${headerColors}`}>Tips & Hints</div>
              <div className={`${constColors}`}>
                <pre className="whitespace-pre-wrap">{tipResponse}</pre>
              </div>
            </div>
          ) : (
            <div className="text-center p-4 text-gray-500">
              Click &quot;Get Tips & Hints&quot; to receive guidance on how to
              approach this problem.
            </div>
          )}
        </TabsContent>
        <TabsContent value="explanation" className="mt-2">
          {explanationResponse ? (
            <div className="rounded-md overflow-hidden">
              <div className={`${headerColors}`}>Problem Explanation</div>
              <div className={`${constColors}`}>
                <pre className="whitespace-pre-wrap">{explanationResponse}</pre>
              </div>
            </div>
          ) : (
            <div className="text-center p-4 text-gray-500">
              Click &quot;Help Me Understand&quot; to get a clear explanation of
              the problem.
            </div>
          )}
        </TabsContent>

        <TabsContent value="solution" className="mt-2 w-full ">
          <div className="rounded-md overflow-hidden ">
            <span className={`${headerColors}`}>Solution</span>
            <div className=" overflow-auto max-h-full font-mono text-sm ">
              <SolutionEditor />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
