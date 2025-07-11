import { makeRequest } from '@/lib/utils';

import { ProductResponse } from './types';

export function fetchProduct(page: number) {
    return makeRequest<ProductResponse>(`${route('product.web')}?page=${page}`);
}
