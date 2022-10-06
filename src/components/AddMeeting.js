import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddMeeting = () => {
  const [meeting, setMeeting] = useState({ date: "", time: "", location: "" });
  const navigate = useNavigate();
  const { id } = useParams();
  const url = "http://localhost:4000/meetings/";

  const onSubmitEvent = (e) => {
    e.preventDefault();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contactId: id,
        time: meeting.time,
        date: meeting.date,
        location: meeting.location,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        navigate("/");
        console.log("contacts", data);
        console.log("contacts", meeting);
      });
  };

  return (
    <form className="form-stack contact-form" onSubmit={onSubmitEvent}>
      <label htmlFor="date">Date:</label>
      <input
        name="date"
        type="text"
        required
        onChange={(e) => setMeeting({ ...meeting, date: e.target.value })}
      />

      <label htmlFor="time">Time:</label>
      <input
        name="time"
        type="text"
        required
        onChange={(e) => setMeeting({ ...meeting, time: e.target.value })}
      />

      <label htmlFor="location">Location:</label>
      <input
        name="location"
        type="text"
        required
        onChange={(e) => setMeeting({ ...meeting, location: e.target.value })}
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
};
export default AddMeeting;
