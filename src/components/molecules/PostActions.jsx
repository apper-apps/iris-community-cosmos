import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const PostActions = ({ 
  likes, 
  comments, 
  isLiked, 
  onLike, 
  onComment,
  showCounts = true 
}) => {
  return (
    <div className="flex items-center gap-6">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onLike}
        className={cn(
          "flex items-center gap-2 transition-all duration-200",
          isLiked 
            ? "text-accent" 
            : "text-gray-400 hover:text-accent"
        )}
      >
        <motion.div
          animate={isLiked ? { scale: [1, 1.2, 1] } : { scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <ApperIcon 
            name={isLiked ? "Heart" : "Heart"} 
            size={18}
            className={isLiked ? "fill-current" : ""}
          />
        </motion.div>
        {showCounts && (
          <span className="text-sm font-medium">
            {likes}
          </span>
        )}
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onComment}
        className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors duration-200"
      >
        <ApperIcon name="MessageCircle" size={18} />
        {showCounts && (
          <span className="text-sm font-medium">
            {comments}
          </span>
        )}
      </motion.button>
    </div>
  );
};

export default PostActions;