import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Avatar from "@/components/atoms/Avatar";
import postService from "@/services/api/postService";

const CreatePostModal = ({ isOpen, onClose, onPostCreated }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Discussions");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    "Announcements",
    "Questions", 
    "Discussions",
    "General"
  ];

  const textFormatting = [
    { icon: "Bold", action: "bold", tooltip: "Bold" },
    { icon: "Italic", action: "italic", tooltip: "Italic" },
    { icon: "List", action: "bullet", tooltip: "Bullet Points" },
    { icon: "Image", action: "image", tooltip: "Add Image" }
  ];

  const handleFormat = (action) => {
    const textarea = document.getElementById("post-content");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);

    let newContent = content;
    let newCursorPos = start;

    switch (action) {
      case "bold":
        if (selectedText) {
          newContent = content.substring(0, start) + `**${selectedText}**` + content.substring(end);
          newCursorPos = end + 4;
        } else {
          newContent = content.substring(0, start) + "****" + content.substring(end);
          newCursorPos = start + 2;
        }
        break;
      case "italic":
        if (selectedText) {
          newContent = content.substring(0, start) + `*${selectedText}*` + content.substring(end);
          newCursorPos = end + 2;
        } else {
          newContent = content.substring(0, start) + "**" + content.substring(end);
          newCursorPos = start + 1;
        }
        break;
      case "bullet":
        const lines = content.split("\n");
        const currentLineIndex = content.substring(0, start).split("\n").length - 1;
        lines[currentLineIndex] = "• " + lines[currentLineIndex];
        newContent = lines.join("\n");
        newCursorPos = start + 2;
        break;
      case "image":
        newContent = content.substring(0, start) + "![Image description](image-url)" + content.substring(end);
        newCursorPos = start + 34;
        break;
    }

    setContent(newContent);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error("Please enter a title for your post");
      return;
    }

    if (!content.trim()) {
      toast.error("Please enter some content for your post");
      return;
    }

    setIsSubmitting(true);

    try {
      const newPost = await postService.create({
        title: title.trim(),
        content: content.trim(),
        category,
        authorId: "1", // Current user ID
        timestamp: new Date(),
        likes: 0,
        comments: []
      });

      toast.success("Post created successfully!");
      
      // Reset form
      setTitle("");
      setContent("");
      setCategory("Discussions");
      
      // Notify parent component
      if (onPostCreated) {
        onPostCreated(newPost);
      }
      
      onClose();
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setTitle("");
      setContent("");
      setCategory("Discussions");
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-2xl glass rounded-2xl border border-white/10 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <div className="flex items-center gap-3">
                  <Avatar 
                    fallback="John Doe"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white">Create New Post</h3>
                    <p className="text-sm text-gray-400">Share your thoughts with the community</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                >
                  <ApperIcon name="X" size={24} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Category Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-surface border border-gray-600 rounded-lg text-white focus:border-primary focus:ring-2 focus:ring-primary/20"
                    disabled={isSubmitting}
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Title
                  </label>
                  <Input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="What's your post about?"
                    disabled={isSubmitting}
                    className="text-lg"
                  />
                </div>

                {/* Content with formatting toolbar */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Content
                    </label>
                    <div className="flex items-center gap-1">
                      {textFormatting.map((format) => (
                        <button
                          key={format.action}
                          type="button"
                          onClick={() => handleFormat(format.action)}
                          disabled={isSubmitting}
                          className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors disabled:opacity-50"
                          title={format.tooltip}
                        >
                          <ApperIcon name={format.icon} size={16} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea
                    id="post-content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Share your thoughts, ask questions, or start a discussion..."
                    disabled={isSubmitting}
                    className="rich-editor w-full resize-none"
                    rows={8}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Use **bold**, *italic*, • bullet points, or add images
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleClose}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting || !title.trim() || !content.trim()}
                    className="min-w-[100px]"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Creating...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <ApperIcon name="Send" size={16} />
                        Post
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CreatePostModal;