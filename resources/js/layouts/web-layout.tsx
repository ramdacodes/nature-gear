import { Navbar } from '@/components/web-navbar';

export default function WebLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-background min-h-screen">
            <Navbar />

            {children}
        </div>
    );
}
