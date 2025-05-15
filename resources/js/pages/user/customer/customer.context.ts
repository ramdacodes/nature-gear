import { QueryClient } from '@tanstack/react-query';
import { createContext, useContext } from 'react';

interface CustomerContext {
    sheetOpen: boolean;
    setSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
    queryClient: QueryClient;
}

export const CustomerContext = createContext<CustomerContext>(null!);

export function useCustomerContext(): CustomerContext {
    return useContext(CustomerContext) || {};
}
