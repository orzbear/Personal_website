"use client";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, useAnimationControls } from "framer-motion";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const controls = useAnimationControls();

  useEffect(() => {
    controls.set({ opacity: 0, y: 16 });      // no first paint flicker
    controls.start({ opacity: 1, y: 0, transition: { duration: 0.28, ease: "easeOut" } });
  }, [location.pathname, controls]);

  return (
    <motion.div
      // no AnimatePresence here
      animate={controls}
      style={{ minHeight: "60vh", position: "relative" }}
    >
      {children}
    </motion.div>
  );
}
