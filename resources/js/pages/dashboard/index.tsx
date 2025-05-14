import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Info } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="h-full p-4">
                <Alert variant="default">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Informasi</AlertTitle>
                    <AlertDescription>Halaman ini masih dalam tahap pengembangan</AlertDescription>
                </Alert>

                <div className="mt-4">
                    <h2 className="text-2xl font-semibold">Dashboard</h2>
                    <p className="text-muted-foreground mt-2">Selamat datang di halaman dashboard</p>
                </div>
            </div>
        </AppLayout>
    );
}
