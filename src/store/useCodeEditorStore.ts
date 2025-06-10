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
        console.log("data back from piston:", data);

        if (data.message) {
          set({
            error: data.message,
            executionResult: { code, output: "", error: data.message },
          });
          return;
        }

        // Check for compile errors
        if (data.compile && data.compile.code !== 0) {
          const error = data.compile.stderr || data.compile.output || "Compilation failed";
          set({
            error,
            executionResult: { code, output: "", error },
          });
          return;
        }
        // Check if compile stage exists but was successful, then if run stage exists
        else if (data.compile && data.compile.code === 0 && data.run && data.run.code !== 0) {
          // Runtime error
          const error = data.run.stderr || data.run.output || "Execution failed";
          set({
            error,
            executionResult: { code, output: "", error },
          });
          return;
        }
        // Check if only run stage exists (e.g. for languages that don't have a separate compile stage)
        else if (!data.compile && data.run && data.run.code !== 0) {
          const error = data.run.stderr || data.run.output || "Execution failed";
          set({
            error,
            executionResult: { code, output: "", error },
          });
          return;
        }
        // Successful execution (either with or without compile stage)
        else if (data.run && data.run.code === 0) {
          const output = data.run.output;
          set({
            output: output.trim(),
            error: null,
            executionResult: { code, output: output.trim(), error: null },
          });
          return;
        }
        // Fallback for unexpected structure, though the above should cover Piston API
        else {
            // If there was a compile output (even if code was 0), show it as it might contain warnings
            if (data.compile && data.compile.output) {
                set({
                    output: data.compile.output.trim(),
                    error: "Execution finished with warnings or unexpected output structure.",
                    executionResult: { code, output: data.compile.output.trim(), error: "Execution finished with warnings or unexpected output structure." },
                });
                return;
            }
            // Otherwise, a generic error
            set({ 
                error: "Unexpected response structure from execution engine.",
                executionResult: { code, output: "", error: "Unexpected response structure from execution engine." }
            });
            return;
        }
      } catch (error) {
        console.log("Error running code:", error);
        set({
          error: "Error running code",
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
