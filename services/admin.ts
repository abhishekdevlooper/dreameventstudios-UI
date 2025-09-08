const API_URL = "http://localhost:8000";

export async function loginAdmin(username: string, password: string) {
  const res = await fetch(`${API_URL}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ username, password }),
  });
  if (!res.ok) throw new Error("Invalid credentials");
  return res.json();
}
