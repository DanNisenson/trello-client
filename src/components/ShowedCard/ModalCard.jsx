import AsideCard from "./AsideCard";
import BodyCard from "./BodyCard";
import { useAppContext } from "../../context/context";
import { useState, useEffect } from 'react'
import cardsAPI from "../../services/cardsAPI";
import "../../assets/css/Card/ModalCard.css";

const ModalCard = (props) => {
    const context = useAppContext()
    const [comments, setComments] = useState([])
    const [checkList, setCheckList] = useState([])

    const getComments = async () => {
        const resp = await cardsAPI.getComments(context.keys, props.currentCard.id);
        setComments(resp.data)
        console.log(resp.data)
    }
    const getChecklist = async () => {
        const resp = await cardsAPI.getCheckL(context.keys, props.currentCard.id);
        setCheckList(resp.data);
        console.log(resp.data)
    }
    useEffect(() => {
        getComments()
        getChecklist()
    }
        , [])


    return (
        <>
            <div className="card--background">
                <div className="card__total">

                    <div className="card__head">
                        <div className="card__head card__head__title">
                            <i class="fa-sharp fa-solid fa-computer fa-2xl"></i>
                            <h1 className="card__head__title--title"> {props.currentCard.name}</h1>
                        </div>
                        <div onClick={() => props.showCard(null)}>
                            <i class="fa-solid fa-xmark fa-2xl"></i>
                        </div>
                    </div>
                    <div className="card__main">
                        <div className="card__body">
                            <BodyCard payload={props.currentCard} comments={comments} checkList={checkList}
                                setComments={setComments} setCheckList={setCheckList} />
                        </div>
                        <div className="card__aside">
                            <AsideCard payload={props.currentCard} setCheckList={setCheckList} checkList={checkList} />
                        </div>
                    </div>

                </div>
            </div>

        </>
    )




}
export default ModalCard