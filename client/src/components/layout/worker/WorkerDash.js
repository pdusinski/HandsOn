import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getCompanyById } from "../../../actions/company";
import PropTypes from "prop-types";
import Spinner from "../Spinner";
import ListOfTeams from "../../ListOfTeams";
import { getNotesByCompany } from "../../../actions/project";
import ProjectNumber from "../ProjectNumber";
import NotesNumber from "../NotesNumber";

const WorkerDash = ({
  getCompanyById,
  company,
  user,
  loading,
  projects,
  getNotesByCompany,
  notes
}) => {
  useEffect(() => {
    getCompanyById(user.worksFor).then();
    getNotesByCompany(user.worksFor);
  }, [getCompanyById, getNotesByCompany, user.worksFor]);

  let count = 0;

  const increment = () => {
    count = count + 1;
  };
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="numberBox-container">
            <div className="numberBox w20">
              <div className="numberBox-logo">
                <i className="fas fa-users"></i>
              </div>
              <div className="numberBox-content">{company.teams.length}</div>
              <div className="numberBox-title">Teams</div>
            </div>
            <div className="numberBox w20">
              <div className="numberBox-logo">
                <i className="fas fa-user"></i>
              </div>
              <div className="numberBox-content">{company.workers.length}</div>
              <div className="numberBox-title">Employees</div>
            </div>
            <ProjectNumber
              teams={company.teams}
              user={user}
              company={company}
            />

            <NotesNumber notes={notes} user={user} company={company} />
          </div>
          <div className="sectionBox">
            <div className="otherBox">
              <ListOfTeams teams={company.teams} link={false} />
            </div>

            <div className="otherBox">
              <ul className="team-list positionRelative">
                {notes.map(e => {
                  let index = e.project_id.tasks.findIndex(
                    t => t._id === e.task_id
                  );

                  if (
                    e.project_id.tasks[index].assignTo === user.email ||
                    company.owner === user._id
                  ) {
                    increment();
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
                  }
                })}
                {count === 0 && (
                  <li className="info-msg">"You have 0 notes."</li>
                )}
              </ul>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

WorkerDash.propTypes = {
  user: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
  getCompanyById: PropTypes.func.isRequired,
  getNotesByCompany: PropTypes.func.isRequired,

  notes: PropTypes.array,
  loading: PropTypes.bool,
  projects: PropTypes.array
};

const mapStateToProps = state => ({
  user: state.auth.user,
  company: state.company.company,
  loading: state.company.loading,
  projects: state.projects.projects,
  notes: state.notes.notes
});

export default connect(mapStateToProps, { getCompanyById, getNotesByCompany })(
  WorkerDash
);
