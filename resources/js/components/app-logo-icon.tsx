import { cn } from '@/lib/utils';
import NGR from '../../../public/img/ngr.png';

export default function AppLogoIcon({ className }: { className?: string }) {
    return (
        <div className="dark:rounded-sm dark:bg-white">
            <img src={NGR} alt="NGR" className={cn('fill-current', className)} />
        </div>
    );
}
