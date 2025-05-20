import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { ExternalLink } from "lucide-react";

export default function AdditionalResources() {
  return (
    <Card className="border-dashed">
      <CardHeader className="py-3">
        <CardTitle className="text-md">Additional Learning Resources</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li>
            <a
              href="https://www.youtube.com/watch?v=KLlXCFG5TnA"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 hover:underline"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              YouTube: Two Sum Problem Explained (NeetCode)
            </a>
          </li>
          <li>
            <a
              href="https://leetcode.com/problems/two-sum/solutions/127810/two-sum/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 hover:underline"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              LeetCode Official Solution with Detailed Explanation
            </a>
          </li>
          <li>
            <a
              href="https://www.geeksforgeeks.org/two-sum/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 hover:underline"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              GeeksforGeeks: Two Sum Problem with Visual Examples
            </a>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
