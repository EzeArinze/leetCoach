import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";

interface ResponseDisplayProps {
  tipResponse: string;
  explanationResponse: string;
}

export default function ResponseDisplay({
  tipResponse,
  explanationResponse,
}: ResponseDisplayProps) {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="tips" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tips">Tips & Hints</TabsTrigger>
          <TabsTrigger value="explanation">Problem Explanation</TabsTrigger>
        </TabsList>
        <TabsContent value="tips" className="mt-2">
          {tipResponse ? (
            <div className="rounded-md overflow-hidden">
              <div className="bg-gray-800 text-gray-300 px-4 py-2 text-xs font-medium border-b border-gray-700">
                Tips & Hints
              </div>
              <div className="bg-gray-800 text-gray-100 dark:bg-gray-900 p-4 overflow-auto max-h-[400px] font-mono text-sm">
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
              <div className="bg-gray-800 text-gray-300 px-4 py-2 text-xs font-medium border-b border-gray-700">
                Problem Explanation
              </div>
              <div className="bg-gray-800 text-gray-100 dark:bg-gray-900 p-4 overflow-auto max-h-[400px] font-mono text-sm">
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
      </Tabs>
    </div>
  );
}
