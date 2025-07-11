import { makeRequest } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { CreateRentalRequest, UpdateRentalRequest } from './types';

const useRentalMutation = () => {
    const createRental = useMutation({
        mutationFn: async (data: CreateRentalRequest) => {
            return await makeRequest<{ message: string }>(route('rentals.store'), {
                method: 'POST',
                data,
            });
        },
    });

    const updateRental = useMutation({
        mutationFn: async ({ id, data }: { id: number; data: UpdateRentalRequest }) => {
            return await makeRequest<{ message: string }>(route('rentals.update', id), {
                method: 'PUT',
                data,
            });
        },
    });

    const confirmPaymentRental = useMutation({
        mutationFn: async (id: number) => {
            return await makeRequest<{ message: string }>(route('rentals.confirm-payment', id), {
                method: 'PUT',
            });
        },
    });

    const deleteRental = useMutation({
        mutationFn: async (id: number) => {
            return await makeRequest<{ message: string }>(route('rentals.destroy', id), {
                method: 'DELETE',
            });
        },
    });

    const deleteMultipleRental = useMutation({
        mutationFn: async (ids: number[]) => {
            return await makeRequest<{ message: string }>(route('rentals.destroy-multiple'), {
                method: 'DELETE',
                data: { ids },
            });
        },
    });

    return {
        createRental,
        updateRental,
        confirmPaymentRental,
        deleteRental,
        deleteMultipleRental,
    };
};

export { useRentalMutation };
