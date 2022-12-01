import { useState, useEffect } from 'react'
import axios from 'axios';
import { useAppContext } from "../../context/keys";

const BodyCard = (props)=> {
    const context = useAppContext();
   const payload= props.payload
   const [comments, setComments] = useState(null)

    

    useEffect(()=> {
        const getComments = async () => {
            const resp = await axios.get(
                `https://api.trello.com/1/cards/${payload.id}//actions?filter=commentCard&key=${context.keys.apiKey}&token=${context.keys.token}`
            );
            setComments(resp.data);
            console.log(resp.data);
        }
        getComments()
        }
        ,[])


    return (
        <>
        <div className="card__section">
            <span className='card__section__title'>Descripción</span><span className='options__element'>Editar</span>
            
            <p>{payload.desc ? payload.desc : ""}</p>
        </div>
        <div className="card__section">
                <p className="card__section__title">Comentarios</p>
                <textarea className="options__text" placeholder="Escriba un comentario..." ></textarea>

            <div className="card__comments">
                {comments?.map(a=>
                    <div key={a.data.id}>
                        <span>{a.memberCreator.fullName}</span>
                        <span>{a.date.slice(0,10)}</span>  
                        <textarea className="options__text" value={a.data.text} readOnly></textarea>
                        <div className='card__comments__options'>
                            <p className='options__element'>Modificar</p>
                            <p className='options__element'>Eliminar</p>
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