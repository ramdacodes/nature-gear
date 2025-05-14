export interface CreateProductRequest {
    name: string;
    category_id: string;
    variant_id: string;
    price_per_day: number;
    description: string;
    image_1: File | null;
    image_2?: File;
    image_3?: File;
    image_4?: File;
}

export interface UpdateProductRequest {
    name: string;
    category_id: string;
    variant_id: string;
    price_per_day: number;
    description: string;
    image_1?: File;
    image_2?: File;
    image_3?: File;
    image_4?: File;
}
