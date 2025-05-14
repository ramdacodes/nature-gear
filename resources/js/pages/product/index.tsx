import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
    },
    {
        title: 'Produk',
        href: route('products.index'),
    },
];

export default function Product() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Produk" />

            <div className="h-full p-4">
                <h2 className="text-2xl font-semibold">Produk</h2>
                <p className="text-muted-foreground mt-2">Berikut adalah daftar produk yang tersedia</p>
            </div>
        </AppLayout>
    );
}
