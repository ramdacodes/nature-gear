import { makeRequest, parseQuery } from '@/lib/utils';
import { TableRequest, TableResponse } from '@/types';
import { CustomerResponse } from './types';

export function listCustomers(table: Partial<TableRequest<CustomerResponse>> = {}) {
    return makeRequest<TableResponse<CustomerResponse, 'customers'>>(`${route('customers.index')}?${parseQuery(table)}`);
}
