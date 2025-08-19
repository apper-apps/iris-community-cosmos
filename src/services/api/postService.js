import postsData from "@/services/mockData/posts.json";

class PostService {
  constructor() {
    this.posts = [...postsData];
  }

  // Simulate API delay
  delay(ms = 250) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll() {
    await this.delay();
    return [...this.posts];
  }

  async getById(id) {
    await this.delay();
    const post = this.posts.find(p => p.Id === id);
    if (!post) {
      throw new Error(`Post with Id ${id} not found`);
    }
    return { ...post };
  }

  async create(postData) {
    await this.delay();
    
    const newPost = {
      Id: Math.max(...this.posts.map(p => p.Id), 0) + 1,
      ...postData,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: []
    };
    
    this.posts.unshift(newPost);
    return { ...newPost };
  }

  async update(id, postData) {
    await this.delay();
    
    const index = this.posts.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error(`Post with Id ${id} not found`);
    }
    
    this.posts[index] = { ...this.posts[index], ...postData };
    return { ...this.posts[index] };
  }

  async delete(id) {
    await this.delay();
    
    const index = this.posts.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error(`Post with Id ${id} not found`);
    }
    
    const deletedPost = this.posts.splice(index, 1)[0];
    return { ...deletedPost };
  }

  async getByCategory(category) {
    await this.delay();
    
    return this.posts
      .filter(post => post.category === category)
      .map(post => ({ ...post }));
  }

  async getByAuthor(authorId) {
    await this.delay();
    
    return this.posts
      .filter(post => post.authorId === authorId)
      .map(post => ({ ...post }));
  }

  async search(query) {
    await this.delay();
    
    const searchTerm = query.toLowerCase();
    return this.posts
      .filter(post => 
        post.title.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm)
      )
      .map(post => ({ ...post }));
  }

  async like(id) {
    const post = await this.getById(id);
    return this.update(id, { ...post, likes: post.likes + 1 });
  }

  async unlike(id) {
    const post = await this.getById(id);
    return this.update(id, { ...post, likes: Math.max(0, post.likes - 1) });
  }

  async addComment(id, comment) {
    const post = await this.getById(id);
    const newComment = {
      id: Date.now(),
      ...comment,
      timestamp: new Date().toISOString()
    };
    
    const updatedComments = [...(post.comments || []), newComment];
    return this.update(id, { ...post, comments: updatedComments });
  }
}

export default new PostService();