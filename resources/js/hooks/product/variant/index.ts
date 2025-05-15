import { makeRequest } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { CreateVariantRequest, UpdateVariantRequest } from './types';

const useVariantMutation = () => {
    const createVariant = useMutation({
        mutationFn: async (data: CreateVariantRequest) => {
            return await makeRequest<{ message: string }>(route('variants.store'), {
                method: 'POST',
                data,
            });
        },
    });

    const updateVariant = useMutation({
        mutationFn: async ({ id, data }: { id: number; data: UpdateVariantRequest }) => {
            return await makeRequest<{ message: string }>(route('variants.update', id), {
                method: 'PUT',
                data,
            });
        },
    });

    const deleteVariant = useMutation({
        mutationFn: async (id: number) => {
            return await makeRequest<{ message: string }>(route('variants.destroy', id), {
                method: 'DELETE',
            });
        },
    });

    const deleteMultipleVariant = useMutation({
        mutationFn: async (ids: number[]) => {
            return await makeRequest<{ message: string }>(route('variants.destroy-multiple'), {
                method: 'DELETE',
                data: { ids },
            });
        },
    });

    return {
        createVariant,
        updateVariant,
        deleteVariant,
        deleteMultipleVariant,
    };
};

export { useVariantMutation };
