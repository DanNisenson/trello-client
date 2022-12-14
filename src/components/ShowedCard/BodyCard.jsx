import { useState } from 'react'
import { useAppContext } from "../../context/context";
import Checklist from './Checklist';
import cardsAPI from "../../services/cardsAPI";
import WarningAdvise from './WarningAdvise';
import SelectDate from './SelectDate';
import "../../assets/css/Card/BodyCard.css";

const BodyCard = (props) => {
    const context = useAppContext();
    const [description, setDescription] = useState(props.payload.desc)
    const [toggleEditDescription, setToggleEditDescription] = useState(false)
    const [toggleNewComment, setToggleNewComm] = useState(false)
    const [newComment, setNewComment] = useState("")
    const [toggleDelete, setToggleDelete]=useState(false)


    const finishDate = new Date(props.payload.due)
    let date = (props.payload.due=== null) ? null :
        {
        day: finishDate.getDate(), 
        month: finishDate.toLocaleString("en-GB",  {month: "short"}),
        hours: finishDate.toLocaleString("en-GB", { hour: "2-digit" }), 
        minutes: ('0' + finishDate.getMinutes()).slice(-2)
    }

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
                // update Card in current Card and context
                context.setCards(context.cards.map(card => card.id === props.payload.id ? resp.data : card))
                props.setCurrentCard(resp.data)
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
            {/* date */}
            <SelectDate 
                date={date} 
                id={props.payload.id}
                setCurrentCard={props.setCurrentCard}/>

            <div className="card__section">
                <div className='card__section__headtitle'>
                    <div className='card__section__headtitle--maintitle'>
                        <i className="fa-solid fa-bars fa-lg" ></i>
                        <h3 className='card__section__headtitle--title'>
                            Description
                        </h3>
                    </div>
                    {/* Button change to text area and reset value of Desc when close with itself */}
                    <button type="button" className="card__section__headtitle--button options--button"
                        onClick={() => { 
                            setToggleEditDescription(!toggleEditDescription);
                            setDescription(props.payload.desc) }}>
                        {toggleEditDescription ? "Cancelar" : props.payload.desc ? "Edit" : "New"}
                    </button>
                </div>

                {toggleEditDescription ?
                    <>
                        <div className="body__input--background" onClick={() => { setToggleEditDescription(false); setDescription(props.payload.desc) }}>
                        </div>
                        < div className='body__input--main'>
                            <textarea className="card__options--textarea" autoFocus
                                value={description} 
                                onChange={event => setDescription(event.target.value)}>
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
                props.checkList?.map((List) =>
                    <div className='card__section' key={List.id}>
                        <div className='card__section__headtitle'>
                            <div className='card__section__headtitle--maintitle'>
                                <i className="fa-regular fa-square-check fa-xl"></i>
                                <h3 className='card__section__headtitle--title'>
                                    {List.name}
                                </h3>
                            </div>
                            <button type="button" className="card__section__headtitle--button options--button"
                                onClick={() => {
                                    delCheckList(List.id);
                                }
                                }>
                                Delete
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
                    <div className='card__section__headtitle--maintitle'>
                        <i class="fa-solid fa-bars-staggered fa-xl"></i>
                        <h3 className='card__section__headtitle--title'>
                            Comments
                        </h3>
                    </div>
                    {/* setNewComment reset content when close with button*/}
                    <button type="button" className="card__section__headtitle--button options--button"
                        onClick={() => { 
                            setToggleNewComm(!toggleNewComment); 
                            setNewComment("") }}>
                        {toggleNewComment ? "Cancel" : "New"}
                    </button>
                </div>
                        
                {toggleNewComment ? <>
                    <textarea className="card__options--textarea" placeholder="Write a comment..." autoFocus
                        onChange={event => 
                        setNewComment(event.target.value)}
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
                    {props.comments?.map((a) =>
                        <div className='card__comment' key={a.id}>
                            <div className='card__comments--icon'><i className="fa-sharp fa-solid fa-circle-user fa-2xl"></i></div> 
                            <div className='card__comments__main'>
                                <div className='card__comments__head'>
                                    <p className='card__comments card__comments--name'>{a.memberCreator.fullName}</p>
                                    <p className='card__comments card__comments--date'>
                                        {a.date.slice(0, 10)}
                                        {"  "+ a.date.slice(11, 16)}
                                    </p>
                                </div>
                                <input type="text" className="card__section__comm--text" value={a.data.text} readOnly />
                                <div className='card__comments__options'>
                                        <a className='card__comments__options--delete'
                                            onClick={() => setToggleDelete(a.id)} >
                                            Delete
                                        </a>
                                    
                                </div>
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