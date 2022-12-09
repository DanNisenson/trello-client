import { createContext, useContext, useState } from "react";

export const AppContext = createContext();

export function AppWrapper({ children }) {
    const [keys, setKeys] = useState({
        apiKey: process.env.REACT_APP_API_KEY,
        token: ""
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
