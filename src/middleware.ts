// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
        console.log(req.nextUrl.pathname);
      if (req.nextUrl.pathname.startsWith("/api/auth")) {
        return true;
      }
      
      return !!token;
    },
  },

  pages: {
    signIn: "/login",
    error: "/error",
  },

});

export const config = {
  matcher: ["/api/:path*", "/((?!_next/static|_next/image|favicon.ico).*)"],
};

