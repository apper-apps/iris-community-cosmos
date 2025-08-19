import coursesData from "@/services/mockData/courses.json";

class CourseService {
  constructor() {
    this.courses = [...coursesData];
  }

  // Simulate API delay
  delay(ms = 200) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll() {
    await this.delay();
    return [...this.courses];
  }

  async getById(id) {
    await this.delay();
    const course = this.courses.find(c => c.Id === id);
    if (!course) {
      throw new Error(`Course with Id ${id} not found`);
    }
    return { ...course };
  }

  async create(courseData) {
    await this.delay();
    
    const newCourse = {
      Id: Math.max(...this.courses.map(c => c.Id), 0) + 1,
      ...courseData,
      lessons: courseData.lessons || []
    };
    
    this.courses.push(newCourse);
    return { ...newCourse };
  }

  async update(id, courseData) {
    await this.delay();
    
    const index = this.courses.findIndex(c => c.Id === id);
    if (index === -1) {
      throw new Error(`Course with Id ${id} not found`);
    }
    
    this.courses[index] = { ...this.courses[index], ...courseData };
    return { ...this.courses[index] };
  }

  async delete(id) {
    await this.delay();
    
    const index = this.courses.findIndex(c => c.Id === id);
    if (index === -1) {
      throw new Error(`Course with Id ${id} not found`);
    }
    
    const deletedCourse = this.courses.splice(index, 1)[0];
    return { ...deletedCourse };
  }

  async getLessonById(courseId, lessonId) {
    await this.delay();
    
    const course = await this.getById(courseId);
    const lesson = course.lessons?.find(l => l.Id === lessonId);
    
    if (!lesson) {
      throw new Error(`Lesson with Id ${lessonId} not found in course ${courseId}`);
    }
    
    return { ...lesson };
  }

  async updateLesson(courseId, lessonId, lessonData) {
    await this.delay();
    
    const course = await this.getById(courseId);
    const lessonIndex = course.lessons?.findIndex(l => l.Id === lessonId);
    
    if (lessonIndex === -1) {
      throw new Error(`Lesson with Id ${lessonId} not found in course ${courseId}`);
    }
    
    course.lessons[lessonIndex] = { ...course.lessons[lessonIndex], ...lessonData };
    return this.update(courseId, course);
  }

  async markLessonComplete(courseId, lessonId) {
    return this.updateLesson(courseId, lessonId, { completed: true });
  }

  async markLessonIncomplete(courseId, lessonId) {
    return this.updateLesson(courseId, lessonId, { completed: false });
  }

  async getCourseProgress(courseId) {
    await this.delay();
    
    const course = await this.getById(courseId);
    const totalLessons = course.lessons?.length || 0;
    const completedLessons = course.lessons?.filter(l => l.completed).length || 0;
    
    return {
      courseId,
      totalLessons,
      completedLessons,
      percentage: totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0
    };
  }

  async search(query) {
    await this.delay();
    
    const searchTerm = query.toLowerCase();
    return this.courses
      .filter(course =>
        course.title.toLowerCase().includes(searchTerm) ||
        course.description.toLowerCase().includes(searchTerm)
      )
      .map(course => ({ ...course }));
  }
}

export default new CourseService();