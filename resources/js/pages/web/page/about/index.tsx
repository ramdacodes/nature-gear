import WebLayout from '@/layouts/web-layout';
import { Head } from '@inertiajs/react';

export default function About() {
    return (
        <WebLayout>
            <Head title="Tentang" />

            <section className="container mx-auto w-full max-w-4xl px-4 py-12">
                <h1 className="mb-6 text-3xl font-bold text-green-800 dark:text-green-400">Tentang Kami</h1>

                <p className="mb-6 text-gray-700 dark:text-gray-300">
                    Nature Gear adalah brand yang berdedikasi untuk menyediakan perlengkapan alam dan kegiatan luar ruangan berkualitas tinggi. Kami
                    percaya bahwa setiap petualangan di alam harus didukung dengan perlengkapan terbaik yang tahan lama, fungsional, dan ramah
                    lingkungan.
                </p>

                <p className="mb-6 text-gray-700 dark:text-gray-300">
                    Didirikan oleh para pecinta alam, kami memahami kebutuhan para pendaki, camper, dan penjelajah. Mulai dari peralatan hiking,
                    tenda, hingga aksesoris survival, Nature Gear hadir untuk menemani setiap langkahmu dalam menjelajah keindahan alam Indonesia.
                </p>

                <p className="mb-6 text-gray-700 dark:text-gray-300">
                    Kami juga berkomitmen terhadap keberlanjutan lingkungan. Dalam proses produksi dan distribusi, kami terus berupaya meminimalkan
                    dampak terhadap alam dengan menggunakan bahan daur ulang dan metode pengemasan ramah lingkungan.
                </p>

                <p className="text-gray-700 dark:text-gray-300">
                    Terima kasih telah mempercayakan kebutuhan alam bebasmu kepada Nature Gear. Mari bersama-sama menjaga alam sambil terus
                    menjelajahinya.
                </p>
            </section>
        </WebLayout>
    );
}
