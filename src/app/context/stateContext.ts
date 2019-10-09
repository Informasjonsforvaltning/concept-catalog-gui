import { createContext, Dispatch } from 'react';

interface ContextProps {
  statusBarState: object;
  dispatch: Dispatch<{ type: string; payload: object }>;
}

export const StateContext = createContext(({} as any) as ContextProps);
export const StateProvider = StateContext.Provider;
export const StateConsumer = StateContext.Consumer;
