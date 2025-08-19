import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import ProgressBar from "@/components/molecules/ProgressBar";
import { cn } from "@/utils/cn";

const LessonViewer = ({ 
  lesson, 
  course, 
  lessonIndex, 
  totalLessons,
  onComplete,
  onNext,
  onPrevious,
  onClose,
  isCompleted = false 
}) => {
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [isVideoCompleted, setIsVideoCompleted] = useState(isCompleted);
  
  const hasNext = lessonIndex < totalLessons - 1;
  const hasPrevious = lessonIndex > 0;

  const handleMarkComplete = () => {
    if (!isCompleted && onComplete) {
      onComplete(lesson.Id);
      toast.success(`Lesson completed! +20 points earned 🎉`);
    }
  };

  const formatContent = (content) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .split("\n")
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .join("</p><p>");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-background z-50 flex flex-col"
    >
      {/* Header */}
      <div className="h-16 bg-surface border-b border-gray-700 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="flex items-center gap-2"
          >
            <ApperIcon name="ArrowLeft" size={16} />
            Back to Course
          </Button>
          <div>
            <h1 className="font-semibold text-white text-lg">{lesson.title}</h1>
            <p className="text-sm text-gray-400">
              Lesson {lessonIndex + 1} of {totalLessons} • {course.title}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!isCompleted && (
            <Button
              onClick={handleMarkComplete}
              size="sm"
              className="flex items-center gap-2"
            >
              <ApperIcon name="Check" size={16} />
              Mark Complete
            </Button>
          )}
          {isCompleted && (
            <div className="flex items-center gap-2 text-success">
              <ApperIcon name="CheckCircle" size={16} />
              <span className="text-sm font-medium">Completed</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex">
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Video Section */}
          <div className="bg-black aspect-video flex items-center justify-center relative">
            {lesson.videoUrl ? (
              <video
                src={lesson.videoUrl}
                controls
                className="w-full h-full"
                onTimeUpdate={(e) => setCurrentVideoTime(e.target.currentTime)}
                onEnded={() => setIsVideoCompleted(true)}
              />
            ) : (
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name="Play" size={40} className="text-gray-400" />
                </div>
                <p className="text-gray-400">Video content will be available soon</p>
              </div>
            )}
          </div>

          {/* Lesson Content */}
          <div className="flex-1 p-6 overflow-y-auto scrollbar-thin">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-4">{lesson.title}</h2>
                
                {lesson.content && (
                  <div className="glass rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <ApperIcon name="FileText" size={20} />
                      Lesson Content
                    </h3>
                    <div 
                      className="text-gray-300 leading-relaxed prose prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ 
                        __html: `<p>${formatContent(lesson.content)}</p>` 
                      }}
                    />
                  </div>
                )}

                {/* Additional Resources */}
                {lesson.resources && lesson.resources.length > 0 && (
                  <div className="glass rounded-xl p-6 mt-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <ApperIcon name="Link" size={20} />
                      Additional Resources
                    </h3>
                    <div className="space-y-2">
                      {lesson.resources.map((resource, index) => (
                        <a
                          key={index}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-primary hover:text-secondary transition-colors"
                        >
                          <ApperIcon name="ExternalLink" size={16} />
                          {resource.title}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Course Progress */}
        <div className="w-80 bg-surface border-l border-gray-700 flex flex-col">
          <div className="p-6 border-b border-gray-700">
            <h3 className="font-semibold text-white mb-4">Course Progress</h3>
            <ProgressBar
              progress={course.completedLessons || 0}
              total={totalLessons}
              showFraction={true}
              showPercentage={true}
            />
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-thin p-6">
            <h4 className="font-medium text-gray-300 mb-4">All Lessons</h4>
            <div className="space-y-2">
              {course.lessons?.map((courseLesson, index) => (
                <div
                  key={courseLesson.Id}
                  className={cn(
                    "p-3 rounded-lg border transition-all duration-200",
                    index === lessonIndex
                      ? "bg-primary/20 border-primary/30 text-white"
                      : courseLesson.completed
                      ? "bg-success/10 border-success/30 text-success"
                      : "bg-gray-800/50 border-gray-700 text-gray-400 hover:bg-gray-800"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center text-xs",
                      index === lessonIndex
                        ? "bg-primary text-white"
                        : courseLesson.completed
                        ? "bg-success text-white"
                        : "bg-gray-700 text-gray-400"
                    )}>
                      {courseLesson.completed ? (
                        <ApperIcon name="Check" size={12} />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{courseLesson.title}</p>
                      <p className="text-xs opacity-75">Lesson {index + 1}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="h-16 bg-surface border-t border-gray-700 flex items-center justify-between px-6">
        <Button
          variant="ghost"
          onClick={onPrevious}
          disabled={!hasPrevious}
          className="flex items-center gap-2"
        >
          <ApperIcon name="ChevronLeft" size={16} />
          Previous
        </Button>

        <div className="flex items-center gap-3">
          {!isCompleted && (
            <Button
              onClick={handleMarkComplete}
              variant="secondary"
              size="sm"
            >
              Mark Complete
            </Button>
          )}
          
          <Button
            onClick={onNext}
            disabled={!hasNext}
            className="flex items-center gap-2"
          >
            Next
            <ApperIcon name="ChevronRight" size={16} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default LessonViewer;