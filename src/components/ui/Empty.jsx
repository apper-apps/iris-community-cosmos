import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  icon = "MessageSquare",
  title = "Nothing here yet",
  message = "Be the first to get things started!",
  actionText = "Get Started",
  onAction 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-6"
    >
      <div className="glass rounded-2xl p-8 text-center max-w-md">
        <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <ApperIcon name={icon} size={36} className="text-primary" />
        </div>
        
        <h3 className="text-xl font-semibold text-white mb-3">
          {title}
        </h3>
        
        <p className="text-gray-400 mb-6 leading-relaxed">
          {message}
        </p>
        
        {onAction && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onAction}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all duration-200"
          >
            <ApperIcon name="Plus" size={16} />
            {actionText}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default Empty;