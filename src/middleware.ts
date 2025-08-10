// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      if (req.nextUrl.pathname.startsWith("/api")) {
        return true;
      }


      if (!token) {   
        return false;  
      }

      return true;

      
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

