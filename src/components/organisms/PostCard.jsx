import { useState } from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Avatar from "@/components/atoms/Avatar";
import Badge from "@/components/atoms/Badge";
import PostActions from "@/components/molecules/PostActions";
import { cn } from "@/utils/cn";

const PostCard = ({ 
  post, 
  author, 
  onLike, 
  onComment,
  onCommentSubmit,
  isLiked = false 
}) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  const formatContent = (content) => {
    // Simple markdown-like formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/• /g, "• ");
  };

  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case "announcements": return "warning";
      case "questions": return "info";
      case "discussions": return "primary";
      default: return "default";
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      content: newComment.trim(),
      authorId: "1", // Current user
      timestamp: new Date()
    };

    if (onCommentSubmit) {
      onCommentSubmit(post.Id, comment);
    }

    setNewComment("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-xl p-6 mb-6 hover:shadow-xl transition-all duration-200"
    >
      {/* Post Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar
            src={author?.avatar}
            fallback={author?.name}
            size="default"
          />
          <div>
            <h3 className="font-semibold text-white">{author?.name}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>{formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}</span>
              <span>•</span>
              <Badge variant={getCategoryColor(post.category)} className="text-xs">
                {post.category}
              </Badge>
            </div>
          </div>
        </div>

        {/* Post Menu */}
        <button className="text-gray-400 hover:text-white transition-colors p-1">
          <ApperIcon name="MoreHorizontal" size={16} />
        </button>
      </div>

      {/* Post Title */}
      <h2 className="text-xl font-semibold text-white mb-3 leading-tight">
        {post.title}
      </h2>

      {/* Post Content */}
<div 
        className="text-gray-300 mb-4 leading-relaxed px-4"
        dangerouslySetInnerHTML={{ 
          __html: formatContent(post.content) 
        }}
      />

      {/* Post Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-700">
        <PostActions
          likes={post.likes}
          comments={post.comments?.length || 0}
          isLiked={isLiked}
          onLike={() => onLike(post.Id)}
          onComment={() => setShowComments(!showComments)}
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowComments(!showComments)}
          className="text-gray-400 hover:text-primary transition-colors text-sm"
        >
          {showComments ? "Hide" : "Show"} comments
        </motion.button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 pt-4 border-t border-gray-700 space-y-4"
        >
          {/* New Comment Form */}
          <form onSubmit={handleCommentSubmit} className="flex gap-3">
            <Avatar
              fallback="You"
              size="sm"
            />
            <div className="flex-1">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm"
              />
              {newComment.trim() && (
                <div className="flex justify-end mt-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-4 py-1.5 bg-gradient-to-r from-primary to-secondary text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all duration-200"
                  >
                    Comment
                  </motion.button>
                </div>
              )}
            </div>
          </form>

          {/* Existing Comments */}
          <div className="space-y-3 max-h-60 overflow-y-auto scrollbar-thin">
            {post.comments?.map((comment, index) => (
              <motion.div
                key={comment.id || index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-3"
              >
                <Avatar
                  src={comment.author?.avatar}
                  fallback={comment.author?.name}
                  size="sm"
                />
                <div className="flex-1">
                  <div className="bg-gray-800 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-white text-sm">
                        {comment.author?.name || "Anonymous"}
                      </span>
                      <span className="text-xs text-gray-400">
                        {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm">{comment.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PostCard;