"use client";

import { motion, MotionProps } from "framer-motion";
import React, {
  HTMLAttributes,
  ButtonHTMLAttributes,
  LiHTMLAttributes,
  AnchorHTMLAttributes,
  forwardRef,
} from "react";

// ✅ Generic utility with correct typing
function createMotionComponent<T extends HTMLElement, P>(
  tag: keyof React.JSX.IntrinsicElements
) {
  return forwardRef<T, MotionProps & P>((props, ref) =>
    React.createElement(motion(tag), { ...props, ref })
  );
}

// ✅ Export motion components with proper intrinsic props
export const MotionDiv = createMotionComponent<HTMLDivElement, HTMLAttributes<HTMLDivElement>>("div");
export const MotionSection = createMotionComponent<HTMLElement, HTMLAttributes<HTMLElement>>("section");
export const MotionH1 = createMotionComponent<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>("h1");
export const MotionH2 = createMotionComponent<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>("h2");
export const MotionH3 = createMotionComponent<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>("h3");
export const MotionP = createMotionComponent<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>("p");
export const MotionSpan = createMotionComponent<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>("span");
export const MotionButton = createMotionComponent<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>("button");
export const MotionUl = createMotionComponent<HTMLUListElement, HTMLAttributes<HTMLUListElement>>("ul");
export const MotionLi = createMotionComponent<HTMLLIElement, LiHTMLAttributes<HTMLLIElement>>("li");
export const MotionArticle = createMotionComponent<HTMLElement, HTMLAttributes<HTMLElement>>("article");
export const MotionA = createMotionComponent<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement>>("a");
