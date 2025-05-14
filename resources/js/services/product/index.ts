import { makeRequest, parseQuery } from '@/lib/utils';
import { TableRequest, TableResponse } from '@/types';

import { ProductResponse } from './types';

export function listProducts(table: Partial<TableRequest<ProductResponse>> = {}) {
    return makeRequest<TableResponse<ProductResponse, 'products'>>(`${route('products.index')}?${parseQuery(table)}`);
}
