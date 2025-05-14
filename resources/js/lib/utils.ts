import { AxiosRequestConfig, AxiosResponse, isAxiosError } from 'axios';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import api from '@/lib/api';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function numberFormat(amount: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        signDisplay: 'auto',
    }).format(amount);
}

export function formatDateString(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
}

export function formatDateDDMMYYYY(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}

export function formatDateTimeString(dateString: string): string {
    const date = new Date(dateString);

    const formattedDate = date.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

    const formattedTime = date.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });

    return `${formattedDate} ${formattedTime}`;
}

export async function makeRequest<Response = any, Params = any>(url: string, options?: AxiosRequestConfig<Params>) {
    try {
        const res: AxiosResponse<Response, Params> = await api(url, options);
        return res.data;
    } catch (err) {
        if (!isAxiosError(err)) {
            console.warn(err);
            return Promise.reject(new Error('Internal service error'));
        }
        if (err.code === 'ERR_NETWORK') {
            return Promise.reject(err);
        }
        if (!err.response?.data) {
            console.warn(err);
            return Promise.reject(new Error('Internal service error'));
        }

        return Promise.reject(err.response.data as string);
    }
}

export function parseQuery(obj: { [key: string]: any }, key?: string): string {
    const queryString = Object.keys(obj)
        .flatMap((_key) => {
            const value = obj[_key];
            if (
                (typeof value === 'object' && Object.keys(value).length === 0 && value.constructor === Object) ||
                (typeof value === 'string' && !value)
            ) {
                return [];
            } else if (typeof value === 'object' && value.constructor === Object) {
                return parseQuery(value, _key);
            } else if (Array.isArray(value)) {
                return value.map((item, index) => `${key}[${_key}][${index}]=${encodeURIComponent(item)}`).join('&');
            } else if (value != null) {
                if (!key) return `${_key}=${encodeURIComponent(value)}`;
                return `${key}[${_key}]=${encodeURIComponent(value)}`;
            } else return [];
        })
        .join('&');

    return queryString;
}
