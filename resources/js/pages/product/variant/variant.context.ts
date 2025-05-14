import { QueryClient } from '@tanstack/react-query';
import { createContext, useContext } from 'react';

interface VariantContext {
    sheetOpen: boolean;
    setSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
    queryClient: QueryClient;
}

export const VariantContext = createContext<VariantContext>(null!);

export function useVariantContext(): VariantContext {
    return useContext(VariantContext) || {};
}
