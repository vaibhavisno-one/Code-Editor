import { create } from "zustand";
import * as monaco from "monaco-editor";
import { LANGUAGE_CONFIG } from "@/app/(root)/_constants";
import { CodeEditorState } from "./../types/index";

const getInitialState = () => {
  if (typeof window === "undefined") {
    return {
      language: "javascript",
      fontSize: 16,
      theme: "vs-dark",
    };
  }

  const savedLanguage = localStorage.getItem("editor-language") || "javascript";
  const savedTheme = localStorage.getItem("editor-theme") || "vs-dark";
  const savedFontSize = localStorage.getItem("editor-font-size") || "16";

  return {
    language: savedLanguage,
    theme: savedTheme,
    fontSize: Number(savedFontSize),
  };
};

export const useCodeEditorStore = create<CodeEditorState>((set, get) => {
  const initialState = getInitialState();

  return {
    ...initialState,
    output: "",
    isRunning: false,
    error: null,
    editor: null,
    executionResult: null,

    getCode: () => get().editor?.getValue() || "",

    setEditor: (editor: monaco.editor.IStandaloneCodeEditor) => {
      const savedCode = localStorage.getItem(`editor-code-${get().language}`);
      if (savedCode) editor.setValue(savedCode);
      set({ editor });
    },

    setTheme: (theme: string) => {
      localStorage.setItem("editor-theme", theme);
      set({ theme });
    },

    setFontSize: (fontSize: number) => {
      localStorage.setItem("editor-font-size", fontSize.toString());
      set({ fontSize });
    },

    setLanguage: (language: string) => {
      const currentCode = get().editor?.getValue();
      if (currentCode) {
        localStorage.setItem(`editor-code-${get().language}`, currentCode);
      }

      localStorage.setItem("editor-language", language);

      set({
        language,
        output: "",
        error: null,
      });
    },

    runCode: async () => {
      const { language, getCode } = get();
      const code = getCode();

      if (!code) {
        set({ error: "Please enter some code" });
        return;
      }

      set({ isRunning: true, error: null, output: "" });

      try {
        const runtime = LANGUAGE_CONFIG[language].pistonRuntime;

        const response = await fetch("https://emkc.org/api/v2/piston/execute", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            language: runtime.language,
            version: runtime.version,
            files: [{ content: code }],
          }),
        });

        const data = await response.json();
        // console.log("data back from piston:", data); // Keep this for debugging during development if useful

        if (data.message) { // Top-level error message from Piston (e.g., language not supported)
          set({ error: data.message, output: "", executionResult: { code, output: "", error: data.message } });
          return;
        }

        // Check for compilation issues if a compile object exists
        if (data.compile) {
          if (data.compile.code !== 0) {
            const compileError = data.compile.stderr || data.compile.output || "Compilation error";
            set({ error: compileError, output: "", executionResult: { code, output: "", error: compileError } });
            return;
          }
        }

        // Check for runtime issues or successful run if a run object exists
        if (data.run) {
          if (data.run.code !== 0) {
            const runError = data.run.stderr || data.run.output || "Runtime error";
            set({ error: runError, output: "", executionResult: { code, output: "", error: runError } });
            return;
          }
          // Successful run
          const outputResult = data.run.output !== undefined ? String(data.run.output) : "";
          set({ output: outputResult.trim(), error: null, executionResult: { code, output: outputResult.trim(), error: null } });
          return;
        }

        // Handle cases where there's no run object, but compile might have been successful and produced output
        // (e.g., some linters or tools might only have a "compile" step output)
        if (data.compile && data.compile.code === 0) {
            const compileOutputResult = data.compile.output !== undefined ? String(data.compile.output) : "";
            // If compile output is just an empty string, it's not really an "output" to display unless it's meaningful
            // For now, we'll display it if present.
            set({ output: compileOutputResult.trim(), error: null, executionResult: { code, output: compileOutputResult.trim(), error: null } });
            return;
        }

        // Fallback for unexpected response structure if no message, no compile error, and no run info
        set({ error: "Unexpected response from code execution service. No output or error provided.", output: "", executionResult: { code, output: "", error: "Unexpected response from code execution service." } });

      } catch (error) {
        console.log("Error running code:", error);
        set({
          error: "Error running code", // General catch-all
          output: "",
          executionResult: { code, output: "", error: "Error running code" },
        });
      } finally {
        set({ isRunning: false });
      }
    },

    resetState: () => {
      set({
        ...getInitialState(),
        output: "",
        isRunning: false,
        error: null,
        editor: null,
        executionResult: null,
      });
    },
  };
});

export const getExecutionResult = () => useCodeEditorStore.getState().executionResult;
