// import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { useLanguageContext } from "../../context/language-context";

interface CodeMirrorEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: "javascript" | "python" | "java" | "cpp";
  placeholder?: string;
  className?: string;
  headerTitle?: string;
}

export default function CodeMirrorEditor({
  value,
  onChange,
  // language = "javascript",
  placeholder = "",
  className = "",
  headerTitle,
}: CodeMirrorEditorProps) {
  const { selectedLanguage, setSelectedLanguage } = useLanguageContext();

  // Get language extension based on selected language
  const getLanguageExtension = () => {
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

  return (
    <div className={`border rounded-md overflow-hidden ${className}`}>
      {/* Editor header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 dark:bg-gray-900 border-b border-gray-700">
        <div className="text-xs font-medium text-gray-300">
          {headerTitle || "Problem Statement "}
        </div>
        <div className="flex items-center space-x-3">
          <select
            className="bg-gray-700 text-gray-200 text-xs rounded px-2 py-1 border-none focus:ring-1 focus:ring-blue-500"
            value={selectedLanguage}
            onChange={(e) =>
              setSelectedLanguage(
                e.target.value as "javascript" | "python" | "java" | "cpp"
              )
            }
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>
      </div>

      {/* CodeMirror editor */}
      <CodeMirror
        value={value}
        height="250px"
        theme={vscodeDark}
        extensions={[getLanguageExtension()]}
        onChange={onChange}
        placeholder={placeholder}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLineGutter: true,
          highlightSpecialChars: true,
          foldGutter: true,
          dropCursor: true,
          allowMultipleSelections: true,
          indentOnInput: true,
          syntaxHighlighting: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          rectangularSelection: true,
          crosshairCursor: true,
          highlightActiveLine: true,
          highlightSelectionMatches: true,
          closeBracketsKeymap: true,
          defaultKeymap: true,
          searchKeymap: true,
          historyKeymap: true,
          foldKeymap: true,
          completionKeymap: true,
          lintKeymap: true,
        }}
      />
    </div>
  );
}
