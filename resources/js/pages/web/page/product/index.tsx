import { WEB_PRODUCT_LIST } from '@/constants';
import WebLayout from '@/layouts/web-layout';
import { fetchProduct } from '@/services/web/product';
import { Head } from '@inertiajs/react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Pagination, ProductCard, ProductCardSkeleton } from './components';

export default function Product() {
    const [currentPage, setCurrentPage] = useState(1);

    const { data, isLoading, isError, isRefetching } = useQuery({
        queryKey: [WEB_PRODUCT_LIST, currentPage],
        queryFn: () => fetchProduct(currentPage),
    });

    return (
        <WebLayout>
            <Head title="Produk Tersedia" />

            <section className="container mx-auto px-4 py-12">
                <h1 className="mb-8 text-3xl font-bold text-green-800 dark:text-green-400">Produk Tersedia</h1>

                {isLoading && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <ProductCardSkeleton key={i} />
                        ))}
                    </div>
                )}

                {!isLoading && isError && <p className="text-center text-red-600 dark:text-red-400">Terjadi kesalahan.</p>}

                {!isLoading && !isError && data?.products.length === 0 && (
                    <p className="text-muted-foreground text-center">Belum ada produk tersedia saat ini.</p>
                )}

                {!isLoading && !isError && data && data?.products.length > 0 && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {data?.products.map((product) => <ProductCard key={product.id} {...product} />)}
                    </div>
                )}

                <div className="mt-4">
                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={data?.totalPages || 1} />
                </div>
            </section>
        </WebLayout>
    );
}
