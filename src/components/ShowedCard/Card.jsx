import AsideCard from "./AsideCard";
import BodyCard from "./BodyCard";
import { useAppContext } from "../../context/context";
import { useState, useEffect } from 'react'
import cardsAPI from "../../services/cardsAPI";

const Card = (props) => {
    const context= useAppContext()
    const [card, setCard]= useState(props.currentCard)
    const [comments, setComments] = useState([])
    const [checkL, setCheckL] = useState([])

    const getComments = async () => {
        const resp = await cardsAPI.getComments(context.keys, props.currentCard.id );
        setComments(resp.data)
        console.log(resp.data)
    }
    const getChecklist = async () => {
        const resp = await cardsAPI.getCheckL(context.keys, props.currentCard.id);
        setCheckL(resp.data);
        console.log(resp.data)
    }
    useEffect(() => {
        getComments()
        getChecklist()
    }
        , [])


return(
    <>
        <div className="card--background">
        <div className="card__total">
            
            <div className="card__head">
                <div className="card__head card__head__title">
                    <i class="fa-sharp fa-solid fa-computer fa-2xl"></i>
                    <h1 className="card__head__title--title"> {props.currentCard.name}</h1>
                </div>
                <div onClick={()=>props.showCard(null)}>
                <i class="fa-solid fa-xmark fa-2xl"></i>
                </div>    
            </div>
            <div className="card__main">
                <div className="card__body">
                    <BodyCard payload={card} comments={comments} checkL={checkL} setDesc={setCard}
                        getComments={setComments} delCheckL={setCheckL}/>
                </div>
                <div className="card__aside">
                    <AsideCard payload={props.currentCard} updateCheckL={setCheckL} checkL={checkL} />
                </div>
            </div>

            </div>
        </div>
    
    </>
)




}
export default Card