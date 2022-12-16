import { useAppContext } from "../context/context";
import cardsAPI from "../services/cardsAPI";

const useMoveCard = async (id, targetListId, targetPosition) => {
  const context = useAppContext();

  try {
    // request
    const resp = await cardsAPI.updateCardPosition(
      context.keys.apiKey,
      context.keys.token,
      id,
      targetListId,
      targetPosition
    );
    if (resp.status === 200) {
      // recreate cards array and replace modified card
      const newCards = context.cards.map((card) =>
        card.id === resp.data.id ? resp.data : card
      );
      // update cards in List component
      context.setCards(newCards);
    }
  } catch (error) {
    console.log(error.message);
    alert("Unable to update card");
  }
}

export default useMoveCard;