import AsideCard from "./AsideCard";
import BodyCard from "./BodyCard";
const Card = (props) => {

    
    let current = props.currentCards?.filter(a => a.id === props.currentCard)

return(
    <div className="card__total">
        <div className="card__title">
            <h1>{current[0].name}</h1>
            <p className="XButton" onClick={()=>props.showCard(null)}>X</p>
        </div>
        <div className="card__main">
            <div className="card__body">
                <BodyCard payload={current[0]}/>
            </div>
            <div className="card__aside">
                <AsideCard/>
            </div>
        </div>

    </div>
)




}
export default Card