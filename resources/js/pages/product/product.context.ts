import { QueryClient } from '@tanstack/react-query';
import { createContext, useContext } from 'react';

interface ProductContext {
    sheetOpen: boolean;
    setSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
    queryClient: QueryClient;
}

export const ProductContext = createContext<ProductContext>(null!);

export function useProductContext(): ProductContext {
    return useContext(ProductContext) || {};
}
