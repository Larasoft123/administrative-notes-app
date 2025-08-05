import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col gap-8 items-center justify-center">
            <h1 className="text-6xl font-bold text-center">
                Not Found
            </h1>
            <Link href={"/"} >
                <Button variant={"link"} className="cursor-pointer" >Go Home</Button>
            </Link>
        </div>
    )
}