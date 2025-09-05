"use client";

import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { getSession } from "next-auth/react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "preferences" | "security">("profile");

  // Form states
  const [name, setName] = useState("Admin Name");
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const handleSaveProfile = () => {
    console.log("Profile saved:", { name, email });
  };

  const handleSavePreferences = () => {
    console.log("Preferences saved:", { theme, sidebarCollapsed, notifications });
  };

  const handleChangePassword = () => {
    console.log("Password changed:", { password, newPassword });
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "profile" ? "bg-purple-600 text-white" : "bg-gray-200"
          }`}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveTab("preferences")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "preferences" ? "bg-purple-600 text-white" : "bg-gray-200"
          }`}
        >
          Preferences
        </button>
        <button
          onClick={() => setActiveTab("security")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "security" ? "bg-purple-600 text-white" : "bg-gray-200"
          }`}
        >
          Security
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white p-6 rounded-2xl shadow space-y-6">
        {activeTab === "profile" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
            <div className="space-y-4 max-w-md">
              <input
                className="w-full p-2 border rounded"
                placeholder="Admin Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="w-full p-2 border rounded"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                onClick={handleSaveProfile}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-500"
              >
                Save Profile
              </button>
            </div>
          </div>
        )}

        {activeTab === "preferences" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Preferences</h2>
            <div className="space-y-4 max-w-md">
              <div className="flex items-center justify-between">
                <span>Theme</span>
                <select
                  className="border p-2 rounded"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value as "light" | "dark")}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <span>Collapse Sidebar by Default</span>
                <input
                  type="checkbox"
                  checked={sidebarCollapsed}
                  onChange={(e) => setSidebarCollapsed(e.target.checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <span>Enable Notifications</span>
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                />
              </div>

              <button
                onClick={handleSavePreferences}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-500"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}

        {activeTab === "security" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Security</h2>
            <div className="space-y-4 max-w-md">
              <input
                type="password"
                className="w-full p-2 border rounded"
                placeholder="Current Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                className="w-full p-2 border rounded"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                onClick={handleChangePassword}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-500"
              >
                Change Password
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

// Protect page with server-side auth
export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/admin/login/",
        permanent: false,
      },
    };
  }

  return { props: {} };
}
