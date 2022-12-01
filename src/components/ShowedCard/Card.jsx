import AsideCard from "./AsideCard";
import BodyCard from "./BodyCard";
const Card = (props) => {

return(
    <div className="card__total">
        <div className="card__title">
            <h1>{props.currentCard.name}</h1>
            <p className="XButton" onClick={()=>props.showCard(null)}>X</p>
        </div>
        <div className="card__main">
            <div className="card__body">
                <BodyCard payload={props.currentCard}/>
            </div>
            <div className="card__aside">
                <AsideCard/>
            </div>
        </div>

    </div>
)




}
export default Card