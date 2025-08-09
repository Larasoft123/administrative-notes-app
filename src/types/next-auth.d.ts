

import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

// Declara la interfaz para la información que quieres añadir
interface UserData {
  // Añade aquí los campos que quieres que tenga el usuario.
  // Por ejemplo, un rol y un ID
  role: 'Admin' | 'Docente';
  id: number; 
}

// Extiende la interfaz DefaultSession
declare module 'next-auth' {
  interface Session {
    user: {
      name: string;
      email: string;
      image: string;
    } & UserData;
  }
}

declare module 'next-auth' {
  interface User extends DefaultUser, UserData {
      id: number
  }
}

// Extiende la interfaz DefaultJWT para el token
declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT,UserData {
         id: number

  }
}