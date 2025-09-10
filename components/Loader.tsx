"use client";
import React from "react";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/70 dark:bg-black/70 z-50">
      <img src="/loader.gif" alt="Loading..." className="w-12 h-12 animate-spin" />
    </div>
  );
}
