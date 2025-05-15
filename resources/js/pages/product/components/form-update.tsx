import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { PRODUCT_LIST } from '@/constants';
import { useProductMutation } from '@/hooks/product';
import { cn } from '@/lib/utils';
import { useProductContext } from '@/pages/product/product.context';
import { SharedData } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

interface PageData extends SharedData {
    categories: {
        id: string;
        name: string;
    }[];
    variants: {
        id: string;
        name: string;
    }[];
}

interface UpdateProductFormProps {
    id: number;
    name: string;
    category_id: string | null;
    variant_id: string | null;
    price_per_day: number;
    description: string;
    closeSheet(): void;
}

const formSchema = z.object({
    name: z.string().nonempty('Nama harus diisi'),
    category_id: z.string().nonempty('Kategori harus diisi'),
    variant_id: z.string().nonempty('Varian harus diisi'),
    price_per_day: z.string().nonempty('Harga per hari harus diisi'),
    description: z.string().nonempty('Deskripsi harus diisi'),
    image_1: z
        .custom<File>((file) => file instanceof File, {
            message: 'File harus berupa gambar',
        })
        .refine((file) => ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type), {
            message: 'Gambar harus berupa JPEG, PNG, atau JPG',
        })
        .refine((file) => file.size <= 2 * 1024 * 1024, {
            message: 'Ukuran gambar tidak boleh lebih dari 2 MB',
        })
        .optional(),
});

export default function UpdateProductForm({ id, name, category_id, variant_id, price_per_day, description, closeSheet }: UpdateProductFormProps) {
    const { categories, variants } = usePage<PageData>().props;

    const [openSelect, setOpenSelect] = useState({
        category: false,
        variant: false,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const { updateProduct } = useProductMutation();

    const { queryClient } = useProductContext();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: name,
            category_id: category_id ?? '',
            variant_id: variant_id ?? '',
            price_per_day: String(price_per_day),
            description: description,
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const data = {
            ...values,
            price_per_day: Number(values.price_per_day),
            image_1: values.image_1,
        };

        updateProduct.mutate(
            {
                id,
                data,
            },
            {
                onSuccess: ({ message }) => {
                    toast.success(message);

                    form.reset();

                    queryClient.invalidateQueries({
                        queryKey: [PRODUCT_LIST],
                    });

                    closeSheet();
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
                            name="category_id"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Kategori</FormLabel>
                                    <Popover
                                        open={openSelect.category}
                                        onOpenChange={() =>
                                            setOpenSelect((prev) => ({
                                                ...prev,
                                                category: !prev.category,
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
                                                        ? categories.find((category) => String(category.id) === field.value)?.name
                                                        : 'Pilih kategori'}
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
                                                        {categories.map((category) => (
                                                            <CommandItem
                                                                value={category.name}
                                                                key={category.id}
                                                                onSelect={() => {
                                                                    form.setValue('category_id', String(category.id));

                                                                    setOpenSelect((prev) => ({
                                                                        ...prev,
                                                                        category: !prev.category,
                                                                    }));
                                                                }}
                                                            >
                                                                {category.name}
                                                                <Check
                                                                    className={cn(
                                                                        'ml-auto',
                                                                        String(category.id) === field.value ? 'opacity-100' : 'opacity-0',
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
                            name="variant_id"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Varian</FormLabel>
                                    <Popover
                                        open={openSelect.variant}
                                        onOpenChange={() =>
                                            setOpenSelect((prev) => ({
                                                ...prev,
                                                variant: !prev.variant,
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
                                                        ? variants.find((varian) => String(varian.id) === field.value)?.name
                                                        : 'Pilih varian'}
                                                    <ChevronsUpDown className="opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="max-h-[--radix-popover-content-available-height] w-[--radix-popover-trigger-width] p-0">
                                            <Command>
                                                <CommandInput
                                                    placeholder="Cari varian..."
                                                    className="h-9 border-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                                />
                                                <CommandList>
                                                    <CommandEmpty>Tidak ada data.</CommandEmpty>
                                                    <CommandGroup className="scrollbar-hide max-h-60 overflow-y-scroll">
                                                        {variants.map((variant) => (
                                                            <CommandItem
                                                                value={variant.name}
                                                                key={variant.id}
                                                                onSelect={() => {
                                                                    form.setValue('variant_id', String(variant.id));

                                                                    setOpenSelect((prev) => ({
                                                                        ...prev,
                                                                        variant: !prev.variant,
                                                                    }));
                                                                }}
                                                            >
                                                                {variant.name}
                                                                <Check
                                                                    className={cn(
                                                                        'ml-auto',
                                                                        String(variant.id) === field.value ? 'opacity-100' : 'opacity-0',
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
                            name="price_per_day"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Harga per hari</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Silakan masukkan harga per hari" type="number" min={0} autoComplete="off" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Deskripsi</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Silakan masukkan deskripsi" autoComplete="off" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="image_1"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Gambar</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Silakan masukkan gambar"
                                            type="file"
                                            autoComplete="off"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    form.setValue('image_1', file);
                                                }
                                            }}
                                            accept="image/*"
                                            onBlur={field.onBlur}
                                            name={field.name}
                                            ref={field.ref}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button type="submit" loading={updateProduct.isPending} className="" size="sm">
                        Simpan Perubahan
                    </Button>
                </div>
            </form>
        </Form>
    );
}
