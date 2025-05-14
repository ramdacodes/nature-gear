import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
    },
    {
        title: 'Kategori',
        href: route('categories.index'),
    },
];

export default function Category() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Varian" />

            <div className="h-full p-4">
                <h2 className="text-2xl font-semibold">Kategori</h2>
                <p className="text-muted-foreground mt-2">Berikut adalah daftar kategori yang tersedia</p>
            </div>
        </AppLayout>
    );
}
