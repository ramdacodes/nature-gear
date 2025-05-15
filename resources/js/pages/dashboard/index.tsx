import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { numberFormat } from '@/lib/utils';
import { BreadcrumbItem, SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { CalendarClock, CreditCard, Package, Users } from 'lucide-react';

interface PageData extends SharedData {
    totalRent: number;
    totalProduct: number;
    totalCustomer: number;
    totalIncomeMonth: number;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Beranda',
        href: route('dashboard'),
    },
];

export default function Dashboard() {
    const { totalRent, totalProduct, totalCustomer, totalIncomeMonth } = usePage<PageData>().props;

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
                            <div className="text-2xl font-bold">{totalRent}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-bold">Produk Tersedia</CardTitle>
                            <Package className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalProduct}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-bold">Pelanggan</CardTitle>
                            <Users className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalCustomer}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-bold">Pendapatan Bulan Ini</CardTitle>
                            <CreditCard className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{numberFormat(totalIncomeMonth)}</div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
