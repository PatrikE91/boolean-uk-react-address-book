const Meetings = (props) => {
  const { contact } = props;
    console.log(contact.meetings)
  return (
    <ul>
      {contact.meetings.length > 0? (contact.meetings.map((meeting) => {
        return (
          <li key={contact.id}>
            The {meeting.date}, at {meeting.time} in {meeting.location}
          </li>
        );
      })) :
     <li>No meetings</li>}
    </ul>
  );
};

export default Meetings;
