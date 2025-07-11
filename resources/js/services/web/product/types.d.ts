interface ProductItem {
    id: number;
    name: string;
    category: string | null;
    variant: string | null;
    price_per_day: number;
    description: string;
    image_1: string | null;
}

export interface ProductResponse {
    products: ProductItem[];
    totalPages: number;
}
