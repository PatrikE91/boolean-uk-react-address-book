import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ContactsAdd(props) {
  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  const { setContacts, contacts } = props;
  const navigate = useNavigate();
  const url = "http://localhost:4000/contacts";
  console.log(contacts);
  const [newContact, setNewContact] = useState({
    id: "",
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    email: "",
    linkedIn: "",
    twitter: "",
  });

  //TODO: Implement controlled form
  //send POST to json server on form submit
  const onSubmitt = (e) => {
    e.preventDefault();
    console.log(newContact);

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: "",
        firstName: newContact.firstName,
        lastName: newContact.lastName,
        street: newContact.street,
        city: newContact.city,
        email: newContact.email,
        linkedIn: newContact.linkedIn,
        twitter: newContact.twitter
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setContacts([...contacts, data]);
        navigate("/");
        console.log("contacts", data);
      });
  };
  return (
    <form className="form-stack contact-form" onSubmit={onSubmitt}>
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>

      <input
        id="firstName"
        name="firstName"
        type="text"
        required
        onChange={(e) =>
          setNewContact({ ...newContact, firstName: e.target.value })
        }
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        required
        onChange={(e) =>
          setNewContact({ ...newContact, lastName: e.target.value })
        }
      />

      <label htmlFor="street">Street:</label>
      <input
        id="street"
        name="street"
        type="text"
        required
        onChange={(e) =>
          setNewContact({ ...newContact, street: e.target.value })
        }
      />

      <label htmlFor="city">City:</label>
      <input
        id="city"
        name="city"
        type="text"
        required
        onChange={(e) => setNewContact({ ...newContact, city: e.target.value })}
      />

      <label htmlFor="email">Email:</label>
      <input
        id="email"
        name="email"
        type="text"
        required
        onChange={(e) =>
          setNewContact({ ...newContact, email: e.target.value })
        }
      />

      <label htmlFor="linkedIn">LinkedIn:</label>
      <input
        id="linkedIn"
        name="linkedIn"
        type="text"
        required
        onChange={(e) =>
          setNewContact({ ...newContact, linkedIn: e.target.value })
        }
      />

      <label htmlFor="twitter">Twitter:</label>
      <input
        id="twitter"
        name="twitter"
        type="text"
        required
        onChange={(e) =>
          setNewContact({ ...newContact, twitter: e.target.value })
        }
      />

      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  );
}

export default ContactsAdd;
