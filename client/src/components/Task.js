import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { completeTask, addNote, getNotesByTask } from "../actions/project";
import DashboardMenu from "./layout/DashboardMenu";
import PropTypes from "prop-types";
import Spinner from "./layout/Spinner";
import { getAllProjects } from "../actions/project";
const Task = ({
  match,
  completeTask,
  project,
  user,
  addNote,
  company,
  getNotesByTask,
  notes,
  companyloading,
  notesloading,
  getAllProjects
}) => {
  useEffect(() => {
    getNotesByTask(match.params._id);
  }, [getNotesByTask, match.params._id]);
  const [formData, setFormData] = useState({
    note: ""
  });
  const { note } = formData;
  const project_id = match.params.project_id;
  const task_id = match.params._id;

  let taskIndex = project.tasks.findIndex(e => e._id === task_id);

  const task = project.tasks[taskIndex];

  const onChange = e => {
    setFormData({ note: e.target.value });
  };
  const onSubmit = e => {
    e.preventDefault();
    const userId = user._id;
    const company_id = company._id;
    addNote(note, company_id, project_id, task_id, userId);
    setFormData({ note: "" });
  };

  const onClick = e => {
    e.preventDefault();
    completeTask(project_id, task_id);
  };
  return (
    <div className="dashContainer">
      <DashboardMenu user={user} />
      {notesloading || companyloading ? (
        <Spinner />
      ) : (
        <div className="dashContent">
          <div className="outterBox">
            <div className="addTeam">
              <div className="teamBox">
                <p className="task-description">
                  <span className="boldInfo">Task:</span>
                  {task.name}
                </p>
                <p className="boldInfo">Description:</p>
                <p>{task.description}</p>
                <p className="task-description">
                  <span className="boldInfo">Priority:</span>
                  {task.priority}
                </p>
                <p className="task-description">
                  <span className="boldInfo">Status:</span>
                  {task.status}
                </p>

                <button className="btn btn-primary" onClick={e => onClick(e)}>
                  Complete
                </button>
              </div>

              <div className="teamBox">
                <h3>Add Note:</h3>
                <form className="form" onSubmit={e => onSubmit(e)}>
                  <div className="form-group">
                    <textarea
                      placeholder="Short description"
                      name="note"
                      value={note}
                      onChange={e => onChange(e)}
                      className="form-input2"
                    ></textarea>
                  </div>

                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="Add Note"
                  />
                </form>
              </div>
            </div>

            <div className="list-wrapper">
              <div className="teamBox">
                <h3>My Notes:</h3>
                {notes !== null}
                {
                  <ul className="team-list">
                    {notes.map(e => {
                      let index = e.project_id.tasks.findIndex(
                        t => t._id === e.task_id
                      );
                      return (
                        <li key={e._id}>
                          <div className="note">
                            <div className="note-Avatar">
                              <img
                                className="round-img "
                                src={e.createdBy.avatar}
                                alt=""
                              />
                            </div>
                            <div className="note-info-box">
                              <p className="note-info-text">"{e.note}"</p>
                              <div className="note-info-desc">
                                <div className="note-project">
                                  {e.project_id.projectName}
                                </div>
                                <div className="note-task">
                                  {e.project_id.tasks[index].name}
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                }
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Task.propTypes = {
  notes: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  project: state.projects.project.item,
  user: state.auth.user,
  company: state.company.company,
  notes: state.notes.notes,
  companyloading: state.company.loading,
  notesloading: state.notes.loading
});

export default connect(mapStateToProps, {
  completeTask,
  addNote,
  getNotesByTask,
  getAllProjects
})(Task);
