import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { USER_CUSTOMER_LIST } from '@/constants';
import { useCustomerMutation } from '@/hooks/user/customer';
import { useCustomerContext } from '@/pages/user/customer/customer.context';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const formSchema = z.object({
    name: z.string().nonempty('Nama harus diisi'),
    email: z.string().nonempty('Email harus diisi').email('Email tidak valid'),
    phone: z.string().nonempty('Nomor telepon harus diisi'),
    address: z.string().nonempty('Alamat harus diisi'),
});

export default function CreateCustomerForm() {
    const [errors, setErrors] = useState<Record<string, string>>({});

    const { createCustomer } = useCustomerMutation();

    const { setSheetOpen, queryClient } = useCustomerContext();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            address: '',
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const data = {
            ...values,
        };

        createCustomer.mutate(data, {
            onSuccess: ({ message }) => {
                toast.success(message);

                form.reset();

                queryClient.invalidateQueries({
                    queryKey: [USER_CUSTOMER_LIST],
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

                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Silakan masukkan email" type="email" autoComplete="off" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nomor Telepon</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Silakan masukkan nomor telepon" type="tel" autoComplete="off" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Alamat</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Silakan masukkan alamat" autoComplete="off" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button type="submit" loading={createCustomer.isPending} className="" size="sm">
                        Simpan
                    </Button>
                </div>
            </form>
        </Form>
    );
}
