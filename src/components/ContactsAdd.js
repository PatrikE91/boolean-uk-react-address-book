import { useState } from "react"
import { useNavigate } from "react-router-dom";

function ContactsAdd(props) {

  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  const { setContacts, contacts } = props
  const url = 'http://localhost:4000/contacts'

  //TODO: Implement controlled form
  //send POST to json server on form submit
  const onSubmitt = (e) => {
    e.preventDefault()
    console.log(e)
    fetch(url, {
   method: 'POST',
   headers: {
       'Content-Type': 'application/json'
   },
   body: JSON.stringify({
    contacts 
   })
})

  }
  return (
    <form className="form-stack contact-form" onSubmit={onSubmitt}>
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
    
      <input id="firstName" name="firstName" type="text" required onChange={e => setContacts({...contacts, firstName: e.target.value})}/>

      <label htmlFor="lastName">Last Name:</label>
      <input id="lastName" name="lastName" type="text" required onChange={e => setContacts({...contacts, lastName: e.target.value})}/>

      <label htmlFor="street">Street:</label>
      <input id="street" name="street" type="text" required onChange={e => setContacts({...contacts, street: e.target.value})}/>

      <label htmlFor="city">City:</label>
      <input id="city" name="city" type="text" required onChange={e => setContacts({...contacts, city: e.target.value})}/>

      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  )
}

export default ContactsAdd
