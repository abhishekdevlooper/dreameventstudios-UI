"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { removeClientToken } from "../utils/auth-client";
import {
  CalendarDays,
  Bell,
  Headphones,
  Camera,
  Music,
  Utensils,
  LogOut,
} from "lucide-react";
import axios from "axios";
import Calendar from "react-calendar"; // npm install react-calendar
import "react-calendar/dist/Calendar.css";

type User = {
  id: string;
  email: string;
  name?: string;
  picture?: string;
  email_verified?: boolean;
};

type Booking = {
  id: number;
  event_type: string;
  preferred_date: string;
  status: "New" | "Confirmed" | "Cancelled";
};

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.replace("/login");
    } else {
      setUser(JSON.parse(storedUser));
      fetchBookings();
      fetchNotifications();
    }
  }, [router]);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8000/api/bookings/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    }
  };

  const fetchNotifications = async () => {
    // Mocked notifications — in real app, replace with API or WebSocket
    setNotifications([
      "Your booking for Wedding at Sunset Gardens has been confirmed!",
      "Your Birthday Bash booking is under review.",
    ]);
  };

  const handleLogout = () => {
    removeClientToken();
    localStorage.removeItem("user");
    router.replace("/login");
  };

  if (!user) return null;

  // Extract confirmed event dates for calendar highlights
  const eventDates = bookings
    .filter((b) => b.status === "Confirmed")
    .map((b) => new Date(b.preferred_date));

  const tileClassName = ({ date }: { date: Date }) => {
    if (eventDates.find((d) => d.toDateString() === date.toDateString())) {
      return "bg-green-500 text-white rounded-full";
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-500 via-purple-600 to-fuchsia-600 text-white flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-black/20 backdrop-blur-md">
        <h1 className="text-2xl font-bold">🎊 My Events Dashboard</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 transition"
        >
          <LogOut size={18} /> Logout
        </button>
      </header>

      {/* Welcome */}
      <section className="flex flex-col items-center text-center mt-8">
        {user.picture && (
          <img
            src={user.picture}
            alt="Profile"
            className="w-20 h-20 rounded-full shadow-lg border-4 border-white mb-3"
          />
        )}
        <h2 className="text-2xl font-semibold">
          Hello, {user.name || user.email}
        </h2>
        <p className="opacity-80">Manage your events easily in one place</p>
      </section>

      <main className="flex-grow px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 📅 Event Calendar */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <CalendarDays size={22} /> My Event Calendar
          </h3>
          <Calendar
            className="rounded-lg w-full"
            tileClassName={tileClassName}
          />
        </div>

        {/* 🔔 Notifications */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Bell size={22} /> Notifications
          </h3>
          {notifications.length === 0 ? (
            <p className="opacity-80">No new updates.</p>
          ) : (
            <ul className="space-y-3">
              {notifications.map((note, idx) => (
                <li
                  key={idx}
                  className="p-3 rounded-lg bg-white/20 text-sm shadow"
                >
                  {note}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 🎁 Recommendations */}
        <div className="lg:col-span-2 bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4">Recommended for You</h3>
          <div className="flex gap-4 overflow-x-auto pb-2">
            <div className="min-w-[160px] bg-white/20 rounded-xl p-4 flex flex-col items-center">
              <Camera className="mb-2" size={28} />
              <p>Photography</p>
            </div>
            <div className="min-w-[160px] bg-white/20 rounded-xl p-4 flex flex-col items-center">
              <Music className="mb-2" size={28} />
              <p>Live Music</p>
            </div>
            <div className="min-w-[160px] bg-white/20 rounded-xl p-4 flex flex-col items-center">
              <Utensils className="mb-2" size={28} />
              <p>Catering</p>
            </div>
            <div className="min-w-[160px] bg-white/20 rounded-xl p-4 flex flex-col items-center">
              <Headphones className="mb-2" size={28} />
              <p>DJ Services</p>
            </div>
          </div>
        </div>

        {/* 💬 Support */}
        <div className="lg:col-span-2 flex justify-center">
          <button
            onClick={() =>
              window.open("https://wa.me/1234567890", "_blank") // Replace with WhatsApp number
            }
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500 hover:bg-green-600 font-semibold shadow-lg"
          >
            💬 Contact Support
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-sm opacity-70">
        © {new Date().getFullYear()} Event Management. All rights reserved.
      </footer>
    </div>
  );
};

export default Dashboard;
