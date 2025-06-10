import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useMutation } from "convex/react";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { X } from "lucide-react";
import toast from "react-hot-toast";

function ShareSnippetDialog({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [isSharing, setIsSharing] = useState(false);
  const { language, getCode } = useCodeEditorStore();
  const createSnippet = useMutation(api.snippets.createSnippet);

  const handleShare = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSharing(true);

    try {
      const code = getCode();
      await createSnippet({ title, language, code });
      onClose();
      setTitle("");
      toast.success("Snippet shared successfully");
    } catch (error) {
      console.log("Error creating snippet:", error);
      toast.error("Error creating snippet");
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-secondary-background rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-text-primary">Share Snippet</h2>
          <button onClick={onClose} className="p-1 text-text-secondary hover:text-text-primary rounded-md">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleShare}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-text-secondary mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-primary-background border border-secondary-background rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-blue"
              placeholder="Enter snippet title"
              required
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-text-secondary hover:text-text-primary bg-transparent border border-secondary-background hover:bg-secondary-background/50 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSharing}
              className="px-4 py-2 bg-gradient-to-r from-accent-blue to-accent-purple hover:from-accent-blue/90 hover:to-accent-purple/90 text-text-primary rounded-lg disabled:opacity-50 transition-all duration-200"
            >
              {isSharing ? "Sharing..." : "Share"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default ShareSnippetDialog;