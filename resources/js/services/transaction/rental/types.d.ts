export interface RentalResponse {
    id: number;
    code: string;
    customer: string | null;
    start_date: string;
    end_date: string;
    total: number;
    status: 'pending' | 'completed' | 'ready_for_pickup' | 'picked_up' | 'canceled' | 'refunded';
    payment_status: 'paid' | 'unpaid';
    items: {
        id: number;
        product: {
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
        } | null;
        duration: number;
        total: number;
    }[];
    created_at: string;
    updated_at: string;
}
