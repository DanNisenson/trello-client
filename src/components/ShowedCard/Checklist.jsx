import { useAppContext } from "../../context/keys";
import CardCallings from './CardCallings';
const Checklist= (props) => {

    return(
        <div className="card__section__checklist--list checklist__list">
            {props.items?.map((a)=> 
                <div className=" checklist__list__item" > 
                    <input className="checklist__list__item--checkbox " type="checkbox" checked={a.state=== "complete" ? true : false}></input>
                    <p className="checklist__list__item--name">{a.name}</p>
                </div>
            ) }
        </div>

    )

}

export default Checklist
