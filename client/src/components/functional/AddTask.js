import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addTask } from "../../actions/project";

const AddTask = ({ addTask, projectId, team }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    priority: "",
    assignTo: ""
  });

  const { name, description, priority, assignTo } = formData;

  const onSubmit = e => {
    e.preventDefault();
    const id = projectId;
    addTask(name, description, priority, assignTo, id);
    setFormData({
      name: "",
      description: "",
      priority: "",
      assignTo: ""
    });
  };

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="listBox">
      <h3>New Task:</h3>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Task Name"
            name="name"
            value={name}
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
        <div className="form-group">
          <select
            name="priority"
            onChange={e => onChange(e)}
            className="form-input2"
          >
            <option key="0" value="" value disabled hidden>
              Priority
            </option>
            <option key="1" value="Low">
              Low
            </option>
            <option key="2" value="Medium">
              Medium
            </option>
            <option key="3" value="High">
              High
            </option>
          </select>
        </div>
        <div className="form-group">
          <select
            value={assignTo}
            name="assignTo"
            onChange={e => onChange(e)}
            className="form-input2"
          >
            <option value="" valuedefault disabled hidden>
              Task assign to:
            </option>

            {team.members.map(worker => (
              <option key={worker} value={worker}>
                {worker}
              </option>
            ))}
          </select>
        </div>

        <input type="submit" className="btn btn-primary" value="add" />
      </form>
    </div>
  );
};

AddTask.propTypes = {
  addTask: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  team: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  project: state.company.company,
  team: state.team.team
});

export default connect(mapStateToProps, { addTask })(AddTask);
