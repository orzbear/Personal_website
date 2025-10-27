import React from "react";
import { motion } from "motion/react";

export const SkeletonGradient: React.FC = () => (
  <motion.div
    initial={{ backgroundPosition: "0 50%" }}
    animate={{ backgroundPosition: ["0 50%", "100% 50%", "0 50%"] }}
    transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
    className="absolute inset-0 rounded-2xl opacity-30 pointer-events-none"
    style={{
      background:
        "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
      backgroundSize: "400% 400%",
    }}
  />
);

export const SkeletonLines: React.FC = () => {
  const arr = new Array(6).fill(0);
  return (
    <div className="absolute inset-0 p-4 opacity-40 pointer-events-none">
      <div className="space-y-2">
        {arr.map((_, i) => (
          <motion.div
            key={i}
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.3, delay: i * 0.03 }}
            className="h-3 rounded-full bg-neutral-200/70"
            style={{ maxWidth: `${Math.random() * (100 - 40) + 40}%` }}
          />
        ))}
      </div>
    </div>
  );
};
