import { useResponseContext } from "../../context/response-context";
import ResponseDisplay from "../leet-components/response-display";

function SolutionPage() {
  const { tipResponse, explanationResponse } = useResponseContext();

  return (
    <section className="flex-1 flex flex-col items-center  bg-gray-100 dark:bg-gray-950 rounded-lg shadow-md m-2 p-6 border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-800 h-[96%]">
      <span className="text-gray-500 dark:text-gray-400 text-lg font-medium  w-full">
        <ResponseDisplay
          tipResponse={tipResponse}
          explanationResponse={explanationResponse}
        />
      </span>
    </section>
  );
}

export default SolutionPage;
