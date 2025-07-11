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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { StatusBadge } from '@/components/ui/status-badge';
import { TRANSACTION_RENTAL_LIST } from '@/constants';
import { useRentalMutation } from '@/hooks/transaction/rental';
import { formatDateTimeString, numberFormat } from '@/lib/utils';
import { useRentalContext } from '@/pages/transaction/rental/rental.context';
import { RentalResponse } from '@/services/transaction/rental/types';
import axios from 'axios';
import { toast } from 'sonner';
import UpdateRentalForm from './form-update';

export const columnLabel: Record<keyof RentalResponse, string> = {
    id: 'ID',
    code: 'Kode',
    customer: 'Pelanggan',
    start_date: 'Mulai',
    end_date: 'Selesai',
    total: 'Total',
    status: 'Status',
    payment_status: 'Status Pembayaran',
    items: 'Items',
    created_at: 'Dibuat Pada',
    updated_at: 'Diubah Pada',
};

const columnHelper = createColumnHelper<RentalResponse>();

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
    columnHelper.accessor('code', {
        header: ({ column }) => (
            <DataTableColumnHeader
                className="min-w-[100px]"
                title={columnLabel?.[column.id as keyof RentalResponse] || '???'}
                column={column}
                filterType="text"
            />
        ),
        cell: ({ row }) => {
            const data = row.original;

            return (
                <div className="flex min-w-[100px] items-center justify-between gap-2">
                    <button
                        onClick={() => row.toggleExpanded()}
                        className="rounded p-1 text-xl focus:outline-none"
                        aria-label={row.getIsExpanded() ? 'Collapse row' : 'Expand row'}
                        type="button"
                    >
                        {row.getIsExpanded() ? '−' : '+'}
                    </button>
                    <span className="font-semibold">{data.code}</span>
                </div>
            );
        },
        enableColumnFilter: false,
    }),
    columnHelper.accessor('customer', {
        header: ({ column }) => (
            <DataTableColumnHeader
                className="min-w-[100px]"
                title={columnLabel?.[column.id as keyof RentalResponse] || '???'}
                column={column}
                filterType="text"
            />
        ),
        cell: ({ row }) => {
            const data = row.original;

            return data.customer ?? '-';
        },
        enableColumnFilter: false,
    }),
    columnHelper.accessor('start_date', {
        header: ({ column }) => (
            <DataTableColumnHeader
                className="min-w-[100px]"
                title={columnLabel?.[column.id as keyof RentalResponse] || '???'}
                column={column}
                filterType="text"
            />
        ),
        enableColumnFilter: false,
    }),
    columnHelper.accessor('end_date', {
        header: ({ column }) => (
            <DataTableColumnHeader
                className="min-w-[100px]"
                title={columnLabel?.[column.id as keyof RentalResponse] || '???'}
                column={column}
                filterType="text"
            />
        ),
        enableColumnFilter: false,
    }),
    columnHelper.accessor('total', {
        header: ({ column }) => (
            <DataTableColumnHeader
                className="min-w-[100px]"
                title={columnLabel?.[column.id as keyof RentalResponse] || '???'}
                column={column}
                filterType="text"
            />
        ),
        cell: ({ row }) => {
            const data = row.original;

            return numberFormat(data.total);
        },
        enableColumnFilter: false,
    }),
    columnHelper.accessor('status', {
        header: ({ column }) => (
            <DataTableColumnHeader
                className="min-w-[100px]"
                title={columnLabel?.[column.id as keyof RentalResponse] || '???'}
                column={column}
                filterType="text"
            />
        ),
        cell: ({ row }) => {
            const data = row.original;

            var variant: 'default' | 'success' | 'danger' | 'warning' | 'info' = 'default';

            if (data.status === 'picked_up') {
                variant = 'info';
            } else if (data.status === 'ready_for_pickup') {
                variant = 'warning';
            } else if (data.status === 'completed') {
                variant = 'success';
            } else if (data.status === 'canceled' || data.status === 'refunded') {
                variant = 'danger';
            }

            return <StatusBadge label={data.status} variant={variant} />;
        },
        enableColumnFilter: false,
    }),
    columnHelper.accessor('payment_status', {
        header: ({ column }) => (
            <DataTableColumnHeader
                className="min-w-[100px]"
                title={columnLabel?.[column.id as keyof RentalResponse] || '???'}
                column={column}
                filterType="text"
            />
        ),
        cell: ({ row }) => {
            const data = row.original;

            var variant: 'default' | 'success' | 'danger' = 'default';

            if (data.payment_status === 'paid') {
                variant = 'success';
            } else if (data.payment_status === 'unpaid') {
                variant = 'danger';
            }

            return <StatusBadge label={data.payment_status} variant={variant} />;
        },
        enableColumnFilter: false,
    }),
    columnHelper.accessor('created_at', {
        header: ({ column }) => (
            <DataTableColumnHeader
                className="min-w-[100px]"
                title={columnLabel?.[column.id as keyof RentalResponse] || '???'}
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
                title={columnLabel?.[column.id as keyof RentalResponse] || '???'}
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

            const [isDialogConfirmationPaymentOpen, setIsDialogConfirmationPaymentOpen] = useState(false);
            const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);
            const [dialogUpdateOpen, setDialogUpdateOpen] = useState(false);

            const { queryClient } = useRentalContext();

            const { confirmPaymentRental, deleteRental } = useRentalMutation();

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

                            {data.payment_status === 'paid' ? (
                                <DropdownMenuItem
                                    onSelect={() => {
                                        setTimeout(() => setDialogUpdateOpen(true), 0);
                                    }}
                                >
                                    <span>Edit</span>
                                </DropdownMenuItem>
                            ) : null}
                            {data.payment_status === 'unpaid' ? (
                                <DropdownMenuItem
                                    onSelect={() => {
                                        setTimeout(() => setIsDialogConfirmationPaymentOpen(true), 0);
                                    }}
                                >
                                    <span>Konfirmasi Pembayaran</span>
                                </DropdownMenuItem>
                            ) : null}
                            <DropdownMenuItem
                                onSelect={() => {
                                    setTimeout(() => setIsDialogDeleteOpen(true), 0);
                                }}
                            >
                                <span>Hapus</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Dialog open={dialogUpdateOpen} onOpenChange={setDialogUpdateOpen}>
                        <DialogContent className="scrollbar-hide max-h-[96%] overflow-y-scroll sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Edit Status Penyewaan</DialogTitle>
                                <DialogDescription>Lengkapi form berikut untuk mengubah status penyewaan</DialogDescription>
                            </DialogHeader>
                            <div className="mt-4">
                                <UpdateRentalForm id={data.id} status={data.status} closeDialog={() => setDialogUpdateOpen(false)} />
                            </div>
                        </DialogContent>
                    </Dialog>

                    <AlertDialog open={isDialogConfirmationPaymentOpen} onOpenChange={setIsDialogConfirmationPaymentOpen}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Apakah anda benar-benar yakin?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Tindakan ini tidak dapat dibatalkan. Anda yakin ingin mengonfirmasi pembayaran ini?
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    disabled={confirmPaymentRental.isPending}
                                    onClick={(e) => {
                                        e.preventDefault();

                                        confirmPaymentRental.mutate(data.id, {
                                            onSuccess: ({ message }) => {
                                                toast.success(message, {
                                                    richColors: true,
                                                });

                                                queryClient.invalidateQueries({
                                                    queryKey: [TRANSACTION_RENTAL_LIST],
                                                });

                                                setIsDialogConfirmationPaymentOpen(false);
                                            },
                                            onError: (error) => {
                                                if (axios.isAxiosError(error) && error.response) {
                                                    toast.error(error.response.data.message, {
                                                        richColors: true,
                                                    });
                                                } else {
                                                    toast.error(error.message, {
                                                        richColors: true,
                                                    });
                                                }
                                            },
                                        });
                                    }}
                                >
                                    {confirmPaymentRental.isPending ? <Loader className="text-muted h-4 w-4 animate-spin" /> : 'Konfirmasi'}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
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
                                    disabled={deleteRental.isPending}
                                    onClick={(e) => {
                                        e.preventDefault();

                                        deleteRental.mutate(data.id, {
                                            onSuccess: ({ message }) => {
                                                toast.success(message);

                                                queryClient.invalidateQueries({
                                                    queryKey: [TRANSACTION_RENTAL_LIST],
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
                                    {deleteRental.isPending ? <Loader className="text-muted h-4 w-4 animate-spin" /> : 'Hapus'}
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
