import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import ContactsList from "./components/ContactsList";
import ContactsAdd from "./components/ContactsAdd";
import ContactsView from "./components/ContactsView";
import "./styles/styles.css";
import DeleteContact from "./components/DeleteContact";
import AddMeeting from "./components/AddMeeting";

export default function App() {
  const [contacts, setContacts] = useState([]);

  //TODO: Load all contacts on useEffect when component first renders

  const sortFavorites = () => {};

  const getData = () => {
    fetch(`http://localhost:4000/contacts`)
      .then((res) => res.json())
      .then((data) => {
        const trueFirst = data.sort(
          (a, b) => Number(b.favorite) - Number(a.favorite)
        );
        setContacts(trueFirst);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const filterBy = (filters) => {
    fetch(`http://localhost:4000/contacts`)
      .then((res) => res.json())
      .then((data) => {
        const newContacts = data.filter((contact) => {
          if (typeof filters === "string") {
            return contact.type === filters;
          } else {
            return contact.favorite;
          }
        });
        return setContacts(newContacts);
      });
  };
  const sortBy = (parameter) => {
    const compare = (a, b) => {
      let nameA;
      let nameB;
      if (parameter === "firstName") {
        nameA = a.firstName.toLowerCase();
        nameB = b.firstName.toLowerCase();
      }
      if (parameter === "lastName") {
        nameA = a.lastName.toLowerCase();
        nameB = b.lastName.toLowerCase();
      }
      return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
    };
    const sortedContacts = contacts.slice().sort(compare);
    setContacts(sortedContacts);
  };

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          {/* TODO: Make these links */}
          <li>
            <Link className="main-link" to="/">
              Contacts List
            </Link>
          </li>

          <li>
            <Link className="main-link" to="/contacts/add">
              Add New Contact
            </Link>
          </li>
        </ul>
        <h2>Filters:</h2>
        <ul>
          <li onClick={() => filterBy("personal")}>Personal</li>
          <li onClick={() => filterBy("work")}>Work</li>
          <li onClick={() => filterBy(true)}>Favorites</li>
          <li onClick={() => getData()}>All</li>
        </ul>
        <h2>Sort by:</h2>
        <ul>
          <li onClick={() => sortBy("firstName")}>Name</li>
          <li onClick={() => sortBy("lastName")}>Surname</li>
        </ul>
      </nav>
      <main>
        <Routes>
          {/* TODO: Add routes here  */}
          <Route
            path="/"
            element={
              <ContactsList contacts={contacts} setContacts={setContacts} />
            }
          />
          <Route
            exact
            path="/contacts/add"
            element={
              <ContactsAdd contacts={contacts} setContacts={setContacts} />
            }
          />

          <Route
            exact
            path="/contacts/:id/edit"
            element={
              <ContactsAdd contacts={contacts} setContacts={setContacts} />
            }
          />
          <Route path="/contacts/:id" element={<ContactsView />} />
          <Route
            path="/contacts/:id/delete"
            element={
              <DeleteContact contacts={contacts} setContacts={setContacts} />
            }
          />
          <Route path="/contacts/:id/meeting" element={<AddMeeting />} />
        </Routes>
      </main>
    </>
  );
}
