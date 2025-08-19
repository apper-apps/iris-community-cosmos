import { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import Avatar from "@/components/atoms/Avatar";
import Badge from "@/components/atoms/Badge";
import NotificationsPanel from "@/components/organisms/NotificationsPanel";

const Header = ({ onMenuToggle, userPoints = 1250 }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
    // TODO: Implement global search functionality
    console.log("Searching for:", query);
  };

  return (
    <header className="h-16 bg-surface border-b border-gray-700 px-4 lg:px-6 flex items-center justify-between sticky top-0 z-30 backdrop-blur-lg">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="lg:hidden text-gray-400 hover:text-white transition-colors"
        >
          <ApperIcon name="Menu" size={24} />
        </button>

        <div className="hidden lg:block">
          <h2 className="text-lg font-semibold text-white">My Community</h2>
        </div>
      </div>

      {/* Center Section - Search */}
      <div className="flex-1 max-w-md mx-4">
        <SearchBar
          placeholder="Search posts, courses, members..."
          onSearch={handleSearch}
          className="w-full"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Points Display */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 rounded-lg"
        >
          <ApperIcon name="Zap" size={16} className="text-primary" />
          <span className="text-primary font-semibold">{userPoints.toLocaleString()}</span>
        </motion.div>

        {/* Notifications */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-gray-400 hover:text-white transition-colors"
          >
            <ApperIcon name="Bell" size={20} />
            <Badge 
              variant="error" 
              className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs flex items-center justify-center"
            >
              3
            </Badge>
          </motion.button>

          <NotificationsPanel 
            isOpen={showNotifications}
            onClose={() => setShowNotifications(false)}
          />
        </div>

        {/* Profile Menu */}
        <div className="relative">

          {/* Profile Dropdown */}
          {showProfile && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="absolute right-0 top-12 w-64 glass rounded-xl p-4 border border-white/10"
            >
              <div className="flex items-center gap-3 mb-4">
                <Avatar 
                  size="lg"
                  fallback="John Doe"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face"
                />
                <div>
                  <h3 className="font-semibold text-white">John Doe</h3>
                  <p className="text-sm text-gray-400">Community Member</p>
                </div>
              </div>

              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors flex items-center gap-2">
                  <ApperIcon name="User" size={16} />
                  View Profile
                </button>
                <button className="w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors flex items-center gap-2">
                  <ApperIcon name="Settings" size={16} />
                  Settings
                </button>
                <div className="border-t border-gray-700 my-2" />
                <div className="px-3 py-2 flex items-center justify-between">
                  <span className="text-sm text-gray-400">Total Points</span>
                  <span className="text-primary font-semibold">{userPoints.toLocaleString()}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;