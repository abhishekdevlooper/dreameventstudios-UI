// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Admin",
//       credentials: {
//         username: { label: "Username", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         // hardcoded admin for testing
//         if (
//           credentials?.username === "admin1" &&
//           credentials?.password === "admin123"
//         ) {
//           return { id: 1, name: "Admin" };
//         }
//         return null;
//       },
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET || "supersecretkey123",
//   session: { strategy: "jwt" },
//   pages: { signIn: "/login" },
// });
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        try {
          const res = await fetch("http://localhost:8000/api/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          });

          if (!res.ok) return null;
          const user = await res.json();

          if (user?.id) {
            return { id: user.id, name: user.username };
          }
          return null;
        } catch (err) {
          console.error("Login error:", err);
          return null;
        }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
    maxAge: 30 * 60, // 30 minutes
  },

  jwt: {
    maxAge: 30 * 60,
  },

  callbacks: {
    async session({ session, token }) {
      // Ensure session always returns valid object
      return {
        ...session,
        user: token ? { ...session.user, id: token.sub } : { ...session.user, id: null },
      };
    },
    async jwt({ token, user }) {
      // Attach user id to token
      if (user?.id) token.sub = String(user.id);
      return token;
    },
  },

  pages: {
    signIn: "/admin/login",
  },
};

export default NextAuth(authOptions);
