import { useNavigate, useParams } from "react-router-dom";


const Meetings = (props) => {
  const { meetings } = props;
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("meeting", meetings);


  const handleEvent = (id) => {
    fetch("http://localhost:4000/meetings/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(data => {
        console.log("meeting", data);
        navigate('/')
      });
  };

  return (
    <ul>
      {meetings.length > 0 ? (
        meetings.map((meeting) => {
          return (
            <li key={meeting.id}>
              The {meeting.date}, at {meeting.time} in {meeting.location}
              <button onClick={(e) => handleEvent(meeting.id)} key={meeting.id}>Delete</button>
            </li>
          );
        })
      ) : (
        <li>No meetings</li>
      )}
    </ul>
  );
};

export default Meetings;
