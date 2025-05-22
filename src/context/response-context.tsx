import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useMemo,
} from "react";
import { useStreamTips } from "../services/api-services/request-tips";
import { useStreamExplanation } from "../services/api-services/request-explanation";
import type { UseMutateFunction } from "@tanstack/react-query";

interface ResponseContextType {
  tipResponse: string;
  explanationResponse: string;
  setTipResponse: React.Dispatch<React.SetStateAction<string>>;
  setExplanationResponse: React.Dispatch<React.SetStateAction<string>>;
  TipsMutation: UseMutateFunction<void, Error, string, unknown>;
  isLoadingTips: boolean;
  ExplanationMutation: UseMutateFunction<void, Error, string, unknown>;
  isLoadingExplanation: boolean;
}

const ResponseContext = createContext<ResponseContextType | undefined>(
  undefined
);

export const ResponseProvider = ({ children }: { children: ReactNode }) => {
  const [tipResponse, setTipResponse] = useState("");
  const [explanationResponse, setExplanationResponse] = useState("");

  const { mutate: TipsMutation, isPending: isLoadingTips } = useStreamTips(
    (token) => {
      setTipResponse((prev: string) => prev + token);
    }
  );

  const { mutate: ExplanationMutation, isPending: isLoadingExplanation } =
    useStreamExplanation((token) => {
      setExplanationResponse((prev: string) => prev + token);
    });

  const value = useMemo(
    () => ({
      tipResponse,
      explanationResponse,
      setTipResponse,
      setExplanationResponse,
      TipsMutation,
      isLoadingTips,
      ExplanationMutation,
      isLoadingExplanation,
    }),
    [
      tipResponse,
      explanationResponse,
      TipsMutation,
      isLoadingTips,
      ExplanationMutation,
      isLoadingExplanation,
    ]
  );

  return (
    <ResponseContext.Provider value={value}>
      {children}
    </ResponseContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useResponseContext = () => {
  const context = useContext(ResponseContext);
  if (!context) {
    throw new Error(
      "useResponseContext must be used within a ResponseProvider"
    );
  }
  return context;
};
