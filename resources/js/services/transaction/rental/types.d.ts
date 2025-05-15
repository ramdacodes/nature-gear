export interface RentalResponse {
    id: number;
    code: string;
    customer: string | null;
    start_date: string;
    end_date: string;
    total: number;
    status: string;
    created_at: string;
    updated_at: string;
}
