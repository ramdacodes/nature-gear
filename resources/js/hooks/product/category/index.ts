import { makeRequest } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { CreateCategoryRequest, UpdateCategoryRequest } from './types';

const useCategoryMutation = () => {
    const createCategory = useMutation({
        mutationFn: async (data: CreateCategoryRequest) => {
            return await makeRequest<{ message: string }>(route('categories.store'), {
                method: 'POST',
                data,
            });
        },
    });

    const updateCategory = useMutation({
        mutationFn: async ({ id, data }: { id: number; data: UpdateCategoryRequest }) => {
            return await makeRequest<{ message: string }>(route('categories.update', id), {
                method: 'PUT',
                data,
            });
        },
    });

    const deleteCategory = useMutation({
        mutationFn: async (id: number) => {
            return await makeRequest<{ message: string }>(route('categories.destroy', id), {
                method: 'DELETE',
            });
        },
    });

    const deleteMultipleCategory = useMutation({
        mutationFn: async (ids: number[]) => {
            return await makeRequest<{ message: string }>(route('categories.destroy-multiple'), {
                method: 'DELETE',
                data: { ids },
            });
        },
    });

    return {
        createCategory,
        updateCategory,
        deleteCategory,
        deleteMultipleCategory,
    };
};

export { useCategoryMutation };
