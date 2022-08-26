import React, { useState, useEffect, useRef} from 'react'
import List from './List'
import Alert from './Alert'

function getLocalStorage(){
  let list = localStorage.getItem('list')
  if(list){
    return (list = JSON.parse(localStorage.getItem('list')))
  }
  else{
    return []
  }
}

function App() {

const [name,setName] = useState("")
const [isEditing, setIsEditing] = useState(false)
const [editID, setEditID] = useState(null)
const [alert, setAlert] = useState(
  {
    show: false,
    type:'',
    msg:'',
  }
)
const [lists, setLists] = useState(getLocalStorage())
const inputRef = useRef(null)


function handleSubmit(e){
  e.preventDefault()
  if(!name) {
    //Show Alert message as "enter value"
    showAlert(true,'danger','please enter value')
  }
  else if(name && isEditing){//this condition is when the function editItem is going and after the edit button is clicked, the list is updated 
    //Show Alert message as "edit is going on"
   setLists(
    lists.map((item)=>{
      if(item.id === editID){
        return {...item, title:name}
      }
      return item
    })
   )
    setName("")
    setEditID("null")
    setIsEditing(false)
    showAlert(true,'success','value changed')
  }
  else{
    showAlert(true,'success','item added to the list')
    const newItem = {id: new Date().getTime().toString(), title:inputRef.current.value}
    setLists(oldArray => [...oldArray,newItem])
    setName("")
  }
}

function showAlert(show=false,type='',msg = ''){
  setAlert({show,type,msg})
} 

function removeItem(id){
  showAlert(true,'danger','item removed')
  const thrashArray = lists.filter((item) => { return item.id !== id })
  setLists(thrashArray)
}
//editItem is the function is when the button edit is clicked
function editItem(id){
  const specificItem = lists.find((item)=>{return item.id === id})
  setIsEditing(true)
  setEditID(id)
  setName(specificItem.title)
}

function handleClear(){
  showAlert(true,'danger','empty list')
  setLists([])
}

//Localstorage is updated everytime the list state change.
useEffect(()=>{
  localStorage.setItem('list',JSON.stringify(lists))
},[lists])

  return (
    <section className='section-center'>
    <div className='grocery-form'>
      {alert.show && <Alert {...alert} removeAlert={showAlert} list={lists}/>}

      <h3>Grocery Bud</h3>
      <div className='form-control'>
        <input className='grocery' value={name} onChange={(e)=>setName(e.target.value)} type="text" ref={inputRef} placeholder = "e.g eggs"/>
        <button className='submit-btn' type="submit" onClick={handleSubmit}>{isEditing ? "Edit": "Submit"}</button>
      </div>
      </div>

     {lists.length > 0 && (
     <div className='grocery-container'>
        <List items={lists} removeItem={removeItem} editItem={editItem} />
        <button className='clear-btn' onClick={handleClear}>Clear Items</button>
      </div>
      )} 
    </section>
  
  )
}

export default App


// Tips:
// 1-Create a form with submit, placeholder and button to "clear items"
// 2-Create a state to receive the name of the form and a list state to receive the list of all name
// 3-Create a function when we submit(condition for when no name is entered, when a name from the list is edited and  when a new name is added)
// 4-create a function to edit the name, delete the name
// 5- Create a function to remove the whole list
// 6- the list length should be >0 before we can see the list and the clear button 
// 7- Create an alert message for different purposes(for delete an item, for editing an item, aftr adding an item, when someone try to an empty name)
// 8- Do a localstorage so refresh page wont make the list disappear. 




//create a form with submit, placeholder "e.g eggs" - done
//create a state for the list - done
//Create an alert when you submit
// Create a state for the list of items added
//Create  "clear Items" to delete all the product - done
//Create an edit button for each item (maybe create a state)
//Create a delete button for each item (maybe create a  state)