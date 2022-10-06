import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const DeleteContact = (props) => {
  const { contacts, setContacts } = props;
  const navigate = useNavigate();
  const { id } = useParams();

  const contact = contacts.filter((element) => {
    return element.id === parseInt(id);
  });

  const handleEvent = () => {
    fetch("http://localhost:4000/contacts/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        const newContacts = contacts.filter((element) => {
          return element.id !== parseInt(id);
        });
        navigate("/");
        setContacts(newContacts);
      });
  };

  return (
    <>
      <h2>
        Do you want to delete {contact[0].firstName} {contact[0].lastName}?
      </h2>
      <button className="delete-button" onClick={() => handleEvent()}>
        Yes
      </button>
      <button className="delete-button" onClick={() => navigate("/")}>
        no
      </button>
    </>
  );
};

export default DeleteContact;
