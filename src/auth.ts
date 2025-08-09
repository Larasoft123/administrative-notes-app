import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { sql } from "@/lib/db";
import { User } from "@/utils/types.d";

async function getUserByEmailAndRole({
  email,
  role,
}: {
  email: string;
  role: "Docente" | "Admin";
}): Promise<User | null> {
  try {
    const user = (await sql.query(
      `SELECT u.id_usuario AS user_id, email, nombre_rol AS rol,fecha_creacion AS created_at, contrasena_hash AS hashed_password FROM usuarios u 
      JOIN usuario_roles ur ON ur.id_usuario = u.id_usuario 
      JOIN roles r ON r.id_rol = ur.id_rol 
      WHERE email = $1 AND r.nombre_rol = $2 AND activo = TRUE`,
      [email, role]
    )) as User[];

    return user[0] ?? null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      // `credentials` se usa para generar un formulario en la página de inicio de sesión.
      // Puedes especificar los campos que esperas que se envíen.
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
        role: { label: "role", type: "text", placeholder: "docente" },
      },
      async authorize(credentials, req) {
        const { email, role, password } = credentials as {
          email: string;
          password: string;
          role: "Docente" | "Admin";
        };

   
        const myUser = await getUserByEmailAndRole({ email, role });
        if (!myUser) return null;

        // comprobar contraseña
        if (password !== myUser.hashed_password) return null;

        const {email: mail,rol,user_id} = myUser


        
        return {
          id: user_id,
          role: rol,
          email: mail,     
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

  callbacks: {
    jwt: async ({ token, user }) => {
      if (!user) return token;

      token.id = user.id as number;
      token.role = user.role
      console.log("jwt ",token);
      

      return token;
    },

    session: async ({ session, token }) => {

      session.user.role = token.role
      session.user.email = token.email ?? ""
      session.user.id = token.id
      
      console.log("session ",session);

  
     
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
