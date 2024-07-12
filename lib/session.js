"use client";
import {createContext, useContext, useReducer} from "react";
// import {getUserData} from "@/lib/auth";

const SessionContext = createContext(null)

const initialState = {
    data: null,
    status: 'unauthenticated'
}

const initializer = (identityToken) => {
    if (!identityToken) {
        return initialState
    } else if (identityToken) {
        return {
            data: JSON.parse(Buffer.from(identityToken.split('.')[1], 'base64').toString()),
            status: 'authenticated'
        }
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

export const SessionProvider = ({identityToken, children}) => {
    // const [mounted, setMounted] = useState(false)
    // const [trigger, setTrigger] = useState(false)
    const [session, dispatch] = useReducer(reducer, identityToken, initializer)

    // const refreshSession = () => setTrigger(true)
    //
    // useEffect(() => {
    //     if ((mounted && session.status === 'unauthenticated') || (trigger && mounted)) {
    //         (async () => {
    //             const response = await getUserData()
    //             const data = JSON.parse(response)
    //             console.log('data:', data)
    //             if (data.email) {
    //                 dispatch({type: 'add_user_data', data: data})
    //             } else {
    //                 dispatch({type: 'clear_user_data'})
    //             }
    //             setTrigger(false)
    //         })()
    //     }
    // }, [mounted, trigger])
    //
    // useEffect(() => {
    //     setMounted(true)
    // }, [])
    //

    // TODO: find way to revalidate provider after initial login
    const clearSession = () => {
        dispatch({type: 'clear_user_data'})
    }

    return <SessionContext.Provider value={{...session, clearSession}}>
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