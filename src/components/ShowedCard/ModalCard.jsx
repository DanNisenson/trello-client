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
    const [members, setMembers]= useState([])

    const getComments = async () => {
        try{
            const resp = await cardsAPI.getComments(context.keys, props.currentCard.id);     
            if (resp.status===200){    
                setComments(resp.data)
            }
        } catch (error) {
            console.log(error);
            console.log("error. failed to load data.");
        }
    }
    const getChecklist = async () => {
        try{
            const resp = await cardsAPI.getCheckL(context.keys, props.currentCard.id);
            if (resp.status===200){    
                setCheckList(resp.data)
            };

        } catch (error) {
            console.log(error);
            console.log("error. failed to load data.");
        }
    }
    const getMembers = async () => {
        try{
            const resp = await cardsAPI.getMembers(context.keys, props.currentCard.idBoard);
            if (resp.status===200){    
                setMembers(resp.data);
            }
        } catch (error) {
            console.log(error);
            console.log("error. failed to load data.");
        }
    }

    useEffect(() => {
        getComments();
        getChecklist();
        getMembers()
    }
        , [])


    return (
        <>
            <div className="card--background">
                <div className="card__total">
                    <div className="card__head" >
                        {props.currentCard.closed===true ?
                            <>
                                <div className="card__head--archive card__head__title card__head--archivebackground">  
                                    <i class="fa-sharp fa-solid fa-computer fa-2xl"></i>
                                    <h2 className="card__head__title--title">
                                        This Card is archived
                                    </h2>
                                </div>
                                <div className="card__head--X" onClick={() => props.setCurrentCard(null)}>
                                        <i class="fa-solid fa-xmark fa-2xl"></i>
                                </div>
                            </>
                            :<>
                            <div className="card__head card__head__title">
                                <i class="fa-sharp fa-solid fa-computer fa-2xl"></i>
                                <h2 className="card__head__title--title">
                                    {props.currentCard.name}
                                </h2>
                            </div>
                                <div className="card__head--X" onClick={() => props.setCurrentCard(null)}>
                                    <i class="fa-solid fa-xmark fa-2xl"></i>
                            </div></>
                        }
                    </div>
                    <div className="card__main">
                        <div className="card__body">
                            <BodyCard 
                                payload={props.currentCard} 
                                comments={comments} 
                                checkList={checkList}
                                setComments={setComments} 
                                setCheckList={setCheckList}
                                setCurrentCard={props.setCurrentCard} />
                        </div>
                        <div className="card__aside">
                            <AsideCard payload={props.currentCard} 
                                setCheckList={setCheckList} 
                                checkList={checkList} 
                                setCurrentCard={props.setCurrentCard}
                                members={members}
                                setMembers={setMembers}/>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )




}
export default ModalCard