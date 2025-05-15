import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Info } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Beranda',
        href: route('dashboard'),
    },
    {
        title: 'Pembayaran',
        href: route('payments.index'),
    },
];

export default function Payment() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pembayaran" />

            <div className="h-full p-4">
                <h2 className="text-xl font-semibold">Pembayaran</h2>
                <p className="text-muted-foreground mt-2">Berikut adalah daftar pembayaran yang tersedia</p>

                <div className="py-5">
                    <Alert className="border border-blue-300 bg-blue-50 text-blue-800 dark:border-blue-600 dark:bg-blue-900 dark:text-blue-100">
                        <Info className="h-4 w-4" />
                        <AlertTitle className="font-bold">Halaman dalam pengembangan</AlertTitle>
                        <AlertDescription className="text-blue-800 dark:text-blue-100">
                            Fitur ini belum tersedia sepenuhnya. Mohon tunggu update berikutnya.
                        </AlertDescription>
                    </Alert>
                </div>
            </div>
        </AppLayout>
    );
}
