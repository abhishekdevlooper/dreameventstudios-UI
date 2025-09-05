"use client";
import React, { useEffect, useState } from "react";
import { getClientToken, removeClientToken } from "../utils/auth-client";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/navigation";

interface DecodedToken {
  user_id: string;
  name?: string;
  picture?: string;
  exp: number;
}

const UserProfile = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; picture: string } | null>(null);

  useEffect(() => {
    const token = getClientToken();
    if (!token) {
      router.replace("/login");
      return;
    }

    try {
      const decoded: DecodedToken = jwt_decode(token);
      if (decoded.exp * 1000 < Date.now()) {
        removeClientToken();
        router.replace("/login");
      } else {
        setUser({
          name: decoded.name || "Client",
          picture: decoded.picture || "/default-avatar.png",
        });
      }
    } catch (err) {
      console.error("Invalid token", err);
      removeClientToken();
      router.replace("/login");
    }
  }, [router]);

  const handleLogout = () => {
    removeClientToken();
    router.replace("/login");
  };

  if (!user) return null;

  return (
    <div className="flex items-center space-x-3">
      <img
        src={user.picture}
        alt="Profile"
        className="w-10 h-10 rounded-full object-cover"
      />
      <span>{user.name}</span>
      <button
        onClick={handleLogout}
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
