import { useState } from "react";
import { useAppContext } from "../../context/context";
import cardsAPI from "../../services/cardsAPI";
import ReactDatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import "../../assets/css/Card/SelectDate.css";


const SelectDate= (props)=> {
    const context= useAppContext()
    const [toggleDate, setToggleDate]= useState(false)
    const [date, setDate]=useState(new Date())

    const updateDate= async (action)=>
        {
        try {
            const resp = (action=== "remove") ? 
                await cardsAPI.updateDue(null, context.keys, props.id) 
                : await cardsAPI.updateDue(date.toISOString(), context.keys, props.id)
            if (resp.status === 200) {
                // update Card in current Card and context
                const newCards = context.cards.map(card => card.id === props.id ? resp.data : card)
                context.setCards(newCards)
                props.setCurrentCard(resp.data)
            }
        }
        catch (error) {
            console.log(error);
            console.log("error. failed to update DueDate.");
        }
        setToggleDate(false)
    }
    

        
    return(
        // if Component is in AsideCard
        <>{props.header=== "aside" &&
            <div className="card__aside card__aside__options" onClick={()=> setToggleDate(!toggleDate)}>
                <i className="fa-solid fa-clock"></i>
                <span className=" card__aside__options--title" >Dates</span>
            </div>
            }
            {/* if Componente is in BodyCard and isn´t null or undefined */}
            {(props.date === undefined || props.date === null) ? null :
                <div className="card__section">
                    <div className="card__finishdate">
                        <div className="card__finishdate--title"> Due time</div>
                        <div className="card__finishdate--date" onClick={() => setToggleDate(!toggleDate)}>
                            <p>{`${props.date.day}-${props.date.month} at ${props.date.hours}:${props.date.minutes}`}  </p><i className="fa-solid fa-chevron-down"></i>
                        </div>
                    </div>
                </div>
            }
            {/* Modal Date Selection */}
            {toggleDate &&
            <>
                <div className="modal__dates__background" onClick={() => setToggleDate(false)} >
                </div>
                <div className="modal__dates__main">
                    <div className="modal__dates__main--titlehead">
                        <span className="modal__dates__main--title">Dates</span>
                        <span className="modal__dates__main--X" onClick={() => setToggleDate(false)}><i className="fa-duotone fa-x" ></i></span>
                    </div>
                
                    <div className="aside__new__modal--section modal__section__dates--calendar">
                        <ReactDatePicker 
                            selected={date}
                            onChange={(day) => setDate(day)} 
                            timeInputLabel="Time:"
                            dateFormat="MM/dd/yyyy h:mm aa"
                            showTimeInput
                            inline />  
                    </div>
                    <div className="modal__section__dates">
                        <p className="modal__section--title " >Due Date</p>
                        <div className="modal__section--main">
                            <input type="text" className="modal__section__dates--input" placeholder="D/M/YYYY" value={date.toLocaleDateString()} readOnly />
                            <input type="text" className="modal__section__dates--input" placeholder="HH/MM" value={date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} readOnly />
                        </div>
                    </div>

                    <button type="button" className="modal__dates__savebttn " onClick={() => updateDate()}>
                        Save
                    </button>
                    <button type="button" className="modal__dates__removebttn " onClick={() => updateDate("remove")}>
                        Remove
                    </button>
                </div>
            </>
            }
        </>

    )

}

export default SelectDate