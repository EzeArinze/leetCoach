import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase";
import { useSupabaseUser } from "../../hooks/useSupabaseUser";

export interface Problem {
  id: string;
  title: string;
  description: string;
}

interface SaveProblem {
  title: string;
  description: string;
}

export function useProblemQueries() {
  const { user } = useSupabaseUser();
  const queryClient = useQueryClient();

  //Create problem based on user
  async function SaveProblems(problem: SaveProblem): Promise<void> {
    try {
      await supabase
        .from("Problems")
        .insert([{ ...problem, user_id: user?.id }])
        .select();
    } catch (error) {
      const isError = error instanceof Error ? error.message : "";
      throw new Error("Failed to save problems: " + isError);
    }
  }

  const useSaveProblems = () => {
    return useMutation({
      mutationFn: (problem: SaveProblem) => SaveProblems(problem),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["problems", user?.id] });
      },
    });
  };

  // fetch the problems
  async function fetchProblems() {
    if (!user?.id) {
      throw new Error("User is not authenticated");
    }
    const { data, error } = await supabase
      .from("Problems")
      .select("*")
      .eq("user_id", user.id)
      .order("id", { ascending: false });
    if (error) {
      throw new Error("Failed to fetch problems: " + error.message);
    }

    return data as Problem[];
  }

  const useFetchProblems = () =>
    useQuery({
      queryKey: ["problems", user?.id],
      queryFn: () => fetchProblems(),
      refetchOnWindowFocus: false,
    });

  /// delete a problem
  async function deleteProblem(id: string) {
    const { error } = await supabase.from("Problems").delete().eq("id", id);
    if (error) throw new Error("Failed to delete problem: " + error.message);
  }

  const useDeleteProblem = () => {
    return useMutation({
      mutationFn: (id: string) => deleteProblem(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["problems"] });
      },
    });
  };

  return { useSaveProblems, useFetchProblems, useDeleteProblem };
}
