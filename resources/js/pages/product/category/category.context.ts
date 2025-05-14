import { QueryClient } from '@tanstack/react-query';
import { createContext, useContext } from 'react';

interface CategoryContext {
    sheetOpen: boolean;
    setSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
    queryClient: QueryClient;
}

export const CategoryContext = createContext<CategoryContext>(null!);

export function useCategoryContext(): CategoryContext {
    return useContext(CategoryContext) || {};
}
