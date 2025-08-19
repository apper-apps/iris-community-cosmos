import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const FilterTabs = ({ tabs, activeTab, onTabChange, className }) => {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {tabs.map((tab) => (
        <motion.button
          key={tab.value}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onTabChange(tab.value)}
          className={cn(
            "px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 relative overflow-hidden",
            activeTab === tab.value
              ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          )}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className={cn(
              "ml-2 px-2 py-0.5 rounded-full text-xs",
              activeTab === tab.value
                ? "bg-white/20"
                : "bg-white/10"
            )}>
              {tab.count}
            </span>
          )}
        </motion.button>
      ))}
    </div>
  );
};

export default FilterTabs;