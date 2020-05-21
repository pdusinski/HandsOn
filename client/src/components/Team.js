import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "./layout/Spinner";
import { getAllProjects } from "../actions/project";
import { Link } from "react-router-dom";
import { getTeamInfo } from "../actions/company";
import AddMember from "./AddMember";
import DashboardMenu from "./layout/DashboardMenu";
import AddProject from "./functional/AddProject";
import DeleteMember from "./DeleteMember";
const Team = ({
  user,
  match,
  getAllProjects,
  getTeamInfo,
  team_loading,
  project_loading,
  projects,
  company,
  team
}) => {
  useEffect(() => {
    getAllProjects(match.params._id);
    getTeamInfo(company._id, match.params._id);
  }, [getAllProjects, getTeamInfo, company._id, match.params._id]);

  return (
    <Fragment>
      {team_loading && project_loading ? (
        <Spinner />
      ) : (
        <div className="dashContainer">
          <DashboardMenu user={user} />

          <div className="dashContent">
            <div className="outterBox">
              <div className="addTeam">
                <div className="numberBox w100">
                  <div className="numberBox-logo">
                    <i className="fas fa-users"></i>
                  </div>
                  <div className="numberBox-content">
                    {!team_loading && team.members.length}
                  </div>
                  <div className="numberBox-title">Members</div>
                </div>
                {company.owner === user._id && (
                  <Fragment>
                    {company.workers.length > 0 ? (
                      <Fragment>
                        <div className="listBox">
                          <AddMember company={company} />
                        </div>

                        <div className="listBox">
                          <DeleteMember company={company} admin={true} />
                        </div>
                      </Fragment>
                    ) : (
                      <div className="listBox">
                        <p>
                          To assign person to this team. You need to add an
                          employee to your company.
                          <br />
                          <Link to="/employees">Add an Employee</Link>{" "}
                        </p>
                      </div>
                    )}
                  </Fragment>
                )}

                {company.owner !== user._id && (
                  <Fragment>
                    <div className="listBox">
                      <DeleteMember company={company} admin={false} />
                    </div>
                  </Fragment>
                )}
              </div>

              <div className="col-60">
                <div className="numberBox w100">
                  <div className="numberBox-logo">
                    <i className="fas fa-tasks"></i>
                  </div>
                  <div className="numberBox-content">{projects.length}</div>
                  <div className="numberBox-title">Projects</div>
                </div>

                {company.owner === user._id && (
                  <div className="teamBox">
                    <AddProject teamID={team._id} />
                  </div>
                )}

                <div className="listBox">
                  {projects.length === 0 ? (
                    <div className="positionRelative">
                      <div className="info-msg">"No Projects found"</div>
                    </div>
                  ) : (
                    <Fragment>
                      <h3>Projects:</h3>
                      <ul className="team-list">
                        {projects.map(e => {
                          return (
                            <li key={e._id}>
                              <div className="projectCard">
                                <div className="projectCard-left">
                                  <div className="projectCard-title">
                                    {!team_loading &&
                                    (team.members.includes(user.email) ||
                                      company.owner === user._id) &&
                                    team.members.length > 0 ? (
                                      <Link to={`project/${e._id}`}>
                                        {e.projectName}
                                      </Link>
                                    ) : (
                                      e.projectName
                                    )}
                                  </div>
                                  <div className="projectCard-description">
                                    {e.description}
                                  </div>
                                </div>
                                <div className="projectCard-right">
                                  {e.status}
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </Fragment>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};
Team.propTypes = {
  company: PropTypes.object.isRequired,
  team: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,

  projects: PropTypes.array.isRequired,
  getAllProjects: PropTypes.func.isRequired,
  getTeamInfo: PropTypes.func.isRequired,
  team_loading: PropTypes.bool,
  project_loading: PropTypes.bool
};
const mapStateToProps = state => ({
  user: state.auth.user,
  company: state.company.company,
  team: state.team.team,
  team_loading: state.team.loading,
  project_loading: state.projects.loading,
  projects: state.projects.projects
});

export default connect(mapStateToProps, { getAllProjects, getTeamInfo })(Team);
