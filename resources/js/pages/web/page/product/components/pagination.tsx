import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface PaginationProps {
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalPages: number;
}

export default function Pagination({ currentPage, setCurrentPage, totalPages }: PaginationProps) {
    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const getPageNumbers = (): (number | string)[] => {
        let pages: (number | string)[] = [];

        if (totalPages <= 5) {
            pages = Array.from({ length: totalPages }, (_, i) => i + 1);
        } else {
            if (currentPage <= 3) {
                pages = [1, 2, 3, '...', totalPages];
            } else if (currentPage >= totalPages - 2) {
                pages = [1, '...', totalPages - 2, totalPages - 1, totalPages];
            } else {
                pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
            }
        }

        return pages;
    };

    return (
        <div className="mt-10 flex items-center justify-center space-x-2">
            <Button
                aria-label="Go to first page"
                variant="outline"
                className="hidden size-8 p-0 lg:flex"
                onClick={() => goToPage(1)}
                disabled={currentPage === 1}
            >
                <ChevronsLeft className="size-4" aria-hidden="true" />
            </Button>

            <Button
                aria-label="Go to previous page"
                variant="outline"
                size="icon"
                className="size-8"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <ChevronLeft className="size-4" aria-hidden="true" />
            </Button>

            {getPageNumbers().map((page, index) =>
                page === '...' ? (
                    <span key={index} className="flex size-8 items-center justify-center text-gray-500">
                        ...
                    </span>
                ) : (
                    <Button
                        key={page}
                        variant={page === currentPage ? 'default' : 'outline'}
                        className="size-8"
                        onClick={() => goToPage(Number(page))}
                    >
                        {page}
                    </Button>
                ),
            )}

            <Button
                aria-label="Go to next page"
                variant="outline"
                size="icon"
                className="size-8"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <ChevronRight className="size-4" aria-hidden="true" />
            </Button>

            <Button
                aria-label="Go to last page"
                variant="outline"
                size="icon"
                className="hidden size-8 lg:flex"
                onClick={() => goToPage(totalPages)}
                disabled={currentPage === totalPages}
            >
                <ChevronsRight className="size-4" aria-hidden="true" />
            </Button>
        </div>
    );
}
