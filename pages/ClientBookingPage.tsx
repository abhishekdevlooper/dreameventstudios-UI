"use client";

import { useState } from "react";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;

function ClientBookingPage() {
  const [formData, setFormData] = useState({
    name: "", email: "", budget: "", eventType: "", date: ""
  });
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [jwt, setJwt] = useState("");
  const { executeRecaptcha } = useGoogleReCaptcha();

  // -------------------
  // OTP Handlers
  // -------------------
  const sendOtp = async () => {
    if (!email) return alert("Enter your email");
    if (!executeRecaptcha) return alert("Captcha not ready");

    const captchaToken = await executeRecaptcha("send_otp");

    const res = await fetch("http://localhost:8000/api/client-booking/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json", "captcha-token": captchaToken },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    alert(data.detail);
  };

  const verifyOtp = async () => {
    if (!otp) return alert("Enter OTP");

    const res = await fetch("http://localhost:8000/api/client-booking/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp: parseInt(otp) })
    });

    if (!res.ok) {
      const err = await res.json();
      return alert(err.detail);
    }
    const data = await res.json();
    setJwt(data.token);
    alert("Logged in!");
  };

  // -------------------
  // Booking Submit
  // -------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jwt) return alert("Login first");
    if (!executeRecaptcha) return alert("Captcha not ready");

    const captchaToken = await executeRecaptcha("booking_submit");

    const res = await fetch("http://localhost:8000/api/client-booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
        "captcha-token": captchaToken
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        budget: formData.budget,
        event_type: formData.eventType,
        preferred_date: formData.date,
        status: "New"
      })
    });

    if (!res.ok) {
      const err = await res.json();
      return alert(err.detail);
    }

    alert("Booking submitted!");
    setFormData({ name: "", email: "", budget: "", eventType: "", date: "" });
    setOtp("");
    setJwt("");
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Book Your Event</h1>

      {!jwt && (
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email for OTP"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="border p-2 mb-2 w-full"
          />
          <button
            onClick={sendOtp}
            className="bg-blue-600 text-white py-2 px-4 rounded mb-2 w-full"
          >
            Send OTP
          </button>

          <input
            placeholder="Enter OTP"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            className="border p-2 mb-2 w-full"
          />
          <button
            onClick={verifyOtp}
            className="bg-green-600 text-white py-2 px-4 rounded w-full"
          >
            Verify OTP
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          placeholder="Name"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          required
          className="border p-2 w-full"
        />
        <input
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
          required
          className="border p-2 w-full"
        />
        <input
          placeholder="Budget"
          value={formData.budget}
          onChange={e => setFormData({ ...formData, budget: e.target.value })}
          className="border p-2 w-full"
        />
        <select
          required
          value={formData.eventType}
          onChange={e => setFormData({ ...formData, eventType: e.target.value })}
          className="border p-2 w-full"
        >
          <option value="">Select Event</option>
          <option value="wedding">Wedding</option>
          <option value="birthday">Birthday</option>
          <option value="corporate">Corporate</option>
        </select>
        <input
          type="date"
          required
          value={formData.date}
          onChange={e => setFormData({ ...formData, date: e.target.value })}
          className="border p-2 w-full"
        />

        <button
          type="submit"
          disabled={!jwt}
          className="bg-purple-600 text-white py-2 px-4 rounded w-full"
        >
          Submit Booking
        </button>
      </form>
    </div>
  );
}

// Wrap with Provider
export default function ClientBookingPageWrapper() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
      <ClientBookingPage />
    </GoogleReCaptchaProvider>
  );
}
