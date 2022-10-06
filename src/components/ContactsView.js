import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Meetings from "./Meetings";

function ContactsView() {
  const [contact, setContact] = useState(false);
  const [meetings, setMeetings] = useState("");
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

  useEffect(() => {
    fetch(`http://localhost:4000/meetings?contactId=` + id)
      .then((res) => res.json())
      .then((data) => {
        setMeetings(data);
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
      <h2>Meetings:</h2>
      {<Meetings meetings={meetings} />}
      <button className="button blue">
        <Link to={`/contacts/${contact.id}/meeting`} state={contact}>
          Add Meeting
        </Link>
      </button>
    </>
  );
}

export default ContactsView;
