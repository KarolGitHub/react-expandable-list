import React, { createContext, Dispatch, useContext, useMemo, useReducer } from 'react';

import reducers from '../store/reducer';

const initialState: State = ['0'];

const ExpandContext = createContext<{ state: State; dispatch: Dispatch<Action> } | undefined>(undefined);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ExpandProvider({ children }: React.ReactElement | React.ReactElement[] | any): JSX.Element {
  const [state, dispatch] = useReducer(reducers, initialState);
  const store = useMemo(() => ({ state, dispatch }), [state]);

  return <ExpandContext.Provider value={store}>{children}</ExpandContext.Provider>;
}

function useExpand(): {
  state: State;
  dispatch: Dispatch<Action>;
} {
  const context = useContext(ExpandContext);
  if (context === undefined) {
    throw new Error('useExpand must be used within a ExpandProvider');
  }
  return context;
}

export { ExpandProvider, useExpand };
