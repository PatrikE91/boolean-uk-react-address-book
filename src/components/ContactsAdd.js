import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ContactsAdd(props) {
  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  const { setContacts, contacts } = props;

  const navigate = useNavigate();
  const { id } = useParams();
  const url = "http://localhost:4000/contacts/";
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

  const contact = contacts.filter((element) => {
    return element.id === parseInt(id);
  });
  const [editContact, setEditContact] = useState([contact]);
  //TODO: Implement controlled form
  //send POST to json server on form submit
  const onSubmitEvent = (e) => {
    e.preventDefault();

    if (contact.length) {
      fetch(url + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: editContact.firstName,
          lastName: editContact.lastName,
          type: editContact.type,
          street: editContact.street,
          city: editContact.city,
          email: editContact.email,
          linkedIn: editContact.linkedIn,
          twitter: editContact.twitter,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(editContact);
          const newContacts = contacts.filter((element) => {
            return element.id !== parseInt(id);
          });
          setContacts([...newContacts, data]);
          navigate("/");
        });
    } else {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: "",
          firstName: newContact.firstName,
          lastName: newContact.lastName,
          type: newContact.type,
          street: newContact.street,
          city: newContact.city,
          email: newContact.email,
          linkedIn: newContact.linkedIn,
          twitter: newContact.twitter,
          favorite: false,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setContacts([...contacts, data]);
          navigate("/");
        });
    }
  };
  return (
    <form className="form-stack contact-form" onSubmit={onSubmitEvent}>
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name:</label>

      <input
        name="firstName"
        type="text"
        defaultValue={contact.length ? contact[0].firstName : null}
        required
        onChange={(e) => {
          contact.length
            ? setEditContact({ ...editContact, firstName: e.target.value })
            : setNewContact({ ...newContact, firstName: e.target.value });
        }}
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        defaultValue={contact.length ? contact[0].lastName : null}
        required
        onChange={(e) => {
          contact.length
            ? setEditContact({ ...editContact, lastName: e.target.value })
            : setNewContact({ ...newContact, lastName: e.target.value });
        }}
      />

      <label htmlFor="type">Type:</label>
      <div className="radio">
        <p>Personal</p>
        <input
          required
          name="type"
          type="radio"
          value="personal"
          onClick={(e) => {
            contact.length
              ? setEditContact({ ...editContact, type: e.target.value })
              : setNewContact({ ...newContact, type: e.target.value });
          }}
        />
        <p>Work</p>
        <input
          required
          name="type"
          type="radio"
          value="work"
          onClick={(e) => {
            contact.length
              ? setEditContact({ ...editContact, type: e.target.value })
              : setNewContact({ ...newContact, type: e.target.value });
          }}
        />
      </div>

      <label htmlFor="street">Street:</label>
      <input
        id="street"
        name="street"
        type="text"
        defaultValue={contact.length ? contact[0].street : null}
        required
        onChange={(e) => {
          contact.length
            ? setEditContact({ ...editContact, street: e.target.value })
            : setNewContact({ ...newContact, street: e.target.value });
        }}
      />

      <label htmlFor="city">City:</label>
      <input
        id="city"
        name="city"
        type="text"
        defaultValue={contact.length ? contact[0].city : null}
        required
        onChange={(e) => {
          contact.length
            ? setEditContact({ ...editContact, city: e.target.value })
            : setNewContact({ ...newContact, city: e.target.value });
        }}
      />

      <label htmlFor="email">Email:</label>
      <input
        id="email"
        name="email"
        type="text"
        defaultValue={contact.length ? contact[0].email : null}
        onChange={(e) => {
          contact.length
            ? setEditContact({ ...editContact, email: e.target.value })
            : setNewContact({ ...newContact, email: e.target.value });
        }}
      />

      <label htmlFor="linkedIn">LinkedIn:</label>
      <input
        id="linkedIn"
        name="linkedIn"
        type="text"
        defaultValue={contact.length ? contact[0].linkedIn : null}
        onChange={(e) => {
          contact.length
            ? setEditContact({ ...editContact, linkedIn: e.target.value })
            : setNewContact({ ...newContact, linkedIn: e.target.value });
        }}
      />

      <label htmlFor="twitter">Twitter:</label>
      <input
        id="twitter"
        name="twitter"
        type="text"
        defaultValue={contact.length ? contact[0].twitter : null}
        onChange={(e) => {
          contact.length
            ? setEditContact({ ...editContact, twitter: e.target.value })
            : setNewContact({ ...newContact, twitter: e.target.value });
        }}
      />

      <div className="actions-section">
        <button className="button blue" onClick={() => navigate("/")}>
          Back
        </button>
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  );
}

export default ContactsAdd;
