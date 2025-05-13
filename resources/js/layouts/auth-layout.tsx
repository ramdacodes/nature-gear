import AppLogoIcon from '@/components/app-logo-icon';
import AppearanceToggleDropdown from '@/components/appearance-dropdown';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export default function AuthLayout({ children, title, description, ...props }: { children: React.ReactNode; title: string; description: string }) {
    const { name, quote } = usePage<SharedData>().props;

    return (
        <div className="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0" {...props}>
            <AppearanceToggleDropdown className="absolute top-4 right-4" />
            <div
                className="relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r"
                style={{ backgroundImage: "url('/img/bg-nature-gear.png" }}
            >
                <div className="absolute inset-0 bg-black opacity-50" />
                {quote && (
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">&ldquo;{quote.message}&rdquo;</p>
                            <footer className="text-sm text-neutral-300">{quote.author}</footer>
                        </blockquote>
                    </div>
                )}
            </div>
            <div className="w-full lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <Link href={route('home')} className="relative z-20 flex items-center justify-center lg:hidden">
                        <AppLogoIcon className="h-24 fill-current text-black sm:h-12" />
                    </Link>
                    <div className="flex flex-col items-start gap-2 text-left sm:items-center sm:text-center">
                        <h1 className="text-xl font-medium">{title}</h1>
                        <p className="text-muted-foreground text-sm text-balance">{description}</p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
