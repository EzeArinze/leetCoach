import { useMutation } from "@tanstack/react-query";
import { api } from "../axios-instance";

export const RequestTips = async (problem: string) => {
  const response = await api.post("/completions", {
    model: "deepseek/deepseek-r1:free",
    messages: [
      {
        role: "user",
        content: `You are the best summarizer and the best at giving tips in the hole world, Give me some tips for the following leetcode problem. Do not provide an answer, just the tips: ${problem}`,
      },
    ],
  });

  if (response.status !== 200) {
    throw new Error("Failed to fetch tips");
  }

  return response.data.choices[0].message.content;
};

export const useRequestTips = () => {
  return useMutation({
    mutationFn: RequestTips,
  });
};
