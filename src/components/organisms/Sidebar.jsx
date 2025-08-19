import { motion } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Avatar from "@/components/atoms/Avatar";
import { cn } from "@/utils/cn";
const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: "Home", label: "Feed" },
    { path: "/members", icon: "Users", label: "Members" },
    { path: "/classroom", icon: "BookOpen", label: "Classroom" },
    { path: "/leaderboard", icon: "Trophy", label: "Leaderboard" },
    { path: "/guidelines", icon: "Shield", label: "Guidelines" }
  ];

  const NavItem = ({ item }) => (
    <NavLink
      to={item.path}
      onClick={onClose}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
          isActive
            ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20"
            : "text-gray-400 hover:text-white hover:bg-white/5"
        )
      }
    >
      {({ isActive }) => (
        <>
          <ApperIcon 
            name={item.icon} 
            size={20} 
            className={cn(
              "transition-transform duration-200",
              isActive ? "scale-110" : "group-hover:scale-105"
            )}
          />
          <span className="font-medium">{item.label}</span>
        </>
      )}
    </NavLink>
  );

  // Desktop Sidebar
  const DesktopSidebar = () => (
<div className="hidden lg:block w-64 h-full bg-surface border-l border-gray-700 flex flex-col">
      <div className="p-6 flex-1">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
            <ApperIcon name="Zap" size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Community Hub</h1>
            <p className="text-sm text-gray-400">My Community</p>
          </div>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavItem key={item.path} item={item} />
          ))}
        </nav>
      </div>

      {/* Profile Section */}
      <div className="p-6 border-t border-gray-700">
        <div className="flex items-center gap-3">
          <Avatar 
            size="default"
            fallback="John Doe"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">John Doe</p>
            <p className="text-xs text-gray-400 truncate">@johndoe</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Mobile Sidebar
  const MobileSidebar = () => (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        className={cn(
          "lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300",
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
className="lg:hidden fixed right-0 top-0 h-full w-64 bg-surface border-l border-gray-700 z-50 flex flex-col"
      >
        <div className="p-6 flex-1">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <ApperIcon name="Zap" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Community Hub</h1>
                <p className="text-sm text-gray-400">My Community</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ApperIcon name="X" size={20} />
            </button>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavItem key={item.path} item={item} />
            ))}
          </nav>
        </div>

        {/* Profile Section */}
        <div className="p-6 border-t border-gray-700">
          <div className="flex items-center gap-3">
            <Avatar 
              size="default"
              fallback="John Doe"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">John Doe</p>
              <p className="text-xs text-gray-400 truncate">@johndoe</p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
};

export default Sidebar;