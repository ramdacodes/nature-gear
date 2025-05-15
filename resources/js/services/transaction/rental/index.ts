import { makeRequest, parseQuery } from '@/lib/utils';
import { TableRequest, TableResponse } from '@/types';

import { RentalResponse } from './types';

export function listRentals(table: Partial<TableRequest<RentalResponse>> = {}) {
    return makeRequest<TableResponse<RentalResponse, 'rentals'>>(`${route('rentals.index')}?${parseQuery(table)}`);
}
