import { makeRequest } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { CreateProductRequest, UpdateProductRequest } from './types';

const useProductMutation = () => {
    const createProduct = useMutation({
        mutationFn: async (data: CreateProductRequest) => {
            const formData = new FormData();

            formData.append('name', data.name);
            formData.append('category_id', data.category_id);
            formData.append('variant_id', data.variant_id);
            formData.append('price_per_day', data.price_per_day.toString());
            formData.append('description', data.description);

            formData.append('image_1', 'tes');

            // if (data.image_1) {
            //     formData.append('image_1', data.image_1);
            // }

            if (data.image_2) {
                formData.append('image_2', data.image_2);
            }

            if (data.image_3) {
                formData.append('image_3', data.image_3);
            }

            if (data.image_4) {
                formData.append('image_4', data.image_4);
            }

            return await makeRequest<{ message: string }>(route('products.store'), {
                method: 'POST',
                data: formData,
            });
        },
    });

    const updateProduct = useMutation({
        mutationFn: async ({ id, data }: { id: number; data: UpdateProductRequest }) => {
            const formData = new FormData();

            formData.append('name', data.name);
            formData.append('category_id', data.category_id);
            formData.append('variant_id', data.variant_id);
            formData.append('price_per_day', data.price_per_day.toString());
            formData.append('description', data.description);

            if (data.image_1) {
                formData.append('image_1', data.image_1);
            }

            if (data.image_2) {
                formData.append('image_2', data.image_2);
            }

            if (data.image_3) {
                formData.append('image_3', data.image_3);
            }

            if (data.image_4) {
                formData.append('image_4', data.image_4);
            }

            return await makeRequest<{ message: string }>(route('products.update', id), {
                method: 'POST',
                data: formData,
            });
        },
    });

    const deleteProduct = useMutation({
        mutationFn: async (id: number) => {
            return await makeRequest<{ message: string }>(route('products.destroy', id), {
                method: 'DELETE',
            });
        },
    });

    const deleteMultipleProduct = useMutation({
        mutationFn: async (ids: number[]) => {
            return await makeRequest<{ message: string }>(route('products.destroy-multiple'), {
                method: 'DELETE',
                data: { ids },
            });
        },
    });

    return {
        createProduct,
        updateProduct,
        deleteProduct,
        deleteMultipleProduct,
    };
};

export { useProductMutation };
