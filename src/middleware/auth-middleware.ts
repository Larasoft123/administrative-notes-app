import { NextRequest } from "next/server";
import { UserData } from "@/types/next-auth";
import { getSessionServer } from "@/utils/session";

export async function checkIsAdmin(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    let id = searchParams.get("userId") as number | null;
    let role = searchParams.get("role") as UserData["role"];
    if (!id || !role || role !== "Admin") {
        const session = await getSessionServer()
        if (!session || session.user?.role !== "Admin") {
            return { ok: false };
        }
        id = session.user.id;
        role = session.user.role;
    }
    return { ok: true, id,role };
}