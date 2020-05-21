import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addProject } from "../../actions/project";

const AddProject = ({ addProject, teamID }) => {
  const [formData, setFormData] = useState({
    projectName: "",
    description: ""
  });

  const { projectName, description } = formData;

  const onSubmit = e => {
    e.preventDefault();
    let id = teamID;
    addProject(projectName, description, id);
    setFormData({
      projectName: "",
      description: ""
    });
  };

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <Fragment>
      <h3>Next Project:</h3>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Project name"
            name="projectName"
            value={projectName}
            onChange={e => onChange(e)}
            className="form-input2"
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Short description"
            name="description"
            value={description}
            onChange={e => onChange(e)}
            className="form-input2"
          />
        </div>

        <input type="submit" className="btn btn-primary" value="Add" />
      </form>
    </Fragment>
  );
};

AddProject.propTypes = {
  addProject: PropTypes.func.isRequired
};

export default connect(null, { addProject })(AddProject);
