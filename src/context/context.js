import { createContext, useContext, useState } from "react";
// import cardsAPI from "../services/cardsAPI";

export const AppContext = createContext();

export function AppWrapper({ children }) {
    const [keys, setKeys] = useState({
        apiKey: process.env.REACT_APP_API_KEY,
        token: ""
    });
    const [boards, setBoards] = useState([]);
    const [lists, setLists] = useState([]);
    const [cards, setCards] = useState([]);
   
    return (
        <AppContext.Provider value={{   keys, setKeys,
                                        boards, setBoards,
                                        lists, setLists,
                                        cards, setCards,
                                    }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
