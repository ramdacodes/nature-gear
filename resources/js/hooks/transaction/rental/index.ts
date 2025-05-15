import { makeRequest } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { CreateRentalRequest } from './types';

const useRentalMutation = () => {
    const createRental = useMutation({
        mutationFn: async (data: CreateRentalRequest) => {
            return await makeRequest<{ message: string }>(route('rentals.store'), {
                method: 'POST',
                data,
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
        deleteRental,
        deleteMultipleRental,
    };
};

export { useRentalMutation };
