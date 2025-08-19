import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Avatar from "@/components/atoms/Avatar";
import Badge from "@/components/atoms/Badge";
import { cn } from "@/utils/cn";

const NotificationsPanel = ({ isOpen, onClose }) => {
  const notifications = [
    {
      id: 1,
      type: "like",
      message: "Sarah liked your post about React best practices",
      user: {
        name: "Sarah Wilson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b605?w=32&h=32&fit=crop&crop=face"
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      unread: true
    },
    {
      id: 2,
      type: "comment",
      message: "Mike commented on your post: \"Great insights! Thanks for sharing.\"",
      user: {
        name: "Mike Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      unread: true
    },
    {
      id: 3,
      type: "achievement",
      message: "You've completed the Advanced JavaScript course!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      unread: false
    },
    {
      id: 4,
      type: "announcement",
      message: "New community guidelines have been posted",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      unread: false
    }
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case "like": return { icon: "Heart", color: "text-accent" };
      case "comment": return { icon: "MessageCircle", color: "text-primary" };
      case "achievement": return { icon: "Trophy", color: "text-warning" };
      case "announcement": return { icon: "Megaphone", color: "text-info" };
      default: return { icon: "Bell", color: "text-gray-400" };
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={onClose}
          />
          
          {/* Notifications Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute right-0 top-12 w-80 max-h-96 glass rounded-xl border border-white/10 z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h3 className="font-semibold text-white">Notifications</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ApperIcon name="X" size={18} />
              </button>
            </div>

            {/* Notifications List */}
            <div className="max-h-80 overflow-y-auto scrollbar-thin">
              {notifications.map((notification) => {
                const { icon, color } = getNotificationIcon(notification.type);
                
                return (
                  <motion.div
                    key={notification.id}
                    whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.02)" }}
                    className={cn(
                      "p-4 border-b border-gray-800 last:border-b-0 cursor-pointer transition-colors",
                      notification.unread && "bg-primary/5"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      {notification.user ? (
                        <div className="relative">
                          <Avatar 
                            src={notification.user.avatar}
                            fallback={notification.user.name}
                            size="sm"
                          />
                          <div className={cn("absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-surface flex items-center justify-center", color)}>
                            <ApperIcon name={icon} size={10} />
                          </div>
                        </div>
                      ) : (
                        <div className={cn("w-8 h-8 rounded-full bg-surface flex items-center justify-center", color)}>
                          <ApperIcon name={icon} size={16} />
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-300 leading-relaxed">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs text-gray-500">
                            {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                          </p>
                          {notification.unread && (
                            <div className="w-2 h-2 bg-primary rounded-full" />
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-700">
              <button className="w-full text-center text-sm text-primary hover:text-secondary transition-colors">
                View All Notifications
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationsPanel;