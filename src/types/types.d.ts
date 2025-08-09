export interface User {
    user_id: number;
    email: string;
    rol: "Docente" | "Admin";
    created_at: Date;
    hashed_password?: string;
}





