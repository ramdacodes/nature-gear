import { QueryClient } from '@tanstack/react-query';
import { createContext, useContext } from 'react';

interface RentalContext {
    sheetOpen: boolean;
    setSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
    queryClient: QueryClient;
}

export const RentalContext = createContext<RentalContext>(null!);

export function useRentalContext(): RentalContext {
    return useContext(RentalContext) || {};
}
