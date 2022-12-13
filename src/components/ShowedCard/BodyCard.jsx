import { useState} from 'react'
import { useAppContext } from "../../context/context";
import Checklist from './Checklist';
import cardsAPI from "../../services/cardsAPI";
import "../../assets/css/Card/BodyCard.css";

const BodyCard = (props) => {
    const context = useAppContext();
    const [desc, setDesc] = useState(props.payload.desc)
    const [editDesc, setEditDesc] = useState(false)
    const [editComm, setEditComm] = useState(false)
    const [newComm, setNewComm] = useState("")

    const delCheckL = async (List) => {
        try{
            const resp= await cardsAPI.delCheckL(context.keys, List);
            if (resp.status === 200) {
                console.log(resp.data)
                props.delCheckL(props.checkL.filter(a => a.id !== List))
            }
        }
        catch (error) {
                console.log(error);
                console.log("error. failed to delete Checklist.");
            }
    }

    const delComm = async (comm) => {
        try {
            const resp = await cardsAPI.delComm(context.keys, comm);
            if (resp.status === 200) {
                console.log(resp.data)
                props.getComments(props.comments.filter(a => a.id !== comm) )
               
            }
        }
        catch (error) {
            console.log(error);
            console.log("error. failed to delete the comment.");
        }
    }

    const updateDesc = async () => {
        try {
            const resp = await cardsAPI.updateDesc(desc ,context.keys, props.payload.id);
            if (resp.status === 200) {
                console.log(resp.data)
                await props.setDesc(resp.data)
            }
        }
        catch (error) {
            console.log(error);
            console.log("error. failed to change description.");
        }
        setEditDesc(false)
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
                        <button type="button" className="card__section__headtitle--button options--button"
                            onClick={() => { setEditDesc(!editDesc); setDesc(props.payload.desc) }}>
                            {editDesc ? "Cancelar" : props.payload.desc ? "Editar" : "Nuevo"}
                        </button>
                    </div>

                {editDesc ?
                    <div>
                        <textarea className="card__options--textarea" value={desc} onChange={event => setDesc(event.target.value)}>
                        </textarea>
                        <button
                            className=" card__section__desc--button options--button"
                            onClick={updateDesc}
                        >
                            Save
                        </button>
                    </div>
                    : <p className="card__section--desc">{desc}</p>}
            </div>
            {props.checkL.length === 0 
            ? null 
                :
                    props.checkL?.map((List,i) => 
                        <div className='card__section' key={i}>
                            <div className='card__section__headtitle'>
                                <div className='card__section__headtitle--maintitle'> 
                                    <i class="fa-regular fa-square-check fa-xl"></i>
                                    <h3 className='card__section__headtitle--title'>                               
                                        {List.name}
                                    </h3>
                                </div>
                                <button type="button" className="card__section__headtitle--button options--button"
                                    onClick={()=>{ delCheckL(List.id);
                                    
                                    }
                                    }>
                                    Eliminar
                                </button>
                            </div>
                            <Checklist items={List.checkItems} idList={List.id}/>
                        </div>)}
                
            
            <div className="card__section">
                <div className='card__section__headtitle'>
                    <h3 className='card__section__headtitle--title'>
                        Comentarios
                    </h3>
                    <button type="button" className="card__section__headtitle--button options--button"
                        onClick={() => { setEditComm(!editComm); setNewComm("") }}>
                        {editComm ? "Cancelar" : "Nuevo"}
                    </button>
                </div>

                {editComm ? <>
                    <textarea className="card__options--textarea" placeholder="Escriba un comentario..." onChange={event => setNewComm(event.target.value)}
                    >
                    </textarea>
                    <button type="button" className="card__section__comm--button options--button"
                        onClick={async () => {
                            let resp= await cardsAPI.newComment(newComm, context.keys, props.payload.id);
                            props.getComments([...props.comments, resp.data]);
                            setEditComm(!editComm);
                            setNewComm("")
                        }}
                    >
                        Save
                    </button>
                </>
                    : null
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
                                    onClick={()=> delComm(a.id)} >
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