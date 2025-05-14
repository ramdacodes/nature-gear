import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
    },
    {
        title: 'Pengembalian',
        href: route('returns.index'),
    },
];

export default function Return() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pengembalian" />

            <div className="h-full p-4">
                <h2 className="text-xl font-semibold">Pengembalian</h2>
                <p className="text-muted-foreground mt-2">Berikut adalah daftar pengembalian yang tersedia</p>
            </div>
        </AppLayout>
    );
}
