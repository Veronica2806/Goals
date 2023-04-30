import { createContext } from 'react';

type Context = {
    context: {
        isAuthenticated?: boolean,
    },
    setContext: (params: Context['context']) => {}

}

export const AppContext = createContext(<Context>{});