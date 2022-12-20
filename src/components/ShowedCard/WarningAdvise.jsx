import "../../assets/css/Card/WarningAdvise.css";
const WarningAdvise= (props)=>{

    return( 
        <>
            <div className="modal__warning__background" onClick={() => props.setToggle(false)}>
            </div>    
            <div className="modal__warning__main">
                    <div className="modal__warning__main--titlehead">
                        <span className="modal__warning__main--title">{props.title}</span>
                        <span className="modal__warning__main--X"><i className="fa-duotone fa-x" onClick={() => props.setToggle(false)}></i></span>
                    </div>
                <div className="modal__warning__main--section ">
                    <p className="modal__warning__section--text " >{props.text}</p>
                    <button type="button" className="modal__warning__deleteBttn " onClick={() => {
                            props.onClick(props.content);
                            props.setToggle(false); 
                        }}>
                        Delete
                    </button>
                </div>

            </div>
        </>

        

    )

}

export default WarningAdvise