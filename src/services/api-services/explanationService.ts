import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "../supabase";

type Exp = {
  understand: string;
};

// Inserting the tips from the backend

export const InsertExplanation = async (explanation: Exp) => {
  const { data, error } = await supabase
    .from("Understand")
    .insert([explanation])
    .select();

  return { data, error };
};

export function useInsertExplanation() {
  return useMutation({
    mutationFn: (newExplanation: Exp) => InsertExplanation(newExplanation),
  });
}

// Getting the tips from the backend
export const GetTips = async () => {
  const { data } = await supabase.from("Understand").select();
  return data;
};

export const useTips = () => {
  return useQuery({
    queryKey: ["explanation"],
    queryFn: GetTips,
  });
};
