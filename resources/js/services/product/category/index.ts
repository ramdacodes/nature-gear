import { makeRequest, parseQuery } from '@/lib/utils';
import { TableRequest, TableResponse } from '@/types';

import { CategoryResponse } from './types';

export function listCategories(table: Partial<TableRequest<CategoryResponse>> = {}) {
    return makeRequest<TableResponse<CategoryResponse, 'categories'>>(`${route('categories.index')}?${parseQuery(table)}`);
}
