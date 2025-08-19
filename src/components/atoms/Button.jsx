import React from "react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

const Button = React.forwardRef(({ 
  className, 
  variant = "primary", 
  size = "default", 
  children, 
  ...props 
}, ref) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:shadow-primary/20",
    secondary: "bg-surface text-white border border-gray-600 hover:border-gray-500 hover:bg-gray-700",
    ghost: "text-gray-300 hover:text-white hover:bg-white/5",
    danger: "bg-error text-white hover:bg-red-600",
    success: "bg-success text-white hover:bg-green-600"
  };
  
  const sizes = {
    sm: "h-8 px-3 text-sm rounded-lg",
    default: "h-10 px-4 py-2 rounded-lg",
    lg: "h-12 px-6 py-3 text-lg rounded-xl"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </motion.button>
  );
});

Button.displayName = "Button";

export default Button;