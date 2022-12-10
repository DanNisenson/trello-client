// checklist.
//     get checklist

//         get checkitems from a checklist: 'https://api.trello.com/1/checklists/{id}/checkItems?key=APIKey&token=APIToken'
//         create checkI from checkList: 'https://api.trello.com/1/checklists/{id}/checkItems?name={name}&key=APIKey&   token=APIToken'  (&pos=top) POST
//         Delete Checkitem from Checklist 'https://api.trello.com/1/checklists/{id}/checkItems/{idCheckItem}?key=APIKey&token=APIToken' DELETE
//         modificar nombre, pos, y state(complete / incomplete): 'https://api.trello.com/1/cards/{id}/checkItem/{idCheckItem}?key=APIKey&token=APIToken' PUT

//     create checklist 
//         'https://api.trello.com/1/checklists/{id}/checkItems/{idCheckItem}?key=APIKey&token=APIToken'  (&name=xx) POST

//     eliminar checklist
//         'https://api.trello.com/1/checklists/{id}?key=APIKey&token=APIToken' DELETE
 
//     modificar checklist  // solo tienen posicion y nombre
//         `https://api.trello.com/1/checklists/{id}/{field}?value={value}&key=APIKey&token=APIToken` PUT
// Descripcion
//     modificar descripcion.
//         'https://api.trello.com/1/cards/{id}?desc=${texto}&key=APIKey&token=APIToken' PUT
// Get a Card INFO relevant.
//          'https://api.trello.com/1/cards/{id}?fields=desc,name,idChecklist&key=APIKey&token=APIToken'
// Comentarios. 
//     añadir commentario. 
//         'https://api.trello.com/1/cards/{id}/actions/comments?text={text}&key=APIKey&token=APIToken'
//             POST
//     conseguir comentarios.
//          `https://api.trello.com/1/cards/${payload.id}//actions?filter=commentCard&key=${context.keys.apiKey}&token=${context.keys.token}`
    
import axios from "axios";



const changeDesc= async (desc, id, context) =>
    await axios.put(`https://api.trello.com/1/cards/${id}?desc=${desc}&key=${context.keys.apiKey}&token=${context.keys.token}`)

const updateDesc= async (id, context) =>{
    const resp = await axios.get(`https://api.trello.com/1/cards/${id}?key=${context.keys.apiKey}&token=${context.keys.token}`);
    console.log(resp.data)
    return resp.data;
}

const getComments =(id,context) => {
    return(
        `https://api.trello.com/1/cards/${id}//actions?filter=commentCard&key=${context.keys.apiKey}&token=${context.keys.token}`
    );
    }
const newComment= async(text, id, context) => {
    const resp = await axios.post(`https://api.trello.com/1/cards/${id}/actions/comments?text=${text}&key=${context.keys.apiKey}&token=${context.keys.token}`);
    console.log(resp.data)
}
const delComment= async(id,context) =>{
    const resp = await axios.delete(`https://api.trello.com/1/actions/${id}?key=${context.keys.apiKey}&token=${context.keys.token}`);
    console.log(resp)
}

const getChecklist=(id,context)=> {
   return(`https://api.trello.com/1/cards/${id}/checklists?key=${context.keys.apiKey}&token=${context.keys.token}`);
}

const delList= async (id,context) =>{
   await axios.delete(`https://api.trello.com/1/checklists/${id}?key=${context.keys.apiKey}&token=${context.keys.token}`)
}

const newList= async(id, desc, context) => {
    const resp= await axios.post(`https://api.trello.com/1/cards/${id}/checklists?name=${desc}&pos=bottom&key=${context.keys.apiKey}&token=${context.keys.token}`)
    console.log(resp)
}


const CardCallings={
    changeDesc,
    updateDesc,
    getComments,
    newComment,
    delComment,
    getChecklist,
    delList,
    newList,
}

export default CardCallings