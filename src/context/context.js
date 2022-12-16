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
    console.log('context')
    // const moveCard = async (id, idList, position) => {
    //     console.log(id, idList, position)
    //     // let position = calculatePosition();
    //     try {
    //       // request
    //       const resp = await cardsAPI.updateCardPosition(
    //         keys.apiKey,
    //         keys.token,
    //         id,
    //         idList,
    //         position
    //       );
    //       if (resp.status === 200) {
    //         // recreate cards array and replace modified card
    //         const newCards = cards.map((card) =>
    //           card.id === resp.data.id ? resp.data : card
    //         );
    //         // update cards in List component
    //         setCards(newCards);
    //       }
    //     } catch (error) {
    //       console.log(error.message);
    //       alert("Unable to update card");
    //     }
    //   };

    return (
        <AppContext.Provider value={{   keys, setKeys,
                                        boards, setBoards,
                                        lists, setLists,
                                        cards, setCards,
                                        // moveCard
                                    }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
