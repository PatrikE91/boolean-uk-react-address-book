import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function ContactsList(props) {
  //"contacts" must be passed as prop to this component
  const { contacts } = props;

  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
      <ul className="contacts-list">
        {contacts.map((contact, index) => {
          const { firstName, lastName } = contact;
          return (
            <li className="contact" key={index}>
              <p>
                {firstName} {lastName}
              </p>
              <p>
                {/** TODO: Make a Link here to view contact */}
                <button className="button blue">
                  <Link to={`/contacts/${contact.id}`} state={contact}>
                    View
                  </Link>
                </button>
                <button className="button">
                  <Link
                    
                    to={`/contacts/${contact.id}/edit`}
                    state={contact}
                  >
                    Edit
                  </Link>
                </button>
                <button className="button">
                  <Link to={`/contacts/${contact.id}/delete`} state={contact}>Delete</Link>
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
