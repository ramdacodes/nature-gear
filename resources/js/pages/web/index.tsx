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
                                <Badge>New</Badge>
                            </span>
                            <span> Project is out now! </span>
                        </Badge>

                        <div className="mx-auto max-w-screen-md text-center text-4xl font-bold md:text-6xl">
                            <h1>
                                Experience the
                                <span className="to-primary bg-gradient-to-r from-[#D247BF] bg-clip-text px-2 text-transparent">Nature Gear</span>
                                landing page
                            </h1>
                        </div>

                        <p className="text-muted-foreground mx-auto max-w-screen-sm text-xl">
                            {`We're more than just a tool, we're a community of passionate
            creators. Get access to exclusive resources, tutorials, and support.`}
                        </p>

                        <div className="space-y-4 md:space-y-0 md:space-x-4">
                            <Button className="group/arrow w-5/6 font-bold md:w-1/4">
                                Get Started
                                <ArrowRight className="ml-2 size-5 transition-transform group-hover/arrow:translate-x-1" />
                            </Button>

                            <Button asChild variant="secondary" className="w-5/6 font-bold md:w-1/4">
                                <Link href="https://github.com/ramdacodes" target="_blank">
                                    Github respository
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div className="group relative mt-14">
                        <div className="bg-primary/50 absolute top-2 left-1/2 mx-auto h-24 w-[90%] -translate-x-1/2 transform rounded-full blur-3xl lg:-top-8 lg:h-80"></div>
                        {/* <img
            width={1200}
            height={1200}
            className="w-full md:w-[1200px] mx-auto rounded-lg relative rouded-lg leading-none flex items-center border border-t-2 border-secondary  border-t-primary/30"
            src={
              theme === "light"
                ? "/hero-image-light.jpeg"
                : "/hero-image-dark.jpeg"
            }
            alt="dashboard"
          /> */}

                        <div className="from-background/0 via-background/50 to-background absolute bottom-0 left-0 h-20 w-full rounded-lg bg-gradient-to-b md:h-28"></div>
                    </div>
                </div>
            </section>
        </WebLayout>
    );
}
