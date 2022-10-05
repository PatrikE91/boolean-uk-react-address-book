import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import ContactsList from "./components/ContactsList";
import ContactsAdd from "./components/ContactsAdd";
import ContactsView from "./components/ContactsView";
import "./styles/styles.css";
import DeleteContact from "./components/DeleteContact";

export default function App() {
  const [contacts, setContacts] = useState([]);

  //TODO: Load all contacts on useEffect when component first renders

  const getData = () => {
    fetch(`http://localhost:4000/contacts`)
      .then((res) => res.json())
      .then((data) => setContacts(data));
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          {/* TODO: Make these links */}
          <li>
            <Link to="/">Contacts List</Link>
          </li>
            
          <li><Link to='/contacts/add'>Add New Contact</Link></li>
        </ul>
      </nav>
      <main>
        <Routes>
          {/* TODO: Add routes here  */}
          <Route path="/" element={<ContactsList contacts={contacts} />} />
          <Route exact path="/contacts/add" element={<ContactsAdd contacts={contacts} setContacts={setContacts}/>} />

          <Route exact path="/contacts/:id/edit" element={<ContactsAdd contacts={contacts} setContacts={setContacts}/>} />
          <Route path="/contacts/:id" element={<ContactsView />} />
          <Route path="/contacts/:id/delete" element={<DeleteContact contacts={contacts} setContacts={setContacts}/>} />
        </Routes>
      </main>
    </>
  );
}
