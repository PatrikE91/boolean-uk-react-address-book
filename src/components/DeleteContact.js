import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const DeleteContact = (props) => {
  const { contact } = props;
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(contact);

  const handleEvent = () => {
      fetch("http://localhost:4000/contacts/" + id, {
        method: "DELETE",
      }).then(res = res.json())
      .then(data => {
        navigate('/')
      })

  }

  return (
    <>
      <h2>
        Do you want to delete {contact.firstName} {contact.lastName}?
      </h2>
      <button onClick={() => handleEvent()}>Yes</button>
      <button onClick={() => navigate('/')}>no</button>
    </>
  );
};

export default DeleteContact;
