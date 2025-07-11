import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { TRANSACTION_RENTAL_LIST } from '@/constants';
import { useRentalMutation } from '@/hooks/transaction/rental';
import { cn } from '@/lib/utils';
import { useRentalContext } from '@/pages/transaction/rental/rental.context';
import { SharedData } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import { format } from 'date-fns';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

interface PageData extends SharedData {
    products: {
        id: string;
        name: string;
    }[];
    customers: {
        id: string;
        name: string;
    }[];
}

const formSchema = z.object({
    product_id: z.string().nonempty('Produk harus diisi'),
    customer_id: z.string().nonempty('Pelanggan harus diisi'),
    start_date: z.string().nonempty('Tanggal mulai harus diisi'),
    end_date: z.string().nonempty('Tanggal selesai harus diisi'),
});

export default function CreateRentalForm() {
    const { products, customers } = usePage<PageData>().props;

    const [openSelect, setOpenSelect] = useState({
        product: false,
        customer: false,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const { createRental } = useRentalMutation();

    const { setSheetOpen, queryClient } = useRentalContext();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            product_id: '',
            customer_id: '',
            start_date: String(new Date()),
            end_date: String(new Date()),
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const data = {
            product_id: Number(values.product_id),
            customer_id: Number(values.customer_id),
            start_date: format(values.start_date, 'yyyy-MM-dd'),
            end_date: format(values.end_date, 'yyyy-MM-dd'),
        };

        if (data.end_date < data.start_date) {
            toast.error('Tanggal selesai harus lebih besar dari tanggal mulai');
            return;
        }

        createRental.mutate(data, {
            onSuccess: ({ message }) => {
                toast.success(message);

                form.reset();

                queryClient.invalidateQueries({
                    queryKey: [TRANSACTION_RENTAL_LIST],
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
                            name="product_id"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Produk</FormLabel>
                                    <Popover
                                        open={openSelect.product}
                                        onOpenChange={() =>
                                            setOpenSelect((prev) => ({
                                                ...prev,
                                                product: !prev.product,
                                            }))
                                        }
                                    >
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn('justify-between', !field.value && 'text-muted-foreground')}
                                                >
                                                    {field.value
                                                        ? products.find((product) => String(product.id) === field.value)?.name
                                                        : 'Pilih produk'}
                                                    <ChevronsUpDown className="opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="max-h-[--radix-popover-content-available-height] w-[--radix-popover-trigger-width] p-0">
                                            <Command>
                                                <CommandInput
                                                    placeholder="Cari produk..."
                                                    className="h-9 border-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                                />
                                                <CommandList>
                                                    <CommandEmpty>Tidak ada data.</CommandEmpty>
                                                    <CommandGroup className="scrollbar-hide max-h-60 overflow-y-scroll">
                                                        {products.map((product) => (
                                                            <CommandItem
                                                                value={product.name}
                                                                key={product.id}
                                                                onSelect={() => {
                                                                    form.setValue('product_id', String(product.id));

                                                                    setOpenSelect((prev) => ({
                                                                        ...prev,
                                                                        product: !prev.product,
                                                                    }));
                                                                }}
                                                            >
                                                                {product.name}
                                                                <Check
                                                                    className={cn(
                                                                        'ml-auto',
                                                                        String(product.id) === field.value ? 'opacity-100' : 'opacity-0',
                                                                    )}
                                                                />
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="customer_id"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Pelanggan</FormLabel>
                                    <Popover
                                        open={openSelect.customer}
                                        onOpenChange={() =>
                                            setOpenSelect((prev) => ({
                                                ...prev,
                                                customer: !prev.customer,
                                            }))
                                        }
                                    >
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn('justify-between', !field.value && 'text-muted-foreground')}
                                                >
                                                    {field.value
                                                        ? customers.find((customer) => String(customer.id) === field.value)?.name
                                                        : 'Pilih pelanggan'}
                                                    <ChevronsUpDown className="opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="max-h-[--radix-popover-content-available-height] w-[--radix-popover-trigger-width] p-0">
                                            <Command>
                                                <CommandInput
                                                    placeholder="Cari kategori..."
                                                    className="h-9 border-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                                />
                                                <CommandList>
                                                    <CommandEmpty>Tidak ada data.</CommandEmpty>
                                                    <CommandGroup className="scrollbar-hide max-h-60 overflow-y-scroll">
                                                        {customers.map((customer) => (
                                                            <CommandItem
                                                                value={customer.name}
                                                                key={customer.id}
                                                                onSelect={() => {
                                                                    form.setValue('customer_id', String(customer.id));

                                                                    setOpenSelect((prev) => ({
                                                                        ...prev,
                                                                        customer: !prev.customer,
                                                                    }));
                                                                }}
                                                            >
                                                                {customer.name}
                                                                <Check
                                                                    className={cn(
                                                                        'ml-auto',
                                                                        String(customer.id) === field.value ? 'opacity-100' : 'opacity-0',
                                                                    )}
                                                                />
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="start_date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tanggal Mulai</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="date"
                                            placeholder="Pilih tanggal mulai"
                                            autoComplete="off"
                                            {...field}
                                            value={field.value ? String(field.value) : ''}
                                            onChange={(e) => field.onChange(format(new Date(e.target.value), 'yyyy-MM-dd'))}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="end_date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tanggal Selesai</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="date"
                                            placeholder="Pilih tanggal selesai"
                                            autoComplete="off"
                                            {...field}
                                            value={field.value ? String(field.value) : ''}
                                            onChange={(e) => field.onChange(format(new Date(e.target.value), 'yyyy-MM-dd'))}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button type="submit" loading={createRental.isPending} className="" size="sm">
                        Simpan
                    </Button>
                </div>
            </form>
        </Form>
    );
}
