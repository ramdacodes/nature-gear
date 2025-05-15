import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PRODUCT_CATEGORY_LIST } from '@/constants';
import { useCategoryMutation } from '@/hooks/product/category';
import { useCategoryContext } from '@/pages/product/category/category.context';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const formSchema = z.object({
    name: z.string().nonempty('Nama harus diisi'),
});

export default function CreateCategoryForm() {
    const [errors, setErrors] = useState<Record<string, string>>({});

    const { createCategory } = useCategoryMutation();

    const { setSheetOpen, queryClient } = useCategoryContext();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const data = {
            ...values,
        };

        createCategory.mutate(data, {
            onSuccess: ({ message }) => {
                toast.success(message);

                form.reset();

                queryClient.invalidateQueries({
                    queryKey: [PRODUCT_CATEGORY_LIST],
                });

                setSheetOpen(false);
            },
            onError: (error) => {
                if (axios.isAxiosError(error) && error.response) {
                    toast.error(error.response.data.message);

                    if (error.response.status === 422) {
                        setErrors(error.response.data.errors as Record<string, string>);
                    }
                } else {
                    toast.error(error.message);
                }
            },
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                {errors && Object.keys(errors).length > 0 && (
                    <div className="mb-4 border-l-2 border-red-500 px-2 py-1 text-sm">
                        <h4 className="mb-2 font-semibold text-red-700">An Error Has Occurred:</h4>
                        <ul className="list-disc pl-5 text-red-600">
                            {Object.entries(errors).map(([field, messages]) => {
                                const capitalizedField = field.charAt(0).toUpperCase() + field.slice(1);

                                return (
                                    <li key={field}>
                                        <strong>{capitalizedField}:</strong> {Array.isArray(messages) ? messages.join(', ') : messages}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}

                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Silakan masukkan nama" autoComplete="off" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button type="submit" loading={createCategory.isPending} className="" size="sm">
                        Simpan
                    </Button>
                </div>
            </form>
        </Form>
    );
}
