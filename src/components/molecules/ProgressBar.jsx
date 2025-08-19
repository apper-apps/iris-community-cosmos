import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const ProgressBar = ({ 
  progress, 
  total, 
  showPercentage = true, 
  showFraction = false,
  size = "default",
  className 
}) => {
  const percentage = total > 0 ? (progress / total) * 100 : 0;
  
  const sizes = {
    sm: "h-1.5",
    default: "h-2",
    lg: "h-3"
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className={cn("relative bg-gray-700 rounded-full overflow-hidden", sizes[size])}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
        />
      </div>
      
      {(showPercentage || showFraction) && (
        <div className="flex justify-between items-center text-sm">
          {showFraction && (
            <span className="text-gray-400">
              {progress} of {total} completed
            </span>
          )}
          {showPercentage && (
            <span className="text-primary font-medium">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;