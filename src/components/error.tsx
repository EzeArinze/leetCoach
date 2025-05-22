import { AlertCircle } from "lucide-react";

function Error({ error }: { error: string | null }) {
  if (!error) return null;

  return (
    <div className="mt-4 border border-red-400 rounded-md overflow-hidden shrink-0">
      <div className="bg-red-900 text-red-100 px-4 py-2 text-xs font-medium border-b border-red-800 flex items-center">
        <AlertCircle className="h-4 w-4 mr-2" />
        Error
      </div>
      <div className="bg-red-950 text-red-100 p-4 font-mono text-sm whitespace-pre-wrap max-h-[150px] overflow-auto">
        {error}
      </div>
    </div>
  );
}

export default Error;
