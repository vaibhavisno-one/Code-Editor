import { Trash2Icon, UserIcon } from "lucide-react";
import { Id } from "../../../../../convex/_generated/dataModel";
import CommentContent from "./CommentContent";

interface CommentProps {
  comment: {
    _id: Id<"snippetComments">;
    _creationTime: number;
    userId: string;
    userName: string;
    snippetId: Id<"snippets">;
    content: string;
  };
  onDelete: (commentId: Id<"snippetComments">) => void;
  isDeleting: boolean;
  currentUserId?: string;
}
function Comment({ comment, currentUserId, isDeleting, onDelete }: CommentProps) {
  return (
    <div className="group">
      <div className="bg-primary-background rounded-xl p-6 border border-secondary-background hover:border-secondary-background/70 transition-all">
        <div className="flex items-start sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-secondary-background flex items-center justify-center flex-shrink-0">
              <UserIcon className="w-4 h-4 text-text-secondary" />
            </div>
            <div className="min-w-0">
              <span className="block text-text-primary font-medium truncate">{comment.userName}</span>
              <span className="block text-sm text-text-secondary">
                {new Date(comment._creationTime).toLocaleDateString()}
              </span>
            </div>
          </div>

          {comment.userId === currentUserId && (
            <button
              onClick={() => onDelete(comment._id)}
              disabled={isDeleting}
              className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-500/10 rounded-lg transition-all"
              title="Delete comment"
            >
              <Trash2Icon className="w-4 h-4 text-red-400" />
            </button>
          )}
        </div>

        <CommentContent content={comment.content} />
      </div>
    </div>
  );
}
export default Comment;