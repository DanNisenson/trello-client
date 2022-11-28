import { createContext, useContext, useState } from "react";

export const AppContext = createContext();

export function AppWrapper({ children }) {
  const [keys, setKeys] = useState({
    apiKey: "1a9b6e88add0383f3d5cdc6764833c2a",
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
