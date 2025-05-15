import WebLayout from '@/layouts/web-layout';
import { Head } from '@inertiajs/react';

export default function Rent() {
    return (
        <WebLayout>
            <Head title="Sewa" />

            <section className="container mx-auto w-full max-w-4xl px-4 py-12">
                <h1 className="mb-6 text-3xl font-bold text-green-800 dark:text-green-400">Layanan Sewa Peralatan Alam</h1>

                <p className="mb-6 text-gray-700 dark:text-gray-300">
                    Nature Gear menyediakan layanan sewa berbagai perlengkapan kegiatan alam untuk mendukung petualangan Anda tanpa harus membeli
                    semuanya. Cocok bagi pendaki pemula, traveler, hingga komunitas pecinta alam.
                </p>

                <div className="space-y-6 text-gray-800 transition-colors dark:text-gray-200">
                    <div>
                        <h2 className="text-lg font-semibold dark:text-white">Jenis Peralatan yang Tersedia</h2>
                        <ul className="ml-4 list-inside list-disc">
                            <li>Tenda (1-4 orang)</li>
                            <li>Matras dan sleeping bag</li>
                            <li>Kompor portable & peralatan masak</li>
                            <li>Tas carrier dan daypack</li>
                            <li>Lampu tenda, headlamp</li>
                            <li>Jas hujan dan trekking pole</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold dark:text-white">Cara Menyewa</h2>
                        <ol className="ml-4 list-inside list-decimal">
                            <li>Pilih produk yang ingin disewa.</li>
                            <li>Tentukan tanggal mulai dan akhir penyewaan.</li>
                            <li>Lengkapi data diri dan ajukan permintaan sewa.</li>
                            <li>Tunggu konfirmasi dan instruksi pembayaran dari kami.</li>
                        </ol>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold dark:text-white">Ketentuan Sewa</h2>
                        <ul className="ml-4 list-inside list-disc">
                            <li>Minimal sewa: 1 hari</li>
                            <li>Barang harus dikembalikan dalam kondisi baik</li>
                            <li>Denda akan dikenakan jika terjadi kerusakan atau keterlambatan</li>
                            <li>Pembayaran penuh sebelum pengambilan barang</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold dark:text-white">Kontak & Bantuan</h2>
                        <p>
                            Jika Anda memiliki pertanyaan atau butuh bantuan, silakan hubungi kami melalui{' '}
                            <a href="https://wa.me/6281234567890" className="text-green-700 hover:underline dark:text-green-400">
                                WhatsApp
                            </a>{' '}
                            atau email ke{' '}
                            <a href="mailto:sewa@naturegear.id" className="text-green-700 hover:underline dark:text-green-400">
                                sewa@naturegear.id
                            </a>
                            .
                        </p>
                    </div>
                </div>
            </section>
        </WebLayout>
    );
}
