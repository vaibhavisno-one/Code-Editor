import { useAuth } from "@clerk/nextjs";
import { Id } from "../../convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Star } from "lucide-react";

function StarButton({ snippetId }: { snippetId: Id<"snippets"> }) {
  const { isSignedIn } = useAuth();

  const isStarred = useQuery(api.snippets.isSnippetStarred, { snippetId });
  const starCount = useQuery(api.snippets.getSnippetStarCount, { snippetId });
  const star = useMutation(api.snippets.starSnippet);

  const handleStar = async () => {
    if (!isSignedIn) return;
    await star({ snippetId });
  };

  return (
    <button
      className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-lg 
    transition-all duration-200 ${
      isStarred
        ? "bg-accent-purple/10 text-accent-purple hover:bg-accent-purple/20"
        : "bg-secondary-background/50 text-text-secondary hover:bg-secondary-background/70"
    }`}
      onClick={handleStar}
    >
      <Star
        className={`w-4 h-4 ${isStarred ? "fill-accent-purple" : "fill-none group-hover:fill-text-secondary"}`}
      />
      <span className={`text-xs font-medium ${isStarred ? "text-accent-purple" : "text-text-secondary"}`}>
        {starCount}
      </span>
    </button>
  );
}

export default StarButton;