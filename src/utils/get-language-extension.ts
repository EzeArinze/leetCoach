import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";

export const getLanguageExtension = (selectedLanguage: string) => {
  switch (selectedLanguage) {
    case "python":
      return python();
    case "java":
      return java();
    case "cpp":
      return cpp();
    case "javascript":
    default:
      return javascript();
  }
};
