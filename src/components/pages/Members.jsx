import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Loading from "@/components/ui/Loading";
import SearchBar from "@/components/molecules/SearchBar";
import MemberCard from "@/components/organisms/MemberCard";
import userService from "@/services/api/userService";

const Members = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const loadMembers = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await userService.getAll();
      setMembers(data);
    } catch (err) {
      console.error("Error loading members:", err);
      setError("Failed to load community members. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const filteredMembers = members.filter(member => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      member.name.toLowerCase().includes(query) ||
      member.bio?.toLowerCase().includes(query) ||
      member.activityLevel?.toLowerCase().includes(query)
    );
  }).sort((a, b) => b.points - a.points);

  const handleMemberClick = (member) => {
    // TODO: Navigate to member profile
    console.log("View member profile:", member);
  };

  if (loading) {
    return <Loading type="members" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadMembers} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Community Members</h1>
        <p className="text-gray-400">
          Connect with {members.length} amazing learners in our community
        </p>
      </div>

{/* Search */}
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search members by name, bio, or activity level..."
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-primary mb-1">
            {members.length}
          </div>
          <div className="text-sm text-gray-400">Total Members</div>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-secondary mb-1">
            {members.filter(m => m.activityLevel === "High").length}
          </div>
          <div className="text-sm text-gray-400">Highly Active</div>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-accent mb-1">
            {Math.round(members.reduce((sum, m) => sum + m.points, 0) / members.length) || 0}
          </div>
          <div className="text-sm text-gray-400">Avg Points</div>
        </div>
      </div>

      {/* Members Grid */}
      {filteredMembers.length === 0 ? (
<Empty
          icon="Users"
          title={searchQuery ? "No members found" : "No members yet"}
          message={searchQuery ? "Try adjusting your search terms" : "Be the first to join this community!"}
          actionText="Invite Members"
          onAction={() => console.log("Invite members")}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredMembers.map((member, index) => (
            <motion.div
              key={member.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <MemberCard
                member={member}
                onClick={handleMemberClick}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Search Results Count */}
      {searchQuery && (
        <div className="text-center text-sm text-gray-400 mt-6">
          Showing {filteredMembers.length} of {members.length} members
        </div>
      )}
    </div>
  );
};

export default Members;