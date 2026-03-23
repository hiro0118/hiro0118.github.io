import { Variants } from "framer-motion";

export const tagContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

export const tagItem: Variants = {
  hidden: { opacity: 0, scale: 0.5, y: 10 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 380, damping: 20 },
  },
};
