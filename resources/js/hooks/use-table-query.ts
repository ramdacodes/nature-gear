import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ColumnFiltersState, PaginationState, SortingState } from '@tanstack/react-table';

import { TableRequest, TableResponse } from '@/types';

interface TableQueryProps<TData extends {}, Query extends string> {
    queryKey: any[];
    queryFn(table?: Partial<TableRequest<TData>>): Promise<TableResponse<TData, Query>>;
    columnFilters: ColumnFiltersState;
    globalFilter: string;
    pagination: PaginationState;
    sorting: SortingState;
}

function useTableQuery<TData extends {}, Query extends string>({
    queryKey,
    queryFn,
    columnFilters,
    globalFilter,
    pagination,
    sorting,
}: TableQueryProps<TData, Query>) {
    const queryClient = useQueryClient();
    const { pageIndex: page, pageSize: size } = pagination;

    const fetchData = () =>
        queryFn({
            page,
            size,
            globalFilter,
            filters: columnFilters.reduce<Partial<Record<keyof TData, any>>>((prev, curr) => {
                prev[curr.id as keyof TData] = curr.value;
                return prev;
            }, {}),
            sorting: sorting.reduce<Partial<Record<keyof TData, 'asc' | 'desc'>>>((prev, curr) => {
                prev[curr.id as keyof TData] = curr.desc ? 'desc' : 'asc';
                return prev;
            }, {}),
        });

    const query = useQuery({
        queryKey: [...queryKey, columnFilters, globalFilter, page, size, sorting],
        queryFn: fetchData,
        refetchOnWindowFocus: false,
    });

    return query;
}

export default useTableQuery;
