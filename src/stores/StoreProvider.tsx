import React from 'react';
import rootStore from './RootStore'; 

type RootStoreValue = typeof rootStore;

export const StoreContext = React.createContext<RootStoreValue>(rootStore);

const StoreProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <StoreContext.Provider value={rootStore}>
        {children}
    </StoreContext.Provider>
  )
}

export default StoreProvider