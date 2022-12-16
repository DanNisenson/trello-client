import { useState } from 'react'
import { useAppContext } from "../../context/context";
import Checklist from './Checklist';
import cardsAPI from "../../services/cardsAPI";
import WarningAdvise from './WarningAdvise';
import "../../assets/css/Card/BodyCard.css";

const BodyCard = (props) => {
    const context = useAppContext();
    const [description, setDescription] = useState(props.payload.desc)
    const [toggleEditDescription, setToggleEditDescription] = useState(false)
    const [toggleNewComment, setToggleNewComm] = useState(false)
    const [newComment, setNewComment] = useState("")
    const [toggleDelete, setToggleDelete]=useState(false)

    const delCheckList = async (List) => {
        try {
            const resp = await cardsAPI.delCheckL(context.keys, List);
            if (resp.status === 200) {
                props.setCheckList(props.checkList.filter(a => a.id !== List))
            }
        }
        catch (error) {
            console.log(error);
            console.log("error. failed to delete Checklist.");
        }
    }

    const delComment = async (comm) => {
        try {
            const resp = await cardsAPI.delComment(context.keys, comm);
            if (resp.status === 200) {
                props.setComments(props.comments.filter(a => a.id !== comm))

            }
        }
        catch (error) {
            console.log(error);
            console.log("error. failed to delete the comment.");
        }
    }

    const updateDescription = async () => {
        try {
            const resp = await cardsAPI.updateDesc(description, context.keys, props.payload.id);
            if (resp.status === 200) {
                // update Card
                context.setCards(context.cards.map(card => card.id === props.payload.id ? resp.data : card))
            }
        }
        catch (error) {
            console.log(error);
            console.log("error. failed to change description.");
            // reset Description if delete is fail
            setDescription(props.payload.desc)
        }
        setToggleEditDescription(false)
    }



    return (
        <>
            <div className="card__section">
                <div className='card__section__headtitle'>
                    <div className='card__section__headtitle--maintitle'>
                        <i class="fa-solid fa-bars" fa-lg></i>
                        <h3 className='card__section__headtitle--title'>
                            Descripción
                        </h3>
                    </div>
                    {/* Button change to text area and reset value of Desc when close with itself */}
                    <button type="button" className="card__section__headtitle--button options--button"
                        onClick={() => { setToggleEditDescription(!toggleEditDescription); setDescription(props.payload.desc) }}>
                        {toggleEditDescription ? "Cancelar" : props.payload.desc ? "Editar" : "Nuevo"}
                    </button>
                </div>

                {toggleEditDescription ?
                    <>
                        <div className="body__input--background" onClick={() => { setToggleEditDescription(false); setDescription(props.payload.desc) }}>
                        </div>
                        < div className='body__input--main'>
                            <textarea className="card__options--textarea" value={description} onChange={event => setDescription(event.target.value)}>
                            </textarea>
                            <button
                                className=" card__section__desc--button options--button"
                                onClick={updateDescription}
                            >
                                Save
                            </button>
                        </div>
                    </>
                    : <p className="card__section--desc">{description}</p>}
            </div>
            {/* render Checklists if exist*/}
            {!props.checkList.length
                ? null
                :
                props.checkList?.map((List, i) =>
                    <div className='card__section' key={i}>
                        <div className='card__section__headtitle'>
                            <div className='card__section__headtitle--maintitle'>
                                <i class="fa-regular fa-square-check fa-xl"></i>
                                <h3 className='card__section__headtitle--title'>
                                    {List.name}
                                </h3>
                            </div>
                            <button type="button" className="card__section__headtitle--button options--button"
                                onClick={() => {
                                    delCheckList(List.id);
                                }
                                }>
                                Eliminar
                            </button>
                        </div>
                        <Checklist 
                            checkList={props.checkList} 
                            idList={List.id}
                            setCheckList={props.setCheckList} 
                            />
                    </div>)}


            <div className="card__section">
                <div className='card__section__headtitle'>
                    <h3 className='card__section__headtitle--title'>
                        Comentarios
                    </h3>
                    {/* setNewComment reset content when close with button*/}
                    <button type="button" className="card__section__headtitle--button options--button"
                        onClick={() => { 
                            setToggleNewComm(!toggleNewComment); 
                            setNewComment("") }}>
                        {toggleNewComment ? "Cancelar" : "Nuevo"}
                    </button>
                </div>
                        
                {toggleNewComment ? <>
                    <textarea className="card__options--textarea" placeholder="Escriba un comentario..." onChange={event => setNewComment(event.target.value)}
                    >
                    </textarea>
                    <button type="button" className="card__section__comm--button options--button"
                        onClick={async () => {
                            let resp = await cardsAPI.newComment(newComment, context.keys, props.payload.id);
                            props.setComments([...props.comments, resp.data]);
                            setToggleNewComm(!toggleNewComment);
                            setNewComment("")
                        }}
                    >
                        Save
                    </button>
                </>
                    : null
                }
                {toggleDelete &&
                    <WarningAdvise
                        title={"Delete comment? "}
                        text={"Deleting a comment is forever. There is no undo."}
                    setToggle={setToggleDelete}
                        onClick={delComment}
                        content={toggleDelete}
                    />
                }
                <div className="card__comments__list">
                    {props.comments?.map((a, i) =>
                        <div className='card__comment' key={i}>
                            <div className='card__comments__head'>
                                <p className='card__comments card__comments--name'>{a.memberCreator.fullName}</p>
                                <p className='card__comments card__comments--date'>{a.date.slice(0, 10)}</p>
                            </div>
                            <input type="text" className="card__section__comm--text" value={a.data.text} readOnly />
                            <div className='card__comments__options'>
                                    <a className='card__comments__options--delete'
                                        onClick={() => setToggleDelete(a.id)} >
                                        Delete
                                     </a>
                                
                            </div>
                        </div>
                    )
                    }
                </div>
            </div>
        </>
    )
}
export default BodyCard