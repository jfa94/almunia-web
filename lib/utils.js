import {clsx} from "clsx";
import {twMerge} from "tailwind-merge"


export function cn(...inputs) {
    return twMerge(clsx(inputs));
}


export function toCamelCase(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index == 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}


export const useLocalStorage = () => {
    const setItem = (key, value) => {
        try {
            // Check if running in browser environment
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(value))
            } else {
                console.warn('Local storage is not available in this environment')
            }
        } catch (error) {
            console.error('Error setting item:', error)
        }
    }

    const getItem = (key) => {
        try {
            // Check if running in browser environment
            if (typeof window !== 'undefined') {
                const item = window.localStorage.getItem(key)
                return item ? JSON.parse(item) : undefined
            } else {
                console.warn('Local storage is not available in this environment')
                return undefined
            }
        } catch (error) {
            console.error('Error getting item:', error)
        }
    }

    const removeItem = (key) => {
        try {
            // Check if running in browser environment
            if (typeof window !== 'undefined') {
                window.localStorage.removeItem(key)
            } else {
                console.warn('Local storage is not available in this environment')
            }
        } catch (error) {
            console.error('Error removing item:', error)
        }
    }

    const clearStorage = () => {
        try {
            // Check if running in browser environment
            if (typeof window !== 'undefined') {
                window.localStorage.clear()
            } else {
                console.warn('Local storage is not available in this environment')
            }
        } catch (error) {
            console.error('Error clearing local storage:', error)
        }
    }

    return {setItem, getItem, removeItem, clearStorage}
}