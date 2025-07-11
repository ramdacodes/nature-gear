import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TRANSACTION_RENTAL_LIST } from '@/constants';
import { useRentalMutation } from '@/hooks/transaction/rental';
import { useRentalContext } from '@/pages/transaction/rental/rental.context';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface UpdateRentalFormProps {
    id: number;
    status: string;
    closeDialog(): void;
}

const formSchema = z.object({
    status: z.string().nonempty('Status harus diisi'),
});

export default function UpdateRentalForm({ id, status, closeDialog }: UpdateRentalFormProps) {
    const [errors, setErrors] = useState<Record<string, string>>({});

    const { updateRental } = useRentalMutation();

    const { queryClient } = useRentalContext();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            status: status,
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const data = {
            status: values.status,
        };

        updateRental.mutate(
            {
                id,
                data,
            },
            {
                onSuccess: ({ message }) => {
                    toast.success(message, {
                        richColors: true,
                    });

                    queryClient.invalidateQueries({
                        queryKey: [TRANSACTION_RENTAL_LIST],
                    });

                    closeDialog();
                },
                onError: (error) => {
                    if (axios.isAxiosError(error) && error.response) {
                        toast.error(error.response.data.message, {
                            richColors: true,
                        });

                        if (error.response.status === 422) {
                            setErrors(error.response.data.errors as Record<string, string>);
                        }
                    } else {
                        toast.error(error.message, {
                            richColors: true,
                        });
                    }
                },
            },
        );
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
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a size" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="ready_for_pickup">Ready For Pickup</SelectItem>
                                            <SelectItem value="picked_up">Picked Up</SelectItem>
                                            <SelectItem value="canceled">Canceled</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                            <SelectItem value="refunded">Refunded</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button type="submit" loading={updateRental.isPending} className="" size="sm">
                        Simpan Perubahan
                    </Button>
                </div>
            </form>
        </Form>
    );
}
