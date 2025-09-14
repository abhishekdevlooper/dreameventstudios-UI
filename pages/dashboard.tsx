"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Calendar from "react-calendar";
import { CalendarDays, Bell, LogOut } from "lucide-react";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import "react-calendar/dist/Calendar.css";

type User = {
  email: string;
  name?: string;
  picture?: string;
  loginType: "google" | "otp" | "unknown";
  token?: string;
};

type Booking = {
  id: number;
  event_type: string;
  preferred_date: string;
  status: "New" | "Confirmed" | "Cancelled";
};

const Dashboard = () => {
  const router = useRouter();
  const checkingAuth = useAuthRedirect({ requireAuth: true, redirectPath: "/login" });

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser: User = JSON.parse(storedUser);
        // Ensure loginType exists
        if (!parsedUser.loginType) parsedUser.loginType = "unknown";
        setUser(parsedUser);
      }
    }
  }, []);

  if (checkingAuth || !user) return <p className="text-center mt-20">Loading...</p>;

  const bookings: Booking[] = [
    { id: 1, event_type: "Wedding", preferred_date: "2025-09-20", status: "Confirmed" },
    { id: 2, event_type: "Birthday", preferred_date: "2025-09-25", status: "New" },
    { id: 3, event_type: "Concert", preferred_date: "2025-09-30", status: "Confirmed" },
  ];

  const notifications: string[] = [
    "Your Wedding booking is confirmed!",
    "Birthday Bash booking is under review.",
  ];

  const handleLogout = async () => {
    localStorage.removeItem("user");

    if (user.loginType === "otp" && user.token) {
      try {
        await fetch("http://localhost:8000/api/otp/logout", {
          method: "POST",
          headers: { Authorization: `Bearer ${user.token}` },
        });
      } catch (err) {
        console.warn("OTP logout failed", err);
      }
    }

    router.replace("/login");
  };

  const eventDates = bookings
    .filter((b) => b.status === "Confirmed")
    .map((b) => new Date(b.preferred_date));

  const tileClassName = ({ date }: { date: Date }) =>
    eventDates.find((d) => d.toDateString() === date.toDateString())
      ? "bg-violet-500 text-white rounded-full"
      : "";

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="flex justify-between items-center p-6 bg-violet-600 text-white">
        <h1 className="text-2xl font-bold">My Events Dashboard</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded bg-violet-700 hover:bg-violet-800 transition"
        >
          <LogOut size={18} /> Logout
        </button>
      </header>

      <section className="text-center mt-8">
        {user.picture && (
          <img src={user.picture} alt="Profile" className="w-20 h-20 rounded-full mx-auto mb-3" />
        )}
        <h2 className="text-2xl font-semibold">Hello, {user.name || user.email}</h2>
        <p className="text-gray-600">Manage your events easily</p>
        <p className="text-sm text-gray-400 mt-1">
          Logged in via {user.loginType.toUpperCase()}
        </p>
      </section>

      <main className="flex-grow px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-6 shadow">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-violet-600">
            <CalendarDays size={22} /> My Event Calendar
          </h3>
          <Calendar className="rounded-lg w-full" tileClassName={tileClassName} />
        </div>

        <div className="bg-white rounded-2xl p-6 shadow">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-violet-600">
            <Bell size={22} /> Notifications
          </h3>
          {notifications.length === 0 ? (
            <p className="text-gray-600">No new updates.</p>
          ) : (
            <ul className="space-y-2">
              {notifications.map((note, idx) => (
                <li
                  key={idx}
                  className="p-3 rounded-lg bg-violet-100 text-violet-900 text-sm"
                >
                  {note}
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
