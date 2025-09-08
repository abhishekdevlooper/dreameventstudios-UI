"use client";
import { Facebook, Instagram, Linkedin, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-300 via-purple-400 to-purple-500 text-gray-100 py-8 px-6 md:px-16 rounded-3xl shadow-lg">
      {/* Social Media */}
      <div className="flex justify-center md:justify-between items-center flex-col md:flex-row gap-6 max-w-6xl mx-auto">
        
        {/* Social Icons */}
        <div className="flex gap-6">
          <a href="https://facebook.com" target="_blank" className="hover:text-purple-900 transition">
            <Facebook size={24} />
          </a>
          <a href="https://instagram.com" target="https://www.instagram.com/dream.event.studios/" className="hover:text-purple-900 transition">
            <Instagram size={24} />
          </a>
          <a href="https://linkedin.com" target="_blank" className="hover:text-purple-900 transition">
            <Linkedin size={24} />
          </a>
          <a href="https://wa.me/918892467800" target="_blank" className="hover:text-purple-900 transition">
            <MessageCircle size={24} />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs md:text-sm text-gray-100/80 text-center">
          © {new Date().getFullYear()} Dream Event Studios. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
