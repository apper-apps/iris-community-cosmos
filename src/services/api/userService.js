import usersData from "@/services/mockData/users.json";

class UserService {
  constructor() {
    this.users = [...usersData];
  }

  // Simulate API delay
  delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll() {
    await this.delay();
    return [...this.users];
  }

  async getById(id) {
    await this.delay();
    const user = this.users.find(u => u.Id === id);
    if (!user) {
      throw new Error(`User with Id ${id} not found`);
    }
    return { ...user };
  }

  async create(userData) {
    await this.delay();
    
    const newUser = {
      Id: Math.max(...this.users.map(u => u.Id), 0) + 1,
      ...userData,
      joinDate: new Date().toISOString(),
      points: 0,
      activityLevel: "Low"
    };
    
    this.users.push(newUser);
    return { ...newUser };
  }

  async update(id, userData) {
    await this.delay();
    
    const index = this.users.findIndex(u => u.Id === id);
    if (index === -1) {
      throw new Error(`User with Id ${id} not found`);
    }
    
    this.users[index] = { ...this.users[index], ...userData };
    return { ...this.users[index] };
  }

  async delete(id) {
    await this.delay();
    
    const index = this.users.findIndex(u => u.Id === id);
    if (index === -1) {
      throw new Error(`User with Id ${id} not found`);
    }
    
    const deletedUser = this.users.splice(index, 1)[0];
    return { ...deletedUser };
  }

  async updatePoints(id, pointsToAdd) {
    await this.delay();
    
    const user = await this.getById(id);
    const updatedUser = {
      ...user,
      points: user.points + pointsToAdd
    };
    
    return this.update(id, updatedUser);
  }

  async getTopUsers(limit = 10) {
    await this.delay();
    
    return this.users
      .sort((a, b) => b.points - a.points)
      .slice(0, limit)
      .map(user => ({ ...user }));
  }
}

export default new UserService();