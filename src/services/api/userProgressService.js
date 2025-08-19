import userProgressData from "@/services/mockData/userProgress.json";

class UserProgressService {
  constructor() {
    this.userProgress = [...userProgressData];
  }

  // Simulate API delay
  delay(ms = 200) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll() {
    await this.delay();
    return [...this.userProgress];
  }

  async getById(id) {
    await this.delay();
    const progress = this.userProgress.find(p => p.Id === id);
    if (!progress) {
      throw new Error(`User progress with Id ${id} not found`);
    }
    return { ...progress };
  }

  async getByUserId(userId) {
    await this.delay();
    return this.userProgress
      .filter(progress => progress.userId === userId)
      .map(progress => ({ ...progress }));
  }

  async getByCourseId(courseId) {
    await this.delay();
    return this.userProgress
      .filter(progress => progress.courseId === courseId)
      .map(progress => ({ ...progress }));
  }

  async getUserCourseProgress(userId, courseId) {
    await this.delay();
    const progress = this.userProgress.find(p => 
      p.userId === userId && p.courseId === courseId
    );
    return progress ? { ...progress } : null;
  }

  async create(progressData) {
    await this.delay();
    
    const newProgress = {
      Id: Math.max(...this.userProgress.map(p => p.Id), 0) + 1,
      ...progressData,
      startedAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };
    
    this.userProgress.push(newProgress);
    return { ...newProgress };
  }

  async update(id, progressData) {
    await this.delay();
    
    const index = this.userProgress.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error(`User progress with Id ${id} not found`);
    }
    
    this.userProgress[index] = { 
      ...this.userProgress[index], 
      ...progressData,
      lastUpdated: new Date().toISOString()
    };
    return { ...this.userProgress[index] };
  }

  async updateUserCourseProgress(userId, courseId, progressData) {
    await this.delay();
    
    const existingProgress = await this.getUserCourseProgress(userId, courseId);
    
    if (existingProgress) {
      return this.update(existingProgress.Id, progressData);
    } else {
      return this.create({
        userId,
        courseId,
        completedLessons: 0,
        ...progressData
      });
    }
  }

  async incrementCompletedLessons(userId, courseId, lessonId) {
    await this.delay();
    
    const progress = await this.getUserCourseProgress(userId, courseId);
    
    if (progress) {
      return this.update(progress.Id, {
        completedLessons: progress.completedLessons + 1,
        lastAccessedLessonId: lessonId
      });
    } else {
      return this.create({
        userId,
        courseId,
        completedLessons: 1,
        lastAccessedLessonId: lessonId
      });
    }
  }

  async delete(id) {
    await this.delay();
    
    const index = this.userProgress.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error(`User progress with Id ${id} not found`);
    }
    
    const deletedProgress = this.userProgress.splice(index, 1)[0];
    return { ...deletedProgress };
  }

  async getUserStats(userId) {
    await this.delay();
    
    const userProgressList = await this.getByUserId(userId);
    
    const totalCoursesStarted = userProgressList.length;
    const totalLessonsCompleted = userProgressList.reduce((sum, progress) => 
      sum + progress.completedLessons, 0);
    
    return {
      totalCoursesStarted,
      totalLessonsCompleted,
      averageProgress: totalCoursesStarted > 0 
        ? totalLessonsCompleted / totalCoursesStarted 
        : 0
    };
  }
}

export default new UserProgressService();