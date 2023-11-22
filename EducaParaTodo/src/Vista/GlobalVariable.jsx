import React, { createContext, useState, useContext } from 'react';

const GlobalStateContext = createContext();

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};

export const GlobalStateProvider = ({ children }) => {
  const [data, setData] = useState();

  return (
    <GlobalStateContext.Provider value={{ data, setData }}>
      {children}
    </GlobalStateContext.Provider>
  );
};