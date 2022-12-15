import { useState } from "react";
import { useAppContext } from "../../context/context";
import cardsAPI from "../../services/cardsAPI";
import "../../assets/css/Card/Checklist.css";


const Checklist= (props) => {
    const [toggleNewItem, setToggleNewItem]=useState(false)
    const [newItem, setNewItem]= useState("")
    const context= useAppContext();
    let thisList = props.checkList.filter(list => list.id === props.idList)
    let items= props.checkList.map(list => list.id === props.idList ? list.checkItems : null)


    const changeCheckBox = async (id) =>{
        let actualItem= items[0].filter(item=> item.id === id)
        if(actualItem[0].state === "complete"){
            try {
                const resp = await cardsAPI.updateCheckItem("incomplete", context.keys, thisList[0].idCard, id);
                if (resp.status === 200) {
                    console.log(resp.data)
                    actualItem= {...actualItem[0], state: "incomplete"}
                    const thisItems = thisList[0].checkItems.map(item => item.id === actualItem.id ? actualItem : item )
                    const newList= {...thisList[0], checkItems: thisItems }
                    props.setCheckList(props.checkList.map(Cl=> Cl.id=== props.idList ? newList : Cl))
                }
            }
            catch (error) {
                console.log(error.message);
                alert("Unable to update Checklist");
            }
        } 
        else if (actualItem[0].state === "incomplete"){
            try {
                const resp = await cardsAPI.updateCheckItem("complete", context.keys, thisList[0].idCard, id);
                if (resp.status === 200) {
                    actualItem = resp.data 
                    const thisItems = thisList[0].checkItems.map(item => item.id === actualItem.id ? actualItem : item)
                    const newList = { ...thisList[0], checkItems: thisItems }
                    props.setCheckList(props.checkList.map(Cl => Cl.id === props.idList ? newList : Cl))
                }
            }
            catch (error) {
                console.log(error.message);
                alert("Unable to update Checklist");
            }

        }
        
    }

    const deleteItem= async (id)=> {
        try {
            const resp = await cardsAPI.deleteCheckItem(context.keys, thisList[0].idCard, id );
            if (resp.status === 200) {
                console.log(resp.data)
                const thisItems = thisList[0].checkItems.filter(item => item.id !== id)
                const newList = { ...thisList[0], checkItems: thisItems }
                props.setCheckList(props.checkList.map(Cl => Cl.id === props.idList ? newList : Cl))
            }
        }
        catch (error) {
            console.log(error.message);
            alert("Unable to delete the CheckItem");
        }
    }

    const newCheckItem= async()=> {
        try {
            const resp = await cardsAPI.newCheckItem(newItem, context.keys, props.idList);
            if (resp.status === 200) {
                const newList = { ...thisList[0], checkItems: [...thisList[0].checkItems, resp.data] }
                props.setCheckList(props.checkList.map(Cl => Cl.id === props.idList ? newList : Cl))
                setToggleNewItem(false)
            }
        }
        catch (error) {
            console.log(error.message);
            alert("Unable to post CheckItem");
        }

    }


    return(
        <div className="card__section__checklist--list checklist__list">
            {items[0]?.map((a)=> 
                <div className=" checklist__list__item" > 
                    <div className="checklist__list__item--main">
                        <div className="checklist__list__item--checkbox " onClick={() => changeCheckBox(a.id)}>
                            {a.state === "complete" ? <i class="fa-solid fa-square-check fa-xl"></i> : <i class="fa-regular fa-square fa-xl" ></i>}
                        </div>
                        <p className="checklist__list__item--name">{a.name}</p>
                    </div>
                    <div className="checklist__list__item--edit " onClick={() => deleteItem(a.id)}>
                        <i class="fa-sharp fa-solid fa-trash"></i>
                    </div>
                </div>
            ) }
            {toggleNewItem ?
                 <>
                    <textarea className="card__options--textarea" placeholder="Add an element" onChange={event => setNewItem(event.target.value)}
                    >
                    </textarea>
                    <div>
                        <button type="button" className="card__section__checklist--savebutton options--button" onClick={() => newCheckItem()}>
                        Save
                    </button>
                        <button type="button" className="card__section__checklist--button options--button" onClick={() => {setToggleNewItem(false); setNewItem("")} }>
                        Cancel
                    </button>
                    </div>
                </>
                :
                <button type="button" className="card__section__checklist--button options--button" onClick={() => setToggleNewItem(true)}>
                        Add an element
                </button>
                
            }

        </div>

    )

}

export default Checklist
