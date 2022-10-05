import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Meetings from "./Meetings";

function ContactsView() {
  const [contact, setContact] = useState(false);
  const { id } = useParams();
  //TODO: Get the contact to load from the params and fetch.
  //With useEffect, load the contact when params changes
  //and update contact state

  useEffect(() => {
    fetch(`http://localhost:4000/contacts/` + id)
      .then((res) => res.json())
      .then((data) => {
        setContact(data);
      });
  }, []);

  if (!contact) {
    return (
      <>
        <p>Loading</p>
        <div className="spinner">You spin me right 'round...</div>
      </>
    );
  }

  return (
    <>
    <div>
      <h2>
        {contact.firstName} {contact.lastName}
      </h2>
      <p>
        {contact.street} {contact.city}
      </p>
      <p>{contact.email}</p>
      <p>{contact.twitter}</p>
      <p>{contact.linkedIn}</p>
    </div>
    <h2>
      Meetings:
    </h2>
    
      {<Meetings contact={contact}/>}
      <button>Add Meeting</button>
    </>
  );
}

export default ContactsView;
