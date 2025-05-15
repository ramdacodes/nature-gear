import { makeRequest } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { CreateCustomerRequest, UpdateCustomerRequest } from './types';

const useCustomerMutation = () => {
    const createCustomer = useMutation({
        mutationFn: async (data: CreateCustomerRequest) => {
            return await makeRequest<{ message: string }>(route('customers.store'), {
                method: 'POST',
                data,
            });
        },
    });

    const updateCustomer = useMutation({
        mutationFn: async ({ id, data }: { id: number; data: UpdateCustomerRequest }) => {
            return await makeRequest<{ message: string }>(route('customers.update', id), {
                method: 'PUT',
                data,
            });
        },
    });

    const deleteCustomer = useMutation({
        mutationFn: async (id: number) => {
            return await makeRequest<{ message: string }>(route('customers.destroy', id), {
                method: 'DELETE',
            });
        },
    });

    const deleteMultipleCustomer = useMutation({
        mutationFn: async (ids: number[]) => {
            return await makeRequest<{ message: string }>(route('customers.destroy-multiple'), {
                method: 'DELETE',
                data: { ids },
            });
        },
    });

    return {
        createCustomer,
        updateCustomer,
        deleteCustomer,
        deleteMultipleCustomer,
    };
};

export { useCustomerMutation };
