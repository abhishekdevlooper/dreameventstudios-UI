"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { CalendarDays, Mail, User, Phone, DollarSign } from "lucide-react";
import Lottie from "lottie-react";
import Confetti from "react-confetti";
import SEO from "@/components/SEO";

// --- Motion Variants ---
const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1 } }),
};

// --- Event Icons ---
const eventIcons: Record<string, string> = {
  wedding: "💍",
  birthday: "🎂",
  corporate: "🏢",
};

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    eventType: "",
    date: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [successAnimation, setSuccessAnimation] = useState<any>(null);
  const [shake, setShake] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // --- Load Lottie Animation ---
  useEffect(() => {
    fetch("/animations/success.json")
      .then((res) => res.json())
      .then((data) => setSuccessAnimation(data))
      .catch(() => console.warn("Failed to load animation"));
  }, []);

  // --- Handlers ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/bookings/", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        budget: formData.budget,
        event_type: formData.eventType, // ✅ map to backend
        preferred_date: formData.date,  // ✅ keep as ISO string YYYY-MM-DD
      });
      setSubmitted(true);
      setShowConfetti(true);
    } catch (err: any) {
      console.error(err.response?.data || err);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  // --- Validations ---
  const isNameValid = formData.name.length >= 3;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isDateValid = formData.date && new Date(formData.date) >= new Date();

  // --- Form Fields ---
  const fields = [
    {
      label: "Full Name",
      name: "name",
      type: "text",
      icon: <User className="absolute left-3 top-3 text-gray-400" size={20} />,
      placeholder: "John Doe",
      isValid: isNameValid,
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      icon: <Mail className="absolute left-3 top-3 text-gray-400" size={20} />,
      placeholder: "you@example.com",
      isValid: isEmailValid,
    },
    {
      label: "Phone",
      name: "phone",
      type: "text",
      icon: <Phone className="absolute left-3 top-3 text-gray-400" size={20} />,
      placeholder: "+91 98765 43210",
      isValid: true,
    },
    {
      label: "Budget",
      name: "budget",
      type: "text",
      icon: <DollarSign className="absolute left-3 top-3 text-gray-400" size={20} />,
      placeholder: "₹50,000",
      isValid: true,
    },
  ];

  return (
    <>
      <SEO
        title="Book Your Event | Celebrate With Us"
        description="Reserve your special day with our expert event planners. Weddings, parties, corporate events — fully customized experiences."
      />

      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}

      <div className="min-h-screen bg-gradient-to-tr from-purple-100 to-white dark:from-gray-900 dark:to-gray-800 px-4 py-12 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6 ${
            shake ? "animate-shake" : ""
          }`}
        >
          <motion.h1
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-extrabold text-center text-purple-700 dark:text-purple-400"
          >
            🎉 Book Your Event
          </motion.h1>

          {formData.eventType && <p className="text-center text-3xl">{eventIcons[formData.eventType]}</p>}

          {submitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center text-green-600 dark:text-green-400 text-lg font-semibold space-y-4"
            >
              {successAnimation && (
                <Lottie
                  animationData={successAnimation}
                  loop={false}
                  autoplay
                  style={{ height: 120, width: 120, margin: "0 auto" }}
                />
              )}
              <p>Thank you! We'll contact you shortly.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {fields.map((field, i) => (
                <motion.div key={field.name} custom={i} initial="hidden" animate="visible" variants={formVariants}>
                  <label className="block text-sm font-semibold mb-1">{field.label}</label>
                  <div className="relative group">
                    {field.icon}
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      onChange={handleChange}
                      required={field.name === "name" || field.name === "email"}
                      className={`pl-10 w-full py-3 border rounded-xl bg-gray-50 dark:bg-gray-800 focus:ring-2 outline-none transition-all duration-200 group-hover:ring-2 ${
                        field.isValid
                          ? "border-gray-300 focus:ring-purple-400"
                          : "border-red-500 focus:ring-red-400"
                      }`}
                    />
                  </div>
                </motion.div>
              ))}

              <motion.div custom={4} initial="hidden" animate="visible" variants={formVariants}>
                <label className="block text-sm font-semibold mb-1">Event Type</label>
                <select
                  name="eventType"
                  onChange={handleChange}
                  required
                  className="w-full py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-purple-400 outline-none transition"
                >
                  <option value="">Select Event</option>
                  <option value="wedding">Wedding</option>
                  <option value="birthday">Birthday</option>
                  <option value="corporate">Corporate</option>
                </select>
              </motion.div>

              <motion.div custom={5} initial="hidden" animate="visible" variants={formVariants}>
                <label className="block text-sm font-semibold mb-1">Event Date</label>
                <div className="relative group">
                  <CalendarDays className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="date"
                    name="date"
                    onChange={handleChange}
                    required
                    className={`pl-10 w-full py-3 border rounded-xl bg-gray-50 dark:bg-gray-800 focus:ring-2 outline-none group-hover:ring-2 transition ${
                      isDateValid ? "border-gray-300 focus:ring-purple-400" : "border-red-500 focus:ring-red-400"
                    }`}
                  />
                </div>
              </motion.div>

              {/* Live Preview */}
              {(formData.name ||
                formData.email ||
                formData.phone ||
                formData.budget ||
                formData.eventType ||
                formData.date) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 border rounded-xl bg-purple-50 text-sm text-gray-700 dark:bg-gray-800 dark:text-white"
                >
                  <p><strong>Name:</strong> {formData.name}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Phone:</strong> {formData.phone}</p>
                  <p><strong>Budget:</strong> {formData.budget}</p>
                  <p><strong>Event:</strong> {formData.eventType}</p>
                  <p><strong>Date:</strong> {formData.date}</p>
                </motion.div>
              )}

              <motion.div custom={6} initial="hidden" animate="visible" variants={formVariants}>
                <button
                  type="submit"
                  disabled={!isNameValid || !isEmailValid || !isDateValid || !formData.eventType}
                  className="w-full py-3 text-white font-bold rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg disabled:opacity-50"
                >
                  Submit Booking
                </button>
              </motion.div>
            </form>
          )}
        </motion.div>
      </div>
    </>
  );
}
