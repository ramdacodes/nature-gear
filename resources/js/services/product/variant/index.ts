import { makeRequest, parseQuery } from '@/lib/utils';
import { TableRequest, TableResponse } from '@/types';

import { VariantResponse } from './types';

export function listVariants(table: Partial<TableRequest<VariantResponse>> = {}) {
    return makeRequest<TableResponse<VariantResponse, 'variants'>>(`${route('variants.index')}?${parseQuery(table)}`);
}
