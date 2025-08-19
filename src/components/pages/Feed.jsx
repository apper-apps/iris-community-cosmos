import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import FilterTabs from "@/components/molecules/FilterTabs";
import SearchBar from "@/components/molecules/SearchBar";
import PostCard from "@/components/organisms/PostCard";
import CreatePostModal from "@/components/organisms/CreatePostModal";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import postService from "@/services/api/postService";
import userService from "@/services/api/userService";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Posts");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [likedPosts, setLikedPosts] = useState(new Set());

  const filterTabs = [
    { label: "All Posts", value: "All Posts", count: posts.length },
    { label: "Announcements", value: "Announcements", count: posts.filter(p => p.category === "Announcements").length },
    { label: "Questions", value: "Questions", count: posts.filter(p => p.category === "Questions").length },
    { label: "Discussions", value: "Discussions", count: posts.filter(p => p.category === "Discussions").length }
  ];

  const loadData = async () => {
    setLoading(true);
    setError("");

    try {
      const [postsData, usersData] = await Promise.all([
        postService.getAll(),
        userService.getAll()
      ]);
      
      setPosts(postsData);
      setUsers(usersData);
    } catch (err) {
      console.error("Error loading feed data:", err);
      setError("Failed to load posts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredPosts = posts.filter(post => {
const matchesFilter = activeFilter === "All Posts" || post.category === activeFilter;
    
    return matchesFilter;
  }).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  const handleLike = async (postId) => {
    try {
      const post = posts.find(p => p.Id === postId);
      if (!post) return;

      const isCurrentlyLiked = likedPosts.has(postId);
      const newLikeCount = isCurrentlyLiked ? post.likes - 1 : post.likes + 1;

      // Update local state immediately for better UX
      setPosts(prev => prev.map(p => 
        p.Id === postId ? { ...p, likes: newLikeCount } : p
      ));

      if (isCurrentlyLiked) {
        setLikedPosts(prev => new Set([...prev].filter(id => id !== postId)));
      } else {
        setLikedPosts(prev => new Set([...prev, postId]));
        toast.success("+2 points for liking a post! ❤️");
      }

      // Update post in service
      await postService.update(postId, { ...post, likes: newLikeCount });

    } catch (err) {
      console.error("Error updating like:", err);
      toast.error("Failed to update like. Please try again.");
      // Revert on error
      loadData();
    }
  };

  const handleCommentSubmit = async (postId, comment) => {
    try {
      const post = posts.find(p => p.Id === postId);
      if (!post) return;

      const author = users.find(u => u.Id === comment.authorId);
      const commentWithAuthor = {
        ...comment,
        author
      };

      const updatedPost = {
        ...post,
        comments: [...(post.comments || []), commentWithAuthor]
      };

      setPosts(prev => prev.map(p => 
        p.Id === postId ? updatedPost : p
      ));

      await postService.update(postId, updatedPost);
      toast.success("+5 points for commenting! 💬");

    } catch (err) {
      console.error("Error adding comment:", err);
      toast.error("Failed to add comment. Please try again.");
      loadData();
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts(prev => [newPost, ...prev]);
    toast.success("+10 points for creating a post! 🎉");
  };

  if (loading) {
    return <Loading type="posts" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadData} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Community Feed</h1>
          <p className="text-gray-400">Stay connected with your learning community</p>
        </div>
        
        <Button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 shrink-0"
        >
          <ApperIcon name="Plus" size={16} />
          Create Post
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        
        <FilterTabs
          tabs={filterTabs}
          activeTab={activeFilter}
          onTabChange={setActiveFilter}
        />
      </div>

      {/* Posts */}
      {filteredPosts.length === 0 ? (
        <Empty
icon="MessageSquare"
          title="No posts yet"
          message="Be the first to share something with the community!"
          actionText="Create First Post"
          onAction={() => setShowCreateModal(true)}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
className="space-y-6"
        >
          {filteredPosts.map((post, index) => {
            const author = users.find(u => u.Id === post.authorId);
            return (
              <motion.div
                key={post.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <PostCard
                  post={post}
                  author={author}
                  isLiked={likedPosts.has(post.Id)}
                  onLike={handleLike}
                  onCommentSubmit={handleCommentSubmit}
                />
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onPostCreated={handlePostCreated}
      />
    </div>
  );
};

export default Feed;