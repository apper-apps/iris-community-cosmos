import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Loading from "@/components/ui/Loading";
import SearchBar from "@/components/molecules/SearchBar";
import FilterTabs from "@/components/molecules/FilterTabs";
import LessonViewer from "@/components/organisms/LessonViewer";
import CourseCard from "@/components/organisms/CourseCard";
import courseService from "@/services/api/courseService";
import userProgressService from "@/services/api/userProgressService";

const Classroom = () => {
  const [courses, setCourses] = useState([]);
  const [userProgress, setUserProgress] = useState([]);
  const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Courses");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Lesson viewer state
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [lessonIndex, setLessonIndex] = useState(0);
  const loadData = async () => {
    setLoading(true);
    setError("");

    try {
      const [coursesData, progressData] = await Promise.all([
        courseService.getAll(),
        userProgressService.getAll()
      ]);
      
      setCourses(coursesData);
      setUserProgress(progressData);
    } catch (err) {
      console.error("Error loading classroom data:", err);
      setError("Failed to load courses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Calculate progress for each course
  const coursesWithProgress = courses.map(course => {
    const progress = userProgress.find(p => p.courseId === course.Id) || { completedLessons: 0 };
    const completedCount = course.lessons?.filter(lesson => lesson.completed).length || 0;
    return {
      ...course,
      progress: {
        ...progress,
        completedLessons: completedCount
      }
    };
  });

  const filterTabs = [
    { label: "All Courses", value: "All Courses" },
    { label: "In Progress", value: "In Progress" },
    { label: "Completed", value: "Completed" },
    { label: "Not Started", value: "Not Started" }
  ];

const filteredCourses = coursesWithProgress.filter(course => {
    // Search filter
    const matchesSearch = !searchQuery || 
      course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category?.toLowerCase().includes(searchQuery.toLowerCase());

    const totalLessons = course.lessons?.length || 0;
    const completedLessons = course.progress.completedLessons;
    
    let matchesFilter = true;
    if (activeFilter === "Completed") {
      matchesFilter = completedLessons === totalLessons && totalLessons > 0;
    } else if (activeFilter === "In Progress") {
      matchesFilter = completedLessons > 0 && completedLessons < totalLessons;
    } else if (activeFilter === "Not Started") {
      matchesFilter = completedLessons === 0;
    }
    
    return matchesSearch && matchesFilter;
  });

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    // Start with first uncompleted lesson or first lesson
    const firstIncompleteIndex = course.lessons?.findIndex(lesson => !lesson.completed) || 0;
    const lessonIndex = firstIncompleteIndex >= 0 ? firstIncompleteIndex : 0;
    setLessonIndex(lessonIndex);
    setSelectedLesson(course.lessons?.[lessonIndex]);
  };

  const handleLessonComplete = async (lessonId) => {
    if (!selectedCourse) return;

    try {
      // Update lesson completion status
      const updatedCourse = {
        ...selectedCourse,
        lessons: selectedCourse.lessons.map(lesson =>
          lesson.Id === lessonId ? { ...lesson, completed: true } : lesson
        )
      };

      // Update in service
      await courseService.update(selectedCourse.Id, updatedCourse);

      // Update local state
      setCourses(prev => prev.map(course =>
        course.Id === selectedCourse.Id ? updatedCourse : course
      ));

      setSelectedCourse(updatedCourse);
      setSelectedLesson(prev => prev ? { ...prev, completed: true } : prev);

    } catch (err) {
      console.error("Error completing lesson:", err);
    }
  };

  const handleLessonNavigation = (direction) => {
    if (!selectedCourse || !selectedCourse.lessons) return;

    const newIndex = direction === "next" ? lessonIndex + 1 : lessonIndex - 1;
    
    if (newIndex >= 0 && newIndex < selectedCourse.lessons.length) {
      setLessonIndex(newIndex);
      setSelectedLesson(selectedCourse.lessons[newIndex]);
    }
  };

  const handleCloseLessonViewer = () => {
    setSelectedCourse(null);
    setSelectedLesson(null);
    setLessonIndex(0);
  };

  if (loading) {
    return <Loading type="courses" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadData} />;
  }

  // Show lesson viewer if a lesson is selected
  if (selectedLesson && selectedCourse) {
    return (
      <LessonViewer
        lesson={selectedLesson}
        course={selectedCourse}
        lessonIndex={lessonIndex}
        totalLessons={selectedCourse.lessons?.length || 0}
        isCompleted={selectedLesson.completed}
        onComplete={handleLessonComplete}
        onNext={() => handleLessonNavigation("next")}
        onPrevious={() => handleLessonNavigation("previous")}
        onClose={handleCloseLessonViewer}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Learning Classroom</h1>
        <p className="text-gray-400">
          Explore {courses.length} courses designed to accelerate your learning journey
        </p>
      </div>

{/* Search and Filters */}
      <div className="space-y-4">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search courses by title, description, or category..."
        />
        
        <FilterTabs
          tabs={filterTabs}
          activeTab={activeFilter}
          onTabChange={setActiveFilter}
        />
      </div>

      {/* Learning Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="glass rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-primary mb-1">
            {coursesWithProgress.filter(c => c.progress.completedLessons === c.lessons?.length && c.lessons?.length > 0).length}
          </div>
          <div className="text-sm text-gray-400">Completed</div>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-secondary mb-1">
            {coursesWithProgress.filter(c => c.progress.completedLessons > 0 && c.progress.completedLessons < (c.lessons?.length || 0)).length}
          </div>
          <div className="text-sm text-gray-400">In Progress</div>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-accent mb-1">
            {coursesWithProgress.reduce((sum, c) => sum + c.progress.completedLessons, 0)}
          </div>
          <div className="text-sm text-gray-400">Lessons Done</div>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-success mb-1">
            {coursesWithProgress.filter(c => c.progress.completedLessons === c.lessons?.length && c.lessons?.length > 0).length * 100}
          </div>
          <div className="text-sm text-gray-400">Points Earned</div>
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length === 0 ? (
<Empty
          icon="BookOpen"
          title="No courses available"
          message="New courses will be added soon!"
          actionText="Browse All Courses"
          onAction={() => {
            setActiveFilter("All Courses");
          }}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <CourseCard
                course={course}
                progress={course.progress}
                onClick={handleCourseClick}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Classroom;