import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import WebLayout from '@/layouts/web-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

export default function Home() {
    return (
        <WebLayout>
            <Head title="Beranda" />

            <section className="container w-full">
                <div className="mx-auto grid place-items-center gap-8 py-20 md:py-32 lg:max-w-screen-xl">
                    <div className="space-y-8 text-center">
                        <Badge variant="outline" className="py-2 text-sm">
                            <span className="text-primary mr-2">
                                <Badge>Baru</Badge>
                            </span>
                            <span>Layanan sewa alat outdoor kini hadir!</span>
                        </Badge>

                        <div className="mx-auto max-w-screen-md text-center text-4xl font-bold md:text-6xl">
                            <h1>
                                Petualanganmu dimulai bersama
                                <span className="to-primary bg-gradient-to-r from-[#43793c] bg-clip-text px-2 text-transparent">Nature Gear</span>
                            </h1>
                        </div>

                        <p className="text-muted-foreground mx-auto max-w-screen-sm text-xl">
                            Nature Gear hadir untuk mendukung aktivitas luar ruangmu. Sewa berbagai perlengkapan outdoor tanpa perlu membeli. Praktis,
                            terjangkau, dan terpercaya!
                        </p>

                        <div className="space-y-4 md:space-y-0 md:space-x-4">
                            <Button asChild className="group/arrow w-5/6 font-bold md:w-1/4">
                                <Link href={route('rent')}>
                                    Sewa Sekarang
                                    <ArrowRight className="ml-2 size-5 transition-transform group-hover/arrow:translate-x-1" />
                                </Link>
                            </Button>

                            <Button asChild variant="secondary" className="w-5/6 font-bold md:w-1/4">
                                <Link href={route('contact')}>Hubungi Kami</Link>
                            </Button>
                        </div>
                    </div>

                    <div className="group relative mt-14">
                        <div className="bg-primary/50 absolute top-2 left-1/2 mx-auto h-24 w-[90%] -translate-x-1/2 transform rounded-full blur-3xl lg:-top-8 lg:h-80"></div>

                        <div className="from-background/0 via-background/50 to-background absolute bottom-0 left-0 h-20 w-full rounded-lg bg-gradient-to-b md:h-28"></div>
                    </div>
                </div>
            </section>
        </WebLayout>
    );
}
