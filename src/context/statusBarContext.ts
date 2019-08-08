import { createContext, Dispatch } from 'react';

interface ContextProps {
  statusBarState: object;
  dispatch: Dispatch<{ type: string; payload: object }>;
}

export const StatusBarContext = createContext(({} as any) as ContextProps);
export const StatusBarProvider = StatusBarContext.Provider;
