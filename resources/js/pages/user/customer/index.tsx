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
import { DataTable, DataTablePagination, DataTableToolbar } from '@/components/ui/data-table';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { USER_CUSTOMER_LIST } from '@/constants';
import useTableQuery from '@/hooks/use-table-query';
import { useCustomerMutation } from '@/hooks/user/customer';
import AppLayout from '@/layouts/app-layout';
import { columnLabel, columns, CreateCustomerForm } from '@/pages/user/customer/components';
import { CustomerContext } from '@/pages/user/customer/customer.context';
import { listCustomers } from '@/services/user/customer';
import { CustomerResponse } from '@/services/user/customer/types';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useQueryClient } from '@tanstack/react-query';
import {
    ColumnFiltersState,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    SortingState,
    useReactTable,
    VisibilityState,
} from '@tanstack/react-table';
import axios from 'axios';
import { Loader, PlusCircle, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Beranda',
        href: route('dashboard'),
    },
    {
        title: 'Pelanggan',
        href: route('customers.index'),
    },
];

export default function Customer() {
    const searchParams = new URLSearchParams(window.location.search);
    const pageIndex = Number(searchParams.get('page') || 1);

    const lastQueryString = useRef('');

    const [sheetOpen, setSheetOpen] = useState(false);
    const [dialogDeleteOpen, setDialogDeleteOpen] = useState(false);
    const [rowSelection, setRowSelection] = useState({});
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: Math.max(0, pageIndex - 1),
        pageSize: Number(searchParams.get('size')) || 10,
    });

    const { deleteMultipleCustomer } = useCustomerMutation();

    const tableQuery = useTableQuery({
        queryKey: [USER_CUSTOMER_LIST, columnFilters, globalFilter, pagination, sorting],
        queryFn: listCustomers,
        columnFilters,
        globalFilter,
        pagination,
        sorting,
    });

    const queryClient = useQueryClient();

    const pageCount = useMemo(() => {
        if (tableQuery.data && tableQuery.data.rowCount) {
            return Math.ceil(tableQuery.data.rowCount / pagination.pageSize);
        }

        return 1;
    }, [tableQuery.data?.rowCount, pagination.pageSize]);

    const table = useReactTable({
        data: tableQuery.data?.customers || [],
        columns,
        pageCount,
        enableRowSelection: true,
        manualPagination: true,
        manualFiltering: true,
        manualSorting: true,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
            globalFilter,
            pagination,
        },
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        onColumnVisibilityChange: setColumnVisibility,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getRowId: (row) => String(row.id),
    });

    useEffect(() => {
        if (!router) return;

        const newParams = new URLSearchParams();

        newParams.set('page', (pagination.pageIndex + 1).toString());
        newParams.set('size', pagination.pageSize.toString());

        sorting.forEach((s) => newParams.append(`sorting[${s.id}]`, s.desc ? 'desc' : 'asc'));

        columnFilters.forEach((filter) => {
            if (filter.value !== undefined && filter.value !== null) {
                newParams.append(`filters[${filter.id}]`, String(filter.value));
            }
        });

        const newQueryString = newParams.toString();

        if (lastQueryString.current !== newQueryString) {
            lastQueryString.current = newQueryString;

            setTimeout(() => {
                if (router) {
                    router.replace({
                        url: `${window.location.pathname}?${newParams.toString()}`,
                        preserveState: true,
                        preserveScroll: true,
                    });
                }
            }, 100);
        }
    }, [pagination, sorting, columnFilters, globalFilter]);

    return (
        <CustomerContext.Provider value={{ sheetOpen, setSheetOpen, queryClient }}>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Pelanggan" />

                <div className="h-full p-4">
                    <h2 className="text-xl font-semibold">Pelanggan</h2>
                    <p className="text-muted-foreground mt-2">Berikut adalah daftar pelanggan yang tersedia</p>

                    <div className="py-5">
                        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="w-full sm:w-auto"></div>
                            <div className="flex flex-col gap-2 sm:flex-row sm:gap-2">
                                <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                                    <SheetTrigger asChild>
                                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                                            <PlusCircle className="h-4 w-4" /> Tambah Data
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent className="scrollbar-hide max-h-screen overflow-y-scroll">
                                        <SheetHeader>
                                            <SheetTitle>Tambah Data Pelanggan</SheetTitle>
                                            <SheetDescription>Lengkapi data dibawah ini untuk menambahkan pelanggan</SheetDescription>
                                        </SheetHeader>
                                        <div className="mt-4">
                                            <CreateCustomerForm />
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </div>

                        <DataTableToolbar
                            className="border-t"
                            table={table}
                            columnLabel={columnLabel}
                            placeholderFilter="Cari..."
                            isLoading={tableQuery.status === 'pending' || tableQuery.isFetching}
                        >
                            {Object.keys(table.getState().rowSelection).length ? (
                                <>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        className="flex items-center gap-2 transition-all"
                                        onClick={() => setDialogDeleteOpen(true)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        Hapus
                                    </Button>
                                    <AlertDialog open={dialogDeleteOpen} onOpenChange={setDialogDeleteOpen}>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Apakah Anda benar-benar yakin?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Tindakan ini tidak dapat dibatalkan. Apakah Anda yakin ingin menghapus data ini secara permanen
                                                    dari server?
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                                <AlertDialogAction
                                                    disabled={deleteMultipleCustomer.isPending}
                                                    onClick={(e) => {
                                                        e.preventDefault();

                                                        const selectedIds: number[] = Object.keys(table.getState().rowSelection).map((id) =>
                                                            Number(id),
                                                        );

                                                        deleteMultipleCustomer.mutate(selectedIds, {
                                                            onSuccess: ({ message }) => {
                                                                toast.success(message);

                                                                queryClient.invalidateQueries({
                                                                    queryKey: [USER_CUSTOMER_LIST],
                                                                });

                                                                setDialogDeleteOpen(false);

                                                                table.setRowSelection({});
                                                            },
                                                            onError: (error) => {
                                                                if (axios.isAxiosError(error) && error.response) {
                                                                    toast.error(error.response.data.message);
                                                                } else {
                                                                    toast.error(error.message);
                                                                }

                                                                console.log(error);
                                                            },
                                                        });
                                                    }}
                                                >
                                                    {deleteMultipleCustomer.isPending ? (
                                                        <Loader className="text-muted h-4 w-4 animate-spin" />
                                                    ) : (
                                                        'Hapus'
                                                    )}
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </>
                            ) : (
                                <></>
                            )}
                        </DataTableToolbar>

                        <DataTable<CustomerResponse>
                            columns={columns}
                            table={table}
                            isLoading={tableQuery.status === 'pending' || (tableQuery.isFetching && tableQuery.isFetching)}
                            isError={tableQuery.status === 'error'}
                            getRowKey={(row) => row.original.id}
                        />

                        <DataTablePagination table={table} rowCount={tableQuery.data?.rowCount} />
                    </div>
                </div>
            </AppLayout>
        </CustomerContext.Provider>
    );
}
