import { motion } from "framer-motion";

const Loading = ({ type = "posts" }) => {
  const renderPostSkeleton = () => (
    <div className="glass rounded-xl p-6 mb-4">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-gray-700 rounded-full animate-pulse" />
        <div className="flex-1 space-y-3">
          <div className="h-4 bg-gray-700 rounded animate-pulse w-1/4" />
          <div className="h-6 bg-gray-700 rounded animate-pulse w-3/4" />
          <div className="space-y-2">
            <div className="h-3 bg-gray-700 rounded animate-pulse" />
            <div className="h-3 bg-gray-700 rounded animate-pulse w-5/6" />
            <div className="h-3 bg-gray-700 rounded animate-pulse w-4/6" />
          </div>
          <div className="flex items-center gap-4 pt-2">
            <div className="h-4 bg-gray-700 rounded animate-pulse w-16" />
            <div className="h-4 bg-gray-700 rounded animate-pulse w-20" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderMemberSkeleton = () => (
    <div className="glass rounded-xl p-6 text-center">
      <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto mb-4 animate-pulse" />
      <div className="h-5 bg-gray-700 rounded animate-pulse mb-2" />
      <div className="h-4 bg-gray-700 rounded animate-pulse w-3/4 mx-auto mb-2" />
      <div className="h-4 bg-gray-700 rounded animate-pulse w-1/2 mx-auto" />
    </div>
  );

  const renderCourseSkeleton = () => (
    <div className="glass rounded-xl p-6">
      <div className="h-32 bg-gray-700 rounded-lg animate-pulse mb-4" />
      <div className="h-6 bg-gray-700 rounded animate-pulse mb-3" />
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-700 rounded animate-pulse" />
        <div className="h-4 bg-gray-700 rounded animate-pulse w-4/5" />
      </div>
      <div className="flex justify-between items-center mb-3">
        <div className="h-4 bg-gray-700 rounded animate-pulse w-24" />
        <div className="h-4 bg-gray-700 rounded animate-pulse w-16" />
      </div>
      <div className="h-2 bg-gray-700 rounded-full animate-pulse" />
    </div>
  );

  const renderLeaderboardSkeleton = () => (
    <div className="glass rounded-xl p-4 mb-3">
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 bg-gray-700 rounded animate-pulse" />
        <div className="w-12 h-12 bg-gray-700 rounded-full animate-pulse" />
        <div className="flex-1">
          <div className="h-5 bg-gray-700 rounded animate-pulse mb-2" />
          <div className="h-4 bg-gray-700 rounded animate-pulse w-3/4" />
        </div>
        <div className="text-right">
          <div className="h-6 bg-gray-700 rounded animate-pulse w-16 mb-1" />
          <div className="h-4 bg-gray-700 rounded animate-pulse w-12" />
        </div>
      </div>
    </div>
  );

  const getSkeletonCount = () => {
    switch (type) {
      case "posts": return 3;
      case "members": return 8;
      case "courses": return 6;
      case "leaderboard": return 10;
      default: return 3;
    }
  };

  const renderSkeleton = () => {
    switch (type) {
      case "posts": return renderPostSkeleton();
      case "members": return renderMemberSkeleton();
      case "courses": return renderCourseSkeleton();
      case "leaderboard": return renderLeaderboardSkeleton();
      default: return renderPostSkeleton();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={type === "members" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"}
    >
      {Array.from({ length: getSkeletonCount() }, (_, index) => (
        <div key={index}>
          {renderSkeleton()}
        </div>
      ))}
    </motion.div>
  );
};

export default Loading;