import { useMutation } from "@tanstack/react-query";
import { api } from "../axios-instance";

// Requesting explanation for the problem
export const RequestExplanation = async (problem: string) => {
  try {
    const response = await api.post("/completions", {
      model: "google/gemma-3-27b-it:free",
      messages: [
        {
          role: "user",
          content: `You are the best summarizer and the best at Explainig complex and any other problems in the hole world,Explain the following leetcode problem do not provide answer jsut the explanation: ${problem}`,
        },
      ],
    });

    if (response.status !== 200) {
      throw new Error("Failed to fetch explanation");
    }

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching explanation:", error);
    throw error;
  }
};

export const useRequestExplanation = () => {
  return useMutation({
    mutationFn: RequestExplanation,
  });
};
