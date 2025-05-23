import { useState, useEffect } from "react";
import { toast } from "sonner";

type WithId = { id: string | number };

export function useLocalStorage<T extends WithId[]>(
  key: string,
  initialValue: T
) {
  const [savedProblems, setSavedProblems] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage", error);
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(key, JSON.stringify(savedProblems));
    } catch (error) {
      console.error("Error setting localStorage", error);
    }
  }, [key, savedProblems]);

  const clearStorage = () => {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error clearing localStorage", error);
      toast.error("Error clearing localStorage");
    }
  };

  return [savedProblems, setSavedProblems, clearStorage] as const;
}
