'use client';

import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { ChevronsDown, Menu } from 'lucide-react';
import React from 'react';
import AppLogoIcon from './app-logo-icon';
import AppearanceToggleDropdown from './appearance-dropdown';
import { Button } from './ui/button';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from './ui/navigation-web-menu';
import { Separator } from './ui/separator';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';

interface RouteProps {
    href: string;
    label: string;
}

const routeList: RouteProps[] = [
    {
        href: route('home'),
        label: 'Beranda',
    },
    {
        href: route('rent'),
        label: 'Sewa',
    },
    {
        href: route('about'),
        label: 'Tentang',
    },
    {
        href: route('contact'),
        label: 'Kontak',
    },
];

export const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <header className="bg-opacity-15 border-secondary bg-card sticky top-5 z-40 mx-auto flex w-[90%] items-center justify-between rounded-2xl border p-2 md:w-[70%] lg:w-[75%] lg:max-w-screen-xl">
            <Link href="/" className="flex items-center text-base font-bold">
                <div className="mr-2">
                    <AppLogoIcon className="size-10" />
                </div>
                Nature Gear
            </Link>
            <div className="flex items-center lg:hidden">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Menu onClick={() => setIsOpen(!isOpen)} className="cursor-pointer lg:hidden" />
                    </SheetTrigger>

                    <SheetContent side="left" className="bg-card border-secondary flex flex-col justify-between rounded-tr-2xl rounded-br-2xl">
                        <div>
                            <SheetHeader className="mb-4 ml-4">
                                <SheetTitle className="flex items-center">
                                    <Link href="/" className="flex items-center">
                                        <ChevronsDown className="border-secondary from-primary via-primary/70 to-primary mr-2 h-9 w-9 rounded-lg border bg-gradient-to-tr text-white" />
                                        Nature Gear
                                    </Link>
                                </SheetTitle>
                            </SheetHeader>

                            <div className="flex flex-col gap-2">
                                {routeList.map(({ href, label }) => (
                                    <Button key={href} onClick={() => setIsOpen(false)} asChild variant="ghost" className="justify-start text-base">
                                        <Link href={href}>{label}</Link>
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <SheetFooter className="flex-col items-start justify-start sm:flex-col">
                            <Separator className="mb-2" />

                            <AppearanceToggleDropdown className="mt-2" />
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>

            <NavigationMenu className="mx-auto hidden lg:block">
                <NavigationMenuList>
                    <NavigationMenuItem>
                        {routeList.map(({ href, label }) => (
                            <NavigationMenuLink key={href} asChild>
                                <Link href={href} className={cn('px-2 text-sm', label == 'Beranda' ? 'font-bold decoration-2' : '')}>
                                    {label}
                                </Link>
                            </NavigationMenuLink>
                        ))}
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>

            <div className="hidden lg:flex">
                <Button asChild variant="ghost">
                    <Link href={route('login')} className="text-sm">
                        Masuk
                    </Link>
                </Button>

                <AppearanceToggleDropdown />
            </div>
        </header>
    );
};
