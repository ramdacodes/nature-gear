import { createColumnHelper } from '@tanstack/react-table';
import { Loader, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '@/components/ui/data-table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { PRODUCT_LIST } from '@/constants';
import { useProductMutation } from '@/hooks/product';
import { formatDateTimeString, numberFormat } from '@/lib/utils';
import { useProductContext } from '@/pages/product/product.context';
import { ProductResponse } from '@/services/product/types';
import axios from 'axios';
import { toast } from 'sonner';
import UpdateProductForm from './form-update';

export const columnLabel: Record<keyof ProductResponse, string> = {
    id: 'ID',
    name: 'Nama',
    category: 'Kategori',
    variant: 'Varian',
    price_per_day: 'Harga',
    description: 'Deskripsi',
    image_1: 'Gambar 1',
    image_2: 'Gambar 2',
    image_3: 'Gambar 3',
    image_4: 'Gambar 4',
    created_at: 'Dibuat Pada',
    updated_at: 'Diubah Pada',
};

const columnHelper = createColumnHelper<ProductResponse>();

export const columns = [
    columnHelper.accessor('id', {
        header: ({ table }) => (
            <div className="flex w-[24px] items-center justify-center pr-0 pl-3">
                <Checkbox
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex w-[20px] items-center justify-center">
                <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />
            </div>
        ),
        enableHiding: false,
        enableColumnFilter: false,
        enableSorting: false,
    }),
    columnHelper.accessor('name', {
        header: ({ column }) => (
            <DataTableColumnHeader
                className="min-w-[100px]"
                title={columnLabel?.[column.id as keyof ProductResponse] || '???'}
                column={column}
                filterType="text"
            />
        ),
        enableColumnFilter: false,
    }),
    columnHelper.accessor('category', {
        header: ({ column }) => (
            <DataTableColumnHeader
                className="min-w-[100px]"
                title={columnLabel?.[column.id as keyof ProductResponse] || '???'}
                column={column}
                filterType="text"
            />
        ),
        cell: ({ row }) => {
            const data = row.original;

            return data.category ? data.category.name : '-';
        },
        enableColumnFilter: false,
    }),
    columnHelper.accessor('variant', {
        header: ({ column }) => (
            <DataTableColumnHeader
                className="min-w-[100px]"
                title={columnLabel?.[column.id as keyof ProductResponse] || '???'}
                column={column}
                filterType="text"
            />
        ),
        cell: ({ row }) => {
            const data = row.original;

            return data.variant ? data.variant.name : '-';
        },
        enableColumnFilter: false,
    }),
    columnHelper.accessor('price_per_day', {
        header: ({ column }) => (
            <DataTableColumnHeader
                className="min-w-[100px]"
                title={columnLabel?.[column.id as keyof ProductResponse] || '???'}
                column={column}
                filterType="text"
            />
        ),
        cell: ({ row }) => {
            const data = row.original;

            return numberFormat(data.price_per_day);
        },
        enableColumnFilter: false,
    }),
    columnHelper.accessor('description', {
        header: ({ column }) => (
            <DataTableColumnHeader
                className="min-w-[100px]"
                title={columnLabel?.[column.id as keyof ProductResponse] || '???'}
                column={column}
                filterType="text"
            />
        ),
        enableColumnFilter: false,
    }),
    columnHelper.accessor('created_at', {
        header: ({ column }) => (
            <DataTableColumnHeader
                className="min-w-[100px]"
                title={columnLabel?.[column.id as keyof ProductResponse] || '???'}
                column={column}
                filterType="text"
            />
        ),
        cell: ({ row }) => {
            const data = row.original;

            return formatDateTimeString(data.created_at);
        },
        enableColumnFilter: false,
    }),
    columnHelper.accessor('updated_at', {
        header: ({ column }) => (
            <DataTableColumnHeader
                className="min-w-[100px]"
                title={columnLabel?.[column.id as keyof ProductResponse] || '???'}
                column={column}
                filterType="text"
            />
        ),
        cell: ({ row }) => {
            const data = row.original;

            return formatDateTimeString(data.updated_at);
        },
        enableColumnFilter: false,
    }),
    columnHelper.accessor((column) => column, {
        id: 'actions',
        header: () => <div className="min-w-[32px]">Aksi</div>,
        cell: ({ row }) => {
            const data = row.original;

            const [sheetOpen, setSheetOpen] = useState(false);
            const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);

            const { queryClient } = useProductContext();

            const { deleteProduct } = useProductMutation();

            return (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Buka menu</span>
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                            <DropdownMenuItem
                                onSelect={() => {
                                    setTimeout(() => setSheetOpen(true), 0);
                                }}
                            >
                                <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                                onSelect={() => {
                                    setTimeout(() => setIsDialogDeleteOpen(true), 0);
                                }}
                            >
                                <span>Hapus</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                        <SheetContent className="scrollbar-hide max-h-screen overflow-y-scroll">
                            <SheetHeader>
                                <SheetTitle>Edit Data Produk</SheetTitle>
                                <SheetDescription>Lengkapi data dibawah ini untuk memperbarui produk</SheetDescription>
                            </SheetHeader>
                            <div className="mt-4">
                                <UpdateProductForm
                                    id={data.id}
                                    name={data.name}
                                    category_id={data.category ? String(data.category.id) : null}
                                    variant_id={data.variant ? String(data.variant.id) : null}
                                    price_per_day={data.price_per_day}
                                    description={data.description}
                                    closeSheet={() => setSheetOpen(false)}
                                />
                            </div>
                        </SheetContent>
                    </Sheet>

                    <AlertDialog open={isDialogDeleteOpen} onOpenChange={setIsDialogDeleteOpen}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Apakah Anda benar-benar yakin?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Tindakan ini tidak dapat dibatalkan. Apakah Anda yakin ingin menghapus data ini secara permanen dari server?
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                <AlertDialogAction
                                    disabled={deleteProduct.isPending}
                                    onClick={(e) => {
                                        e.preventDefault();

                                        deleteProduct.mutate(data.id, {
                                            onSuccess: ({ message }) => {
                                                toast.success(message);

                                                queryClient.invalidateQueries({
                                                    queryKey: [PRODUCT_LIST],
                                                });

                                                setIsDialogDeleteOpen(false);
                                            },
                                            onError: (error) => {
                                                if (axios.isAxiosError(error) && error.response) {
                                                    toast.error(error.response.data.message);
                                                } else {
                                                    toast.error(error.message);
                                                }
                                            },
                                        });
                                    }}
                                >
                                    {deleteProduct.isPending ? <Loader className="text-muted h-4 w-4 animate-spin" /> : 'Hapus'}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </>
            );
        },
        enableColumnFilter: false,
        enableSorting: false,
        enableHiding: false,
    }),
];
