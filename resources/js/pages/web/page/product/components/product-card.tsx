import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { numberFormat } from '@/lib/utils';

interface ProductCardProps {
    id: number;
    name: string;
    category: string | null;
    variant: string | null;
    price_per_day: number;
    description: string;
    image_1: string | null;
}

export default function ProductCard({ name, category, variant, price_per_day, description, image_1 }: ProductCardProps) {
    return (
        <Card className="overflow-hidden pt-0 transition-shadow hover:shadow-lg">
            <img
                src={image_1 || '/images/placeholder.png'}
                alt={name}
                className="h-48 w-full object-cover"
                onError={(e) => {
                    e.currentTarget.src = '/img/placeholder.png';
                }}
            />

            <CardHeader>
                <CardTitle className="text-lg font-semibold">{name}</CardTitle>
                <div className="mt-1 flex flex-wrap gap-2">
                    {category && <Badge variant="outline">{category}</Badge>}
                    {variant && <Badge variant="secondary">{variant}</Badge>}
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <p className="text-muted-foreground line-clamp-3 text-sm">{description}</p>

                <div className="text-sm font-semibold text-green-700 dark:text-green-400">{numberFormat(price_per_day)} / hari</div>

                <Button
                    className="w-full cursor-pointer"
                    size="sm"
                    onClick={() => {
                        const message = `Saya ingin sewa ${name} di Nature Gear.`;
                        const url = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
                        window.open(url, '_blank');
                    }}
                >
                    Sewa Sekarang
                </Button>
            </CardContent>
        </Card>
    );
}
