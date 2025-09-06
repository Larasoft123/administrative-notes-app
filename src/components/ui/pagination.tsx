"use client"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function Pagination({ totalPages = 1, currentPage = 1 }: { totalPages: number, currentPage: number }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();


    const handleChangePage = (page: number) => () => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString())
        router.replace(`${pathname}?${params.toString()}`);
    }

    return (
        <footer className="p-4 flex items-center w-full">
            <div className="w-full flex justify-between items-center">
                <div className="flex items-center">
                    <Button disabled={currentPage <= 1} onClick={handleChangePage(currentPage - 1)} className='cursor-pointer' variant={"outline"}>
                        <ChevronLeft />
                    </Button>
                </div>

                <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        {currentPage} de {totalPages}
                    </span>
                </div>

                <div className="flex items-center">
                    <Button disabled={currentPage == totalPages} onClick={handleChangePage(currentPage + 1)} className='cursor-pointer' variant={"outline"}>
                        <ChevronRight />
                    </Button>
                </div>
            </div>


        </footer>
    )
}
