import { motion, MotionProps } from "framer-motion";
import { HTMLAttributes } from "react";

// Combine motion props with normal <section> HTML props
type MotionSectionProps = MotionProps & HTMLAttributes<HTMLElement>;

// Correct typing with forwardRef so className, style, id, etc. all work
export const MotionSection = motion.section as React.ForwardRefExoticComponent<
  MotionSectionProps & React.RefAttributes<HTMLElement>
>;
