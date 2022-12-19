import { useAppContext } from "../../context/context";
import { useState,useEffect } from "react";
import cardsAPI from "../../services/cardsAPI";
import "../../assets/css/Card/Members.css";

const Members = (props)=> {
    const context= useAppContext()
    const [toggleMembers, setToggleMembers] = useState(false)
    const [members, setMembers] = useState([])


    useEffect(()=> {
            const getMembers = async () => {
                try {
                    const resp = await cardsAPI.getMembers(context.keys, props.currentCard.idBoard);
                    if (resp.status === 200) {
                        setMembers(resp.data);
                    }
                } catch (error) {
                    console.log(error);
                    console.log("error. failed to load data.");
                }
            };
            getMembers()} , [])

    return(
        <>
            <div className="card__aside card__aside__options" onClick={() => setToggleMembers(true)}>
                <i className="fa-solid fa-user"></i>
                <span className=" card__aside__options--title" >Members</span>
            </div>
            {toggleMembers && <>
            <div className="modal__members__background" onClick={() => setToggleMembers(false)}>
            </div>    
            <div className="modal__members__main">
                    <div className="modal__members__main--titlehead">
                        <span className="modal__members__main--title">Members</span>
                        <span className="modal__members__main--X"><i className="fa-duotone fa-x" onClick={() => setToggleMembers(false)}></i></span>
                    </div>
                <div className="aside__new__modal--section modal__section__members">
                    <p className="modal__section--title " >Board Members</p>
                    {members.map(member => 
                            <div className="modal__section__member" key={member.id}> 
                                <i className="fa-sharp fa-solid fa-circle-user fa-2xl"></i> 
                                <p className="modal__section__member--text">{`${member.fullName} (${member.username})`} </p>
                            </div>)}
                </div>
            </div> </>}
        </>
    )
}

export default Members