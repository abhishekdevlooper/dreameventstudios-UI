"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getClientUser, isClientLoggedIn, removeClientToken } from "../utils/auth-client";

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (!isClientLoggedIn()) {
      router.replace("/login");
    } else {
      setUser(getClientUser());
    }
  }, [router]);

  const handleLogout = () => {
    removeClientToken();
    router.replace("/login");
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="mb-6 p-4 border rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Profile</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        {user.picture && <img src={user.picture} alt="Profile" className="w-20 h-20 rounded-full mt-2" />}
      </div>

      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
