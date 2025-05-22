import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useMemo,
} from "react";

interface LanguageContextType {
  selectedLanguage: "javascript" | "python" | "java" | "cpp";
  setSelectedLanguage: (
    language: "javascript" | "python" | "java" | "cpp"
  ) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<
    "javascript" | "python" | "java" | "cpp"
  >("javascript");

  const value = useMemo(
    () => ({
      selectedLanguage,
      setSelectedLanguage,
    }),
    [selectedLanguage, setSelectedLanguage]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error(
      "useLanguageContext must be used within a ResponseProvider"
    );
  }
  return context;
};
