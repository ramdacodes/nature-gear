import { useEffect } from 'react';

import useTimeout from './use-timeout';

export function useDebounceTable(callback: Function, deps: React.DependencyList, ms: number = 1000) {
    const { clear, reset } = useTimeout(callback, ms);
    useEffect(reset, [...deps, reset]);
    useEffect(clear, []);
}
