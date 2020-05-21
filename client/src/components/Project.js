import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProjectId, deleteTask } from "../actions/project";
import AddTask from "./functional/AddTask";
import DashboardMenu from "./layout/DashboardMenu";
import Spinner from "./layout/Spinner";
import { Link } from "react-router-dom";
const Project = ({
  match,
  project,
  getProjectId,
  deleteTask,
  user,
  company
}) => {
  useEffect(() => {
    getProjectId(match.params._id);
  }, [getProjectId, match.params._id]);
  let project_id = match.params._id;

  const deleteItem = id => {
    deleteTask(project_id, id);
  };
  return (
    <Fragment>
      {project.loading ? (
        <Spinner />
      ) : (
        <div className="dashContainer">
          <DashboardMenu user={user} />

          <div className="dashContent">
            <div className="outterBox">
              <div className="addTeam">
                <div className="numberBox w100 mb">
                  <div className="numberBox-logo">
                    <i className="fas fa-tasks"></i>
                  </div>
                  <div className="numberBox-content">
                    {!project.loading && project.item.tasks.length}
                  </div>
                  <div className="numberBox-title">Tasks</div>
                </div>

                {company.owner === user._id && (
                  <AddTask projectId={project_id} />
                )}
              </div>

              <div className="list-wrapper">
                <div className="teamBox">
                  <h3 className="title-blue">{project.item.projectName}:</h3>
                  {project.item.tasks.length === 0 && (
                    <div className="positionRelative">
                      <div className="info-msg">"No tasks found"</div>
                    </div>
                  )}
                  <ul className="team-list">
                    {!project.loading &&
                      project.item.tasks.map(e => {
                        return (
                          <li key={e._id}>
                            <div className="projectCard">
                              <div className="projectCard-left">
                                <div className="projectCard-title">
                                  {company.owner === user._id ||
                                  e.assignTo === user.email ? (
                                    <Link
                                      to={`/task/${project.item._id}/${e._id}`}
                                    >
                                      {e.name}
                                    </Link>
                                  ) : (
                                    e.name
                                  )}
                                </div>
                                <div className="projectCard-description">
                                  {e.assignTo}
                                </div>
                              </div>
                              <div className="taskCard-right">
                                <div className="taskCard-status">
                                  {e.status}
                                </div>
                                <div className="taskCard-button">
                                  <button
                                    onClick={e => deleteItem(e._id)}
                                    className="btn delete-btn"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

Project.propTyps = {
  deleteTask: PropTypes.func.isRequired,
  getProjectId: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  project: state.projects.project,
  user: state.auth.user,
  company: state.company.company
});

export default connect(mapStateToProps, { getProjectId, deleteTask })(Project);
