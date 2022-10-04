import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ContactsView() {
  const [contact, setContact] = useState(false);
  const { id } = useParams();
  //TODO: Get the contact to load from the params and fetch.
  //With useEffect, load the contact when params changes
  //and update contact state
  console.log("view", id);
  // if (!contact) {
  //   return <p>Loading</p>;
  // }
  useEffect(() => {
    fetch(`http://localhost:4000/contacts/`+ id)
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        setContact(data);

      });
  }, []);

  return (
    <div>
      <h2>
        {contact.firstName} {contact.lastName}
      </h2>
      <p>
        {contact.street} {contact.city}
      </p>
      <p>
        {contact.email}
      </p>
      <p>
        {contact.twitter}
      </p>
      <p>
        {contact.linkedIn}
      </p>
    </div>
  );
}

export default ContactsView;
