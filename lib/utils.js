export const useLocalStorage = () => {
    const setItem = (key, value) => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
            console.error('Error setting item:', error)
        }
    }

    const getItem = (key) => {
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : undefined
        } catch (error) {
            console.error('Error getting item:', error)
        }
    }

    const removeItem = (key) => {
        try {
            window.localStorage.removeItem(key)
        } catch (error) {
            console.error('Error removing item:', error)
        }
    }

    return {setItem, getItem, removeItem}
}