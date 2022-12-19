import "../../assets/css/Card/Members.css";

const Members = (props)=> {

    return(
        <>
            <div className="modal__members__background" onClick={() => props.setToggle(false)}>
            </div>    
            <div className="modal__members__main">
                    <div className="modal__members__main--titlehead">
                        <span className="modal__members__main--title">Members</span>
                        <span className="modal__members__main--X"><i className="fa-duotone fa-x" onClick={() => props.setToggle(false)}></i></span>
                    </div>
                <div className="aside__new__modal--section modal__section__members">
                    <p className="modal__section--title " >Board Members</p>
                    {props.members.map(member => 
                            <div className="modal__section__member" key={member.id}> 
                                <i className="fa-sharp fa-solid fa-circle-user fa-2xl"></i> 
                                <p className="modal__section__member--text">{`${member.fullName} (${member.username})`} </p>
                            </div>)}
                </div>
            </div>
        </>
    )
}

export default Members