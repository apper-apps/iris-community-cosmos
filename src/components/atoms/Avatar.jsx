import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Avatar = React.forwardRef(({ 
  className, 
  src, 
  alt, 
  size = "default",
  fallback,
  ...props 
}, ref) => {
  const sizes = {
    sm: "h-8 w-8 text-xs",
    default: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-lg"
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  return (
    <div
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-primary to-secondary",
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {src ? (
        <img
          className="aspect-square h-full w-full object-cover"
          alt={alt}
          src={src}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-surface text-white font-medium">
          {fallback ? getInitials(fallback) : <ApperIcon name="User" size={16} />}
        </div>
      )}
    </div>
  );
});

Avatar.displayName = "Avatar";

export default Avatar;