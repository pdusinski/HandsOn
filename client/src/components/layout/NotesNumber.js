import React, { useEffect, useState } from "react";

const NotesNumber = ({ notes, user, company }) => {
  useEffect(() => {
    calculateNotes();
  });
  const [notesNumber, setNotesNumber] = useState(0);
  const arrayNotes = [];
  const myNotes = notes;
  const calculateNotes = () => {
    myNotes.map(e => {
      let index = e.project_id.tasks.findIndex(t => t._id === e.task_id);
      if (
        e.project_id.tasks[index].assignTo === user.email ||
        company.owner === user._id
      ) {
        arrayNotes.unshift(e);
      }
    });

    setNotesNumber(arrayNotes.length);
  };
  return (
    <div className="numberBox w20">
      <div className="numberBox-logo">
        <i className="fas fa-sticky-note"></i>
      </div>

      <div className="numberBox-content">{notesNumber}</div>
      <div className="numberBox-title">Notes</div>
    </div>
  );
};

export default NotesNumber;
