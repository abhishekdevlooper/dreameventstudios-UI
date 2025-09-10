"use client";

import { AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState, memo } from "react";
import { MotionSection, MotionDiv } from "./common/Motion"; // adjust path

const faqs = [
  {
    q: "Do you handle destination weddings?",
    a: "Yes, we plan and manage destination weddings across India and abroad.",
  },
  {
    q: "Can you customize packages?",
    a: "Absolutely! Every event is unique and we tailor packages based on your needs.",
  },
  {
    q: "Do you provide last-minute event support?",
    a: "Yes, our team is experienced in quick turnaround event setups.",
  },
];

type FAQItemProps = {
  q: string;
  a: string;
  index: number;
};

const FAQItem = memo(function FAQItem({ q, a, index }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = `faq-answer-${index}`;

  return (
    <div className="bg-purple-50 dark:bg-gray-800 rounded-xl shadow overflow-hidden">
      <dt>
        <button
          className="w-full flex justify-between items-center p-4 focus:outline-none"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls={contentId}
        >
          <h3 className="font-semibold text-lg text-left">{q}</h3>
          <MotionDiv
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-5 h-5 text-purple-600 dark:text-purple-300" />
          </MotionDiv>
        </button>
      </dt>

      <AnimatePresence>
        {isOpen && (
          <MotionDiv
            key="content"
            id={contentId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="px-4 pb-4 text-gray-700 dark:text-gray-300 text-sm"
          >
            <dd>{a}</dd>
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
});

export default function FAQSection() {
  return (
    <MotionSection
      className="max-w-4xl mx-auto my-16 px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-300 text-center mb-12">
        Frequently Asked Questions
      </h2>

      <dl className="space-y-4">
        {faqs.map((faq, i) => (
          <FAQItem key={i} index={i} q={faq.q} a={faq.a} />
        ))}
      </dl>
    </MotionSection>
  );
}
