import WebLayout from '@/layouts/web-layout';
import { Head } from '@inertiajs/react';

export default function Contact() {
    return (
        <WebLayout>
            <Head title="Kontak" />

            <section className="container mx-auto w-full max-w-4xl px-4 py-12">
                <h1 className="mb-6 text-3xl font-bold text-green-800 dark:text-green-400">Hubungi Kami</h1>

                <p className="mb-6 text-gray-700 dark:text-gray-300">
                    Nature Gear selalu siap membantu Anda. Jika Anda memiliki pertanyaan seputar produk, pemesanan, kerja sama, atau ingin memberikan
                    masukan, jangan ragu untuk menghubungi kami melalui informasi berikut:
                </p>

                <div className="space-y-4 text-gray-800 dark:text-gray-200">
                    <div>
                        <h2 className="text-lg font-semibold">Alamat Toko</h2>
                        <p>Jl. Alam Lestari No. 10, Bandung, Jawa Barat 40123</p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">Email</h2>
                        <p>
                            <a href="mailto:info@naturegear.id" className="text-green-700 hover:underline dark:text-green-300">
                                info@naturegear.id
                            </a>
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">Telepon / WhatsApp</h2>
                        <p>
                            <a
                                href="https://wa.me/6281234567890"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-700 hover:underline dark:text-green-300"
                            >
                                +62 812-3456-7890
                            </a>
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">Jam Operasional</h2>
                        <p>Senin - Jumat: 09.00 - 17.00 WIB</p>
                        <p>Sabtu: 09.00 - 14.00 WIB</p>
                        <p>Minggu & Libur Nasional: Tutup</p>
                    </div>
                </div>

                <div className="mt-10">
                    <h2 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">Media Sosial</h2>
                    <ul className="space-y-1">
                        <li>
                            <a
                                href="https://instagram.com/naturegear.id"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-700 hover:underline dark:text-green-300"
                            >
                                Instagram: @naturegear.id
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://facebook.com/naturegear.id"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-700 hover:underline dark:text-green-300"
                            >
                                Facebook: Nature Gear Indonesia
                            </a>
                        </li>
                    </ul>
                </div>
            </section>
        </WebLayout>
    );
}
