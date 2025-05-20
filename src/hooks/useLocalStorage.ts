import { useState, useEffect } from "react";
import { toast } from "sonner";

type WithId = { id: string | number };

export function useLocalStorage<T>(key: string, initialValue: T) {
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

  const removeItemById = (idToRemove: string | number) => {
    if (!Array.isArray(savedProblems)) return;

    const updated = (savedProblems as WithId[]).filter(
      (item) => item.id !== idToRemove
    );
    setSavedProblems(updated as T);
  };

  const clearStorage = () => {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error clearing localStorage", error);
      toast.error("Error clearing localStorage");
    }
  };

  return [
    savedProblems,
    setSavedProblems,
    removeItemById,
    clearStorage,
  ] as const;
}
