"use client";
import {createContext, useContext, useReducer} from "react";

const SessionContext = createContext(null)

const initialState = {
    data: null,
    status: 'unauthenticated'
}

const initializer = (initialData) => {
    if (!initialData?.sub) {
        return initialState
    }
    return {
        data: initialData,
        status: 'authenticated'
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'add_user_data': {
            return {
                data: action.data,
                status: 'authenticated'
            }
        }
        case 'clear_user_data': {
            return initialState
        }
    }
    throw Error('Unknown action: ' + action.type);
}

export const SessionProvider = ({initialData, children}) => {
    const [session, dispatch] = useReducer(reducer, initialData, initializer)

    const setSession = (userData) => {
        if (!userData || !userData.sub) {
            throw new Error('setSession must have a valid userData object')
        } else {
            dispatch({
                type: 'add_user_data',
                data: userData
            })
        }
    }

    const clearSession = () => {
        dispatch({type: 'clear_user_data'})
    }

    return <SessionContext.Provider value={{...session, setSession, clearSession}}>
        {children}
    </SessionContext.Provider>
}

export const useSession = () => {
    const context = useContext(SessionContext)
    if (!context) {
        throw new Error('useSession must be used within a SessionProvider')
    }
    return context
}