import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";

const Guidelines = () => {
  const guidelines = [
    {
      title: "Respectful Communication",
      description: "Treat all community members with respect and kindness. No harassment, discrimination, or offensive language.",
      icon: "MessageCircle",
      color: "primary"
    },
    {
      title: "Quality Content",
      description: "Share valuable, relevant content. Avoid spam, duplicate posts, or off-topic discussions.",
      icon: "Star",
      color: "secondary"
    },
    {
      title: "Help Others Learn",
      description: "Support fellow learners by answering questions, sharing resources, and providing constructive feedback.",
      icon: "Heart",
      color: "accent"
    },
    {
      title: "Follow Course Guidelines",
      description: "Complete lessons honestly, submit original work for assignments, and participate in discussions meaningfully.",
      icon: "BookOpen",
      color: "info"
    },
    {
      title: "Privacy & Safety",
      description: "Protect your privacy and that of others. Don't share personal information or inappropriate content.",
      icon: "Shield",
      color: "success"
    },
    {
      title: "Report Issues",
      description: "Report any violations, technical issues, or concerns to moderators promptly using the report feature.",
      icon: "Flag",
      color: "warning"
    }
  ];

  const reportingOptions = [
    "Spam or irrelevant content",
    "Harassment or abusive behavior",
    "Inappropriate or offensive content",
    "Plagiarism or academic dishonesty",
    "Technical issues or bugs",
    "Other community violations"
  ];

  const pointsSystem = [
    { action: "Create a post", points: 10, icon: "Plus" },
    { action: "Comment on posts", points: 5, icon: "MessageCircle" },
    { action: "Like a post", points: 2, icon: "Heart" },
    { action: "Complete a lesson", points: 20, icon: "CheckCircle" },
    { action: "Finish a course", points: 100, icon: "Award" },
    { action: "Help others (verified)", points: 15, icon: "Users" }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-6"
        >
          <ApperIcon name="Shield" size={36} className="text-primary" />
        </motion.div>
        <h1 className="text-3xl font-bold text-white mb-4">Community Guidelines</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Our community thrives on mutual respect, learning, and collaboration. Please follow these guidelines to help create a positive environment for everyone.
        </p>
      </div>

      {/* Core Guidelines */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-8"
      >
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <ApperIcon name="BookOpen" size={24} className="text-primary" />
          Community Standards
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guidelines.map((guideline, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="flex gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${guideline.color}/20`}>
                <ApperIcon name={guideline.icon} size={20} className={`text-${guideline.color}`} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-2">{guideline.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{guideline.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Points System */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-2xl p-8"
      >
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <ApperIcon name="Zap" size={24} className="text-primary" />
          Points & Rewards System
        </h2>
        
        <p className="text-gray-400 mb-6">
          Earn points by actively participating in our community. Points reflect your engagement and contributions.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pointsSystem.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 * index }}
              className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20"
            >
              <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                <ApperIcon name={item.icon} size={16} className="text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-medium">{item.action}</p>
                <p className="text-primary text-xs font-semibold">+{item.points} points</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Reporting System */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-2xl p-8"
      >
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <ApperIcon name="Flag" size={24} className="text-warning" />
          Reporting & Moderation
        </h2>
        
        <p className="text-gray-400 mb-6">
          Help keep our community safe by reporting content that violates our guidelines. All reports are reviewed by our moderation team.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <ApperIcon name="AlertCircle" size={16} className="text-warning" />
              When to Report
            </h3>
            <div className="space-y-2">
              {reportingOptions.map((option, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                  <ApperIcon name="Dot" size={12} className="text-warning" />
                  <span className="text-gray-300 text-sm">{option}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <ApperIcon name="Clock" size={16} className="text-info" />
              Moderation Process
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Badge variant="info" className="mt-1">1</Badge>
                <div>
                  <p className="text-white text-sm font-medium">Report Submitted</p>
                  <p className="text-gray-400 text-xs">Your report is immediately logged and queued for review</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="info" className="mt-1">2</Badge>
                <div>
                  <p className="text-white text-sm font-medium">Review Process</p>
                  <p className="text-gray-400 text-xs">Our moderation team reviews within 24 hours</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="success" className="mt-1">3</Badge>
                <div>
                  <p className="text-white text-sm font-medium">Resolution</p>
                  <p className="text-gray-400 text-xs">Appropriate action taken and reporter notified</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Report Button */}
        <div className="mt-8 p-6 bg-gradient-to-r from-warning/10 to-error/10 border border-warning/30 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-white mb-1">Need to Report Something?</h3>
              <p className="text-gray-400 text-sm">Contact our moderation team directly</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-warning to-error text-white font-medium rounded-lg hover:shadow-lg hover:shadow-warning/20 transition-all duration-200 flex items-center gap-2"
            >
              <ApperIcon name="Flag" size={16} />
              Report Issue
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Contact Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass rounded-2xl p-8 text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-4">Questions or Concerns?</h2>
        <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
          If you have any questions about these guidelines or need clarification on community policies, don't hesitate to reach out to our support team.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all duration-200 flex items-center gap-2"
          >
            <ApperIcon name="Mail" size={16} />
            Contact Support
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-surface text-white border border-gray-600 font-medium rounded-lg hover:border-gray-500 hover:bg-gray-700 transition-all duration-200 flex items-center gap-2"
          >
            <ApperIcon name="HelpCircle" size={16} />
            FAQ
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Guidelines;