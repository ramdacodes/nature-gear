export interface ProductResponse {
    id: number;
    name: string;
    category: {
        id: number;
        name: string;
    } | null;
    variant: {
        id: number;
        name: string;
    } | null;
    price_per_day: number;
    description: string;
    image_1: string;
    image_2: string | null;
    image_3: string | null;
    image_4: string | null;
    created_at: string;
    updated_at: string;
}
