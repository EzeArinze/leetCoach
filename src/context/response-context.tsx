import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useMemo,
} from "react";

interface ResponseContextType {
  tipResponse: string;
  explanationResponse: string;
  setTipResponse: (response: string) => void;
  setExplanationResponse: (response: string) => void;
}

const ResponseContext = createContext<ResponseContextType | undefined>(
  undefined
);

export const ResponseProvider = ({ children }: { children: ReactNode }) => {
  const [tipResponse, setTipResponse] = useState("");
  const [explanationResponse, setExplanationResponse] = useState("");

  const value = useMemo(
    () => ({
      tipResponse,
      explanationResponse,
      setTipResponse,
      setExplanationResponse,
    }),
    [tipResponse, explanationResponse]
  );

  return (
    <ResponseContext.Provider value={value}>
      {children}
    </ResponseContext.Provider>
  );
};

export const useResponseContext = () => {
  const context = useContext(ResponseContext);
  if (!context) {
    throw new Error(
      "useResponseContext must be used within a ResponseProvider"
    );
  }
  return context;
};
