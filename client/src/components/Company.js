import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "./layout/Spinner";
import { getCompanyById } from "../actions/company";
import { getNotesByCompany } from "../actions/project";
import ListOfTeams from "./ListOfTeams";
import ProjectNumber from "./layout/ProjectNumber";
import NotesNumber from "./layout/NotesNumber";

const Company = ({
  loading,
  getCompanyById,
  auth,
  company,
  notes,
  getNotesByCompany
}) => {
  useEffect(() => {
    getCompanyById(auth.user.owns[0]);
    getNotesByCompany(auth.user.owns[0]);
  }, [getCompanyById, getNotesByCompany, auth.user.owns]);

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
              user={auth.user}
              company={company}
            />

            <NotesNumber notes={notes} user={auth.user} company={company} />
          </div>

          <div className="sectionBox">
            <div className="otherBox">
              <ListOfTeams teams={company.teams} link={true} />
            </div>

            <div className="otherBox ">
              <ul className="team-list positionRelative">
                {notes.length === 0 && (
                  <li className="info-msg">"You have 0 notes."</li>
                )}
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
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Company.propTypes = {
  company: PropTypes.object.isRequired,
  getCompanyById: PropTypes.func.isRequired,
  getNotesByCompany: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  notes: PropTypes.array,
  projects: PropTypes.array
};

const mapStateToProps = state => ({
  auth: state.auth,
  company: state.company.company,
  loading: state.company.loading,
  notes: state.notes.notes,
  projects: state.projects.projects
});

export default connect(mapStateToProps, { getCompanyById, getNotesByCompany })(
  Company
);
