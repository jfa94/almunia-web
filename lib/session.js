"use client";
import {createContext, useContext, useReducer} from "react";

const SessionContext = createContext(null)

const initialState = {
    data: null,
    status: 'unauthenticated'
}

const initializer = (initialData) => {
    if (!initialData?.user?.sub) {
        return initialState
    }
    return {
        data: initialData,
        status: 'authenticated'
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'add_session_data': {
            return {
                data: action.data,
                status: 'authenticated'
            }
        }
        case 'clear_session_data': {
            return initialState
        }
    }
    throw Error('Unknown action: ' + action.type);
}

export const SessionProvider = ({initialData, children}) => {
    const [session, dispatch] = useReducer(reducer, initialData, initializer)

    const setSession = (sessionData) => {
        if (!sessionData || !sessionData.user.sub) {
            throw new Error('setSession must have a valid user object')
        } else {
            dispatch({
                type: 'add_session_data',
                data: sessionData
            })
        }
    }

    const clearSession = () => {
        dispatch({type: 'clear_session_data'})
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