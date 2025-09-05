// Example in Next.js
export default function LoginPage() {
    const handleLogin = () => {
      window.location.href = "/api/client/login"; // FastAPI OAuth2 login
    };
  
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Login with Google
        </button>
      </div>
    );
  }
  