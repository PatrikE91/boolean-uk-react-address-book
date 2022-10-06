import { useState } from "react";
import { Link } from "react-router-dom";

function ContactsList(props) {
  //"contacts" must be passed as prop to this component
  const { contacts, setContacts } = props;
  const goldStar = "https://cdn-icons-png.flaticon.com/512/1828/1828614.png";
  const emptyStar = "https://cdn-icons-png.flaticon.com/512/1828/1828970.png";
  const url = "http://localhost:4000/contacts/";

  const changeFavorite = (contact) => {
    fetch(url + contact.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        favorite: !contact.favorite,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const newContacts = contacts.filter((element) => {
          return element.id !== contact.id;
        });
        window.location.reload(false);
        setContacts([...newContacts, data]);
      });
  };

  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
      <ul className="contacts-list">
        {contacts.map((contact, index) => {
          const { firstName, lastName } = contact;
          return (
            <li
              className={
                contact.type === "work" ? "contact work" : "contact personal"
              }
              key={index}
            >
              <p className="contact-name">
                {firstName} {lastName}
              </p>

              <img
                src={contact.favorite ? goldStar : emptyStar}
                className="star"
                alt=""
                onClick={() => changeFavorite(contact)}
              />

              <p>
                {/** TODO: Make a Link here to view contact */}
                <button className="button blue">
                  <Link to={`/contacts/${contact.id}`} state={contact}>
                    View
                  </Link>
                </button>
                <button className="button">
                  <Link to={`/contacts/${contact.id}/edit`} state={contact}>
                    Edit
                  </Link>
                </button>
                <button className="button delete">
                  <Link to={`/contacts/${contact.id}/delete`} state={contact}>
                    Delete
                  </Link>
                </button>
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ContactsList;
