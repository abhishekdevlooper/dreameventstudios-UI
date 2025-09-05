// pages/admin/clients.tsx
import { useEffect, useState } from "react";

export default function AdminClients() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("admin_token"); // admin JWT
    fetch("http://localhost:8000/admin/clients", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setClients(data));
  }, []);

  return (
    <div>
      <h1>All Clients</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Provider</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(c => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.oauth_provider}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
