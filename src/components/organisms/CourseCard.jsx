import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import ProgressBar from "@/components/molecules/ProgressBar";
import Badge from "@/components/atoms/Badge";
import { cn } from "@/utils/cn";

const CourseCard = ({ course, progress, onClick }) => {
  const completedLessons = progress?.completedLessons || 0;
  const totalLessons = course.totalLessons || course.lessons?.length || 0;
  const isCompleted = completedLessons === totalLessons;
  const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick && onClick(course)}
      className="glass rounded-xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 group"
    >
      {/* Course Thumbnail */}
      <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-4 right-4">
          {isCompleted ? (
            <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
              <ApperIcon name="Check" size={16} className="text-white" />
            </div>
          ) : (
            <div className="w-8 h-8 bg-black/30 backdrop-blur rounded-full flex items-center justify-center">
              <ApperIcon name="Play" size={16} className="text-white" />
            </div>
          )}
        </div>
        
        {/* Course Icon/Illustration */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <ApperIcon name="BookOpen" size={32} className="text-white" />
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6">
        {/* Title and Description */}
        <div className="mb-4">
          <h3 className="font-semibold text-white text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* Course Stats */}
        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-gray-400">
              <ApperIcon name="PlayCircle" size={16} />
              <span>{totalLessons} lessons</span>
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <ApperIcon name="Clock" size={16} />
              <span>{course.duration || "2-3 hrs"}</span>
            </div>
          </div>
          
          {isCompleted && (
            <Badge variant="success" className="text-xs">
              <ApperIcon name="Award" size={12} className="mr-1" />
              Completed
            </Badge>
          )}
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Progress</span>
            <span className="text-primary font-medium">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          
          <ProgressBar
            progress={completedLessons}
            total={totalLessons}
            showPercentage={false}
            showFraction={false}
          />
          
          <p className="text-xs text-gray-500">
            {completedLessons} of {totalLessons} lessons completed
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-4 pt-4 border-t border-gray-700">
          <motion.div
            whileHover={{ x: 2 }}
            className="flex items-center justify-between"
          >
            <span className="text-primary font-medium text-sm">
              {isCompleted ? "Review Course" : progressPercentage > 0 ? "Continue Learning" : "Start Course"}
            </span>
            <ApperIcon name="ArrowRight" size={16} className="text-primary" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;