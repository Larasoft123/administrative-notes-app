import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export const getSessionServer = async () => {
  const session = await getServerSession(authOptions);
  return session;
};