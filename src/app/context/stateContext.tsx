import React, { createContext, Dispatch, useContext, useReducer } from 'react';
import { Action, stateReducer } from '../reducers/stateReducer';

export const StateContext = createContext({});
export const DispatchContext = createContext((() => {}) as Dispatch<Action>);

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(stateReducer, {});
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useDispatch = () => useContext(DispatchContext);

export const useGlobalState = property => {
  const state = useContext(StateContext);
  return state[property];
};
