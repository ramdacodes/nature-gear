import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Beranda',
        href: route('dashboard'),
    },
    {
        title: 'Penyewaan',
        href: route('rentals.index'),
    },
];

export default function Rental() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Penyewaan" />

            <div className="h-full p-4">
                <h2 className="text-xl font-semibold">Penyewaan</h2>
                <p className="text-muted-foreground mt-2">Berikut adalah daftar penyewaan yang tersedia</p>
            </div>
        </AppLayout>
    );
}
