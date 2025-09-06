
import { DocentesHeader } from "@/components/docentes/docentes-header"

import { type Session } from "next-auth"
import { DocentesGrid } from "@/components/docentes/docentes-grid"



export async function DocentesContent({ searchParams, session }: { searchParams: any, session: Session }) {












    return (
        <section className="space-y-6">
            <DocentesHeader />
            <DocentesGrid searchParams={searchParams} session={session} />


        </section>
    )
}
