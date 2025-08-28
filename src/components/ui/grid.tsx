

export default function Grid({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 p-4 lg:grid-cols-2 xl:grid-cols-3">
            {children}
        </div>
    )
}
