import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      // `credentials` se usa para generar un formulario en la página de inicio de sesión.
      // Puedes especificar los campos que esperas que se envíen.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {

        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };

        console.log({credentials,req} );
        

        if (user) {
     
          return user; // Autenticación exitosa
        } else {
          // Si devuelves `null`, se mostrará un error al usuario.
          console.log("Credenciales inválidas:", credentials);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/error", // Error de la autenticación
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);


export { handler as GET, handler as POST };
