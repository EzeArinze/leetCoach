import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "../supabase";
import type { Tips } from "../../utils/types";

// Inserting the tips from the backend

export const InsertTips = async (newTips: Tips) => {
  const { data, error } = await supabase
    .from("Tips")
    .insert([newTips])
    .select();

  return { data, error };
};

export function useInsertTips() {
  return useMutation({
    mutationFn: (newTip: Tips) => InsertTips(newTip),
  });
}

// Getting the tips from the backend
export const GetTips = async (): Promise<string[]> => {
  const { data } = await supabase.from("Tips").select();
  return data || [];
};

export const useTips = () => {
  return useQuery<string[]>({
    queryKey: ["tips"],
    queryFn: GetTips,
  });
};
