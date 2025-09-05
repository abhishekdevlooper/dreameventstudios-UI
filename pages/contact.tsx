"use client";

import { useState } from "react";
import SEO from "@/components/SEO";
import { CheckCircle } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    event_type: "",
    budget: "",
    preferred_date: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("http://localhost:8000/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          preferred_date: formData.preferred_date || null,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          event_type: "",
          budget: "",
          preferred_date: "",
        });
      } else {
        setStatus("error");
        setErrorMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting lead:", error);
      setStatus("error");
      setErrorMessage("Server error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 px-4">
      <SEO title="Contact Us | Celebrate With Us" description="Reach out for free consultation" />

      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 sm:p-10 border border-purple-100 dark:border-gray-700">
        {status === "success" ? (
          <div className="flex flex-col items-center text-center space-y-4">
            <CheckCircle className="text-green-500 w-16 h-16" />
            <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-300">Thank You!</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Your request has been submitted. We’ll contact you shortly.
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-4 text-center text-purple-700 dark:text-purple-300">
              Let’s Plan Your Perfect Event!
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Event Type
              </label>
              <select
                name="event_type"
                required
                value={formData.event_type}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select Event Type</option>
                <option value="Wedding">Wedding</option>
                <option value="Corporate">Corporate</option>
                <option value="Birthday">Birthday</option>
                <option value="Engagement">Engagement</option>
                <option value="Other">Other</option>
              </select>

              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Budget (₹)
              </label>
              <input
                type="text"
                name="budget"
                placeholder="Budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Preferred Event Date
              </label>
              <input
                type="date"
                name="preferred_date"
                value={formData.preferred_date}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <button
                type="submit"
                disabled={status === "submitting"}
                className={`w-full bg-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 transition-all ${
                  status === "submitting" ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {status === "submitting" ? "Submitting..." : "Submit"}
              </button>
            </form>

            {status === "error" && (
              <p className="mt-4 text-sm text-red-600 text-center">{errorMessage}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
