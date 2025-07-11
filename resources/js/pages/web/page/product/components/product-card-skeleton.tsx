import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductCardSkeleton() {
    return (
        <Card className="overflow-hidden pt-0">
            <Skeleton className="h-48 w-full" />

            <CardHeader>
                <Skeleton className="h-5 w-2/3" />
                <div className="mt-2 flex gap-2">
                    <Skeleton className="h-4 w-16 rounded-full" />
                    <Skeleton className="h-4 w-16 rounded-full" />
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-8 w-full rounded-md" />
            </CardContent>
        </Card>
    );
}
