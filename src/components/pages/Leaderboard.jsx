import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Avatar from "@/components/atoms/Avatar";
import Badge from "@/components/atoms/Badge";
import FilterTabs from "@/components/molecules/FilterTabs";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import userService from "@/services/api/userService";
import { cn } from "@/utils/cn";

const Leaderboard = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [timeFrame, setTimeFrame] = useState("All Time");

  const filterTabs = [
    { label: "All Time", value: "All Time" },
    { label: "This Week", value: "This Week" },
    { label: "This Month", value: "This Month" }
  ];

  const loadMembers = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await userService.getAll();
      setMembers(data);
    } catch (err) {
      console.error("Error loading leaderboard:", err);
      setError("Failed to load leaderboard. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  // Sort members by points and add ranking
  const rankedMembers = members
    .sort((a, b) => b.points - a.points)
    .map((member, index) => ({
      ...member,
      rank: index + 1
    }));

  const getRankBadge = (rank) => {
    if (rank === 1) return { icon: "Crown", color: "text-yellow-400", bg: "bg-yellow-400/20" };
    if (rank === 2) return { icon: "Award", color: "text-gray-300", bg: "bg-gray-300/20" };
    if (rank === 3) return { icon: "Medal", color: "text-amber-600", bg: "bg-amber-600/20" };
    return null;
  };

  const getRankDisplay = (rank) => {
    const badge = getRankBadge(rank);
    if (badge) {
      return (
        <div className={cn("w-12 h-12 rounded-full flex items-center justify-center", badge.bg)}>
          <ApperIcon name={badge.icon} size={20} className={badge.color} />
        </div>
      );
    }
    return (
      <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center text-white font-bold">
        #{rank}
      </div>
    );
  };

  if (loading) {
    return <Loading type="leaderboard" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadMembers} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Community Leaderboard</h1>
        <p className="text-gray-400">
          See who's leading the way in our learning community
        </p>
      </div>

      {/* Time Frame Filters */}
      <FilterTabs
        tabs={filterTabs}
        activeTab={timeFrame}
        onTabChange={setTimeFrame}
      />

      {/* Top 3 Podium */}
      {rankedMembers.length >= 3 && (
        <div className="glass rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-semibold text-white mb-6 text-center">
            🏆 Top Performers
          </h2>
          
          <div className="flex items-end justify-center gap-4 max-w-2xl mx-auto">
            {/* 2nd Place */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="glass rounded-xl p-4 mb-3 h-32 flex flex-col justify-end">
                <Avatar
                  src={rankedMembers[1].avatar}
                  fallback={rankedMembers[1].name}
                  size="lg"
                  className="mx-auto mb-2"
                />
                <div className="w-8 h-8 bg-gray-300/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <ApperIcon name="Award" size={16} className="text-gray-300" />
                </div>
              </div>
              <h3 className="font-semibold text-white text-sm mb-1">{rankedMembers[1].name}</h3>
              <p className="text-primary font-bold">{rankedMembers[1].points.toLocaleString()} pts</p>
            </motion.div>

            {/* 1st Place */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="glass rounded-xl p-4 mb-3 h-40 flex flex-col justify-end relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/10 to-transparent" />
                <Avatar
                  src={rankedMembers[0].avatar}
                  fallback={rankedMembers[0].name}
                  size="xl"
                  className="mx-auto mb-2 relative z-10"
                />
                <div className="w-10 h-10 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-2 relative z-10">
                  <ApperIcon name="Crown" size={20} className="text-yellow-400" />
                </div>
              </div>
              <h3 className="font-semibold text-white mb-1">{rankedMembers[0].name}</h3>
              <p className="text-yellow-400 font-bold text-lg">{rankedMembers[0].points.toLocaleString()} pts</p>
            </motion.div>

            {/* 3rd Place */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="glass rounded-xl p-4 mb-3 h-28 flex flex-col justify-end">
                <Avatar
                  src={rankedMembers[2].avatar}
                  fallback={rankedMembers[2].name}
                  size="default"
                  className="mx-auto mb-2"
                />
                <div className="w-6 h-6 bg-amber-600/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <ApperIcon name="Medal" size={14} className="text-amber-600" />
                </div>
              </div>
              <h3 className="font-semibold text-white text-sm mb-1">{rankedMembers[2].name}</h3>
              <p className="text-primary font-bold">{rankedMembers[2].points.toLocaleString()} pts</p>
            </motion.div>
          </div>
        </div>
      )}

      {/* Full Leaderboard */}
      {rankedMembers.length === 0 ? (
        <Empty
          icon="Trophy"
          title="No rankings yet"
          message="Start earning points by participating in the community!"
          actionText="View Feed"
          onAction={() => window.location.href = "/"}
        />
      ) : (
        <div className="glass rounded-xl overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white">Full Rankings</h2>
          </div>
          
          <div className="space-y-2 p-4">
            {rankedMembers.map((member, index) => (
              <motion.div
                key={member.Id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors",
                  member.rank <= 3 && "bg-gradient-to-r from-primary/5 to-secondary/5"
                )}
              >
                {/* Rank */}
                <div className="flex items-center justify-center w-12">
                  {getRankDisplay(member.rank)}
                </div>

                {/* Avatar and Info */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Avatar
                    src={member.avatar}
                    fallback={member.name}
                    size="lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white truncate">
                      {member.name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {member.activityLevel} Activity • Member since {new Date(member.joinDate).getFullYear()}
                    </p>
                  </div>
                </div>

                {/* Points and Change */}
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <ApperIcon name="Zap" size={16} className="text-primary" />
                    <span className="font-bold text-white text-lg">
                      {member.points.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">points</p>
                </div>

                {/* Activity Badge */}
                <div className="hidden sm:block">
                  <Badge
                    variant={member.activityLevel === "High" ? "success" : member.activityLevel === "Medium" ? "warning" : "default"}
                    className="text-xs"
                  >
                    {member.activityLevel}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-700 text-center">
            <p className="text-sm text-gray-400">
              Rankings update in real-time based on community participation
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;