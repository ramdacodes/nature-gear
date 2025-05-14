import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { NavGroup } from '@/types';
import { Link } from '@inertiajs/react';
import {
    AlertTriangle,
    Boxes,
    CalendarClock,
    ClipboardList,
    CreditCard,
    FileText,
    Home,
    LayoutGrid,
    Package,
    Settings,
    Tags,
    Undo2,
    UserCheck,
    UserCog,
    Users,
    Wrench,
} from 'lucide-react';
import AppLogo from './app-logo';

const navGroupItems: NavGroup[] = [
    {
        title: 'Menu',
        items: [
            {
                title: 'Beranda',
                href: route('dashboard'),
                icon: Home,
            },
        ],
    },
    {
        title: 'Katalog Produk',
        items: [
            {
                title: 'Produk',
                href: '/products',
                icon: Package,
            },
            {
                title: 'Varian',
                href: '/variants',
                icon: LayoutGrid,
            },
            {
                title: 'Kategori',
                href: '/categories',
                icon: Tags,
            },
        ],
    },
    {
        title: 'Transaksi',
        items: [
            {
                title: 'Penyewaan',
                href: '/rentals',
                icon: CalendarClock,
            },
            {
                title: 'Pengembalian',
                href: '/returns',
                icon: Undo2,
            },
            {
                title: 'Pembayaran',
                href: '/payments',
                icon: CreditCard,
            },
        ],
    },
    {
        title: 'Inventaris',
        items: [
            {
                title: 'Stok Alat',
                href: '/inventory',
                icon: Boxes,
            },
            {
                title: 'Perawatan',
                href: '/maintenance',
                icon: Wrench,
            },
            {
                title: 'Kerusakan',
                href: '/damages',
                icon: AlertTriangle,
            },
        ],
    },
    {
        title: 'Laporan',
        items: [
            {
                title: 'Riwayat Transaksi',
                href: '/reports/transactions',
                icon: FileText,
            },
            {
                title: 'Laporan Stok',
                href: '/reports/stock',
                icon: ClipboardList,
            },
        ],
    },
    {
        title: 'Pengguna',
        items: [
            {
                title: 'Admin',
                href: '/admins',
                icon: UserCheck,
            },
            {
                title: 'Pelanggan',
                href: '/customers',
                icon: Users,
            },
            {
                title: 'Staf',
                href: '/employees',
                icon: UserCog,
            },
        ],
    },
    {
        title: 'Pengaturan',
        items: [
            {
                title: 'Konfigurasi Sistem',
                href: '/settings',
                icon: Settings,
            },
        ],
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={route('dashboard')} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="scrollbar-hide">
                {navGroupItems.map((group) => (
                    <NavMain key={group.title} title={group.title} items={group.items} />
                ))}
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
