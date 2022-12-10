import { useState, useEffect } from 'react'
import axios from 'axios';
import { useAppContext } from "../../context/context";
import Checklist from './Checklist';
import CardCallings from './CardCallings';

const BodyCard = (props) => {
    const context = useAppContext();
    const payload = props.payload
    const [desc, setDesc] = useState(payload.desc)
    const [editDesc, setEditDesc] = useState(false)
    const [editComm, setEditComm] = useState(false)
    const [newComm, setNewComm] = useState("")
    const [comments, setComments] = useState([])
    const [checkL, setCheckL] = useState(false)


    const getComments = async () => {
        const resp = await axios.get(CardCallings.getComments(payload.id, context)
        );
        setComments(resp.data);
    }
    const getChecklist = async ()=>{
        const resp = await axios.get(CardCallings.getChecklist(payload.id, context));
        setCheckL(resp.data);
        console.log(resp.data)
    }


        useEffect(() => {
            getComments()
            getChecklist()
        }
            , [])


    return (
        <>
            <div className="card__section">
                <span className='card__section__title'>
                    Descripción
                </span>
                <span className='options__element'
                    onClick={() => { setEditDesc(!editDesc); setDesc(payload.desc) }}>
                    {editDesc ? "Cancelar" : payload.desc ? "Editar" : "Nuevo"}
                </span>

                {editDesc ?
                    <div>
                        <textarea className="card__options--text" value={desc} onChange={event => setDesc(event.target.value)}>
                        </textarea>
                        <button
                            className="card__option--save"
                            onClick={() => { CardCallings.changeDesc(desc, payload.id, context); setEditDesc(!editDesc) }}
                        >
                            Save
                        </button>
                    </div>
                    : <p className="card__section card__section--desc">{desc}</p>}
            </div>
            <div className="card__section">
                <span className='card__section__title'>
                    Comentarios
                </span>
                <span className='options__element'
                    onClick={() => { setEditComm(!editComm); setNewComm("") }}>
                    {editComm ? "Cancelar" : "Nuevo"}
                </span>

                {editComm ? <>
                    <textarea className="card__options--text" placeholder="Escriba un comentario..." onChange={event => setNewComm(event.target.value)}
                    >
                    </textarea>
                    <button className="card__option--save"
                        onClick={async () => {
                            await CardCallings.newComment(newComm, payload.id, context);
                            getComments();
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
                    {comments?.map((a, i) =>
                        <div key={i}>
                            <div className='card__comments__head'>
                                <p className='card__comments card__comments--name'>{a.memberCreator.fullName}</p>
                                <p className='card__comments card__comments--date'>{a.date.slice(0, 10)}</p>
                            </div>
                            <textarea className="card__options--text" value={a.data.text} readOnly></textarea>
                            <div className='card__comments__options'>
                                <p className='options__element'
                                    onClick={async () => {
                                        await CardCallings.delComment(a.id, context);
                                        getComments()
                                    }} >
                                    Eliminar
                                </p>
                            </div>
                        </div>
                    )
                    }
                </div>
            </div>
            {checkL === false ?
                 "" 
                :
                <div className="card__section">
                    <p className='card__section__title'>
                        Checklists
                    </p>
                    {checkL?.map((List,i) => 
                        <div className='card__section__checklist' key={i}>
                            <div className='card__checklist__head'>
                                <p className='card__checklist__head card__checklist__head--name'>{List.name}</p>
                                <p className='options__element'
                                    onClick={async () => {
                                        await CardCallings.delList(List.id, context);
                                        getChecklist()
                                    }} >
                                    Eliminar
                                </p>
                                {/* <p className=''>{a.date.slice(0, 10)}</p> */}
                            </div>
                            <Checklist items={List.checkItems} idList={List.id}/>
                        </div>)}
                </div>
            }
        </>
    )
}
export default BodyCard