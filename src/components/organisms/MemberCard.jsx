import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import Avatar from "@/components/atoms/Avatar";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const MemberCard = ({ member, onClick }) => {
  const getActivityColor = (level) => {
    switch (level?.toLowerCase()) {
      case "high": return "success";
      case "medium": return "warning";
      case "low": return "default";
      default: return "default";
    }
  };

  const getActivityIcon = (level) => {
    switch (level?.toLowerCase()) {
      case "high": return "TrendingUp";
      case "medium": return "Minus";
      case "low": return "TrendingDown";
      default: return "Minus";
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick && onClick(member)}
      className="glass rounded-xl p-6 cursor-pointer hover:shadow-xl transition-all duration-200 group"
    >
      {/* Avatar and Basic Info */}
      <div className="text-center mb-4">
        <Avatar
          src={member.avatar}
          fallback={member.name}
          size="xl"
          className="mx-auto mb-3"
        />
        <h3 className="font-semibold text-white text-lg mb-1 group-hover:text-primary transition-colors">
          {member.name}
        </h3>
        <p className="text-sm text-gray-400">
          Joined {formatDistanceToNow(new Date(member.joinDate), { addSuffix: true })}
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Points */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <ApperIcon name="Zap" size={14} className="text-primary" />
            <span className="font-bold text-primary text-lg">
              {member.points?.toLocaleString() || 0}
            </span>
          </div>
          <p className="text-xs text-gray-400">Points</p>
        </div>

        {/* Activity Level */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <ApperIcon 
              name={getActivityIcon(member.activityLevel)} 
              size={14} 
              className={`text-${getActivityColor(member.activityLevel) === 'success' ? 'success' : getActivityColor(member.activityLevel) === 'warning' ? 'warning' : 'gray-400'}`}
            />
            <Badge variant={getActivityColor(member.activityLevel)} className="text-xs">
              {member.activityLevel || "Low"}
            </Badge>
          </div>
          <p className="text-xs text-gray-400">Activity</p>
        </div>
      </div>

      {/* Bio Preview */}
      {member.bio && (
        <p className="text-sm text-gray-400 text-center line-clamp-2 leading-relaxed">
          {member.bio}
        </p>
      )}

      {/* Hover Effect Indicator */}
      <div className="mt-4 pt-4 border-t border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center justify-center gap-2 text-primary text-sm">
          <span>View Profile</span>
          <ApperIcon name="ArrowRight" size={14} />
        </div>
      </div>
    </motion.div>
  );
};

export default MemberCard;