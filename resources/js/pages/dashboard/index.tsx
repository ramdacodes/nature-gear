import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { CalendarClock, CreditCard, Package, Users } from 'lucide-react';

interface PageData extends SharedData {
    totalProduct: number;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
    },
];

export default function Dashboard() {
    const { totalProduct } = usePage<PageData>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="h-full p-4">
                <h2 className="text-xl font-semibold">Dashboard</h2>
                <p className="text-muted-foreground mt-2">Selamat datang di Nature Gear</p>

                <div className="grid grid-cols-1 gap-4 py-5 sm:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-bold">Total Penyewaan</CardTitle>
                            <CalendarClock className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">128</div>
                            <p className="text-muted-foreground text-xs">+12% dari minggu lalu</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-bold">Produk Tersedia</CardTitle>
                            <Package className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalProduct}</div>
                            <p className="text-muted-foreground text-xs">Tersedia untuk disewa</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-bold">Pelanggan</CardTitle>
                            <Users className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">89</div>
                            <p className="text-muted-foreground text-xs">+3 pelanggan baru hari ini</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-bold">Pendapatan Bulan Ini</CardTitle>
                            <CreditCard className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">Rp 12.500.000</div>
                            <p className="text-muted-foreground text-xs">+5% dari bulan lalu</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
