import { createContext, useContext, useState } from "react";

export const AppContext = createContext();

export function AppWrapper({ children }) {
  const [keys, setKeys] = useState({
    apiKey: "13159bc9f229003323c4e0519a8f81e9",
    token: process.env.REACT_APP_TOKEN
  });
  return (
    <AppContext.Provider value={{ keys, setKeys }}>
      {children}
    </AppContext.Provider>
  );
}
export function useAppContext() {
  return useContext(AppContext);
}
