"use client";

import { Linkedin, Instagram } from "lucide-react";
import { MotionDiv, MotionSection } from "./common/Motion"; // adjust path if needed

export default function Team() {
  const team = [
    { name: "Ananya", role: "Event Specialist", img: "https://randomuser.me/api/portraits/women/10.jpg" },
    { name: "Rohan", role: "Creative Director", img: "https://randomuser.me/api/portraits/men/11.jpg" },
    { name: "Priya", role: "Client Manager", img: "https://randomuser.me/api/portraits/women/12.jpg" },
    { name: "Vikram", role: "Logistics Head", img: "https://randomuser.me/api/portraits/men/13.jpg" },
  ];

  return (
    <MotionSection
      className="max-w-7xl mx-auto my-20 px-6 md:px-12 relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          👨‍👩‍👧 Meet Our Team
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm md:text-base">
          Our passionate and creative team works tirelessly to make every event unforgettable.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
        {team.map((member, i) => (
          <MotionDiv
            key={i}
            whileHover={{ scale: 1.05, rotateY: 5 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            className="bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400 rounded-3xl shadow-lg p-6 flex flex-col items-center text-center transition-all duration-300 relative overflow-hidden"
          >
            {/* Floating blurred circle */}
            <MotionDiv
              className="absolute w-32 h-32 bg-pink-200 dark:bg-pink-700 opacity-20 rounded-full -top-8 -right-8"
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />
            
            <img
              src={member.img}
              alt={member.name}
              className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-white shadow-md mb-4 object-cover z-10"
            />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white z-10">{member.name}</h3>
            <p className="text-sm text-gray-700 dark:text-gray-200 z-10">{member.role}</p>

            {/* Social Icons on hover */}
            <MotionDiv
              className="flex gap-3 mt-3 opacity-0 hover:opacity-100 transition-opacity"
            >
              <a href="#" className="text-gray-800 dark:text-white hover:text-purple-700"><Linkedin size={20} /></a>
              <a href="#" className="text-gray-800 dark:text-white hover:text-pink-500"><Instagram size={20} /></a>
            </MotionDiv>
          </MotionDiv>
        ))}
      </div>
    </MotionSection>
  );
}
