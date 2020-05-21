import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addCompany } from "../../actions/company";
import { withRouter } from "react-router-dom";

const AddCompany = ({ addCompany, history }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    description: "",
    address: ""
  });

  const { companyName, description, address } = formData;

  //companyName, description, address
  const onSubmit = e => {
    e.preventDefault();
    addCompany(companyName, description, address, history);
    setFormData({
      companyName: "",
      description: "",
      address: ""
    });
  };
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form className="form" onSubmit={e => onSubmit(e)}>
      <div className="form-group">
        <input
          type="text"
          placeholder="Name of Company"
          name="companyName"
          value={companyName}
          onChange={e => onChange(e)}
          className="form-input2"
        />
      </div>
      <div className="form-group">
        <textarea
          placeholder="Address"
          name="address"
          value={address}
          onChange={e => onChange(e)}
          className="form-input2"
          rows="5"
        ></textarea>
      </div>
      <div className="form-group">
        <textarea
          placeholder="Description"
          name="description"
          value={description}
          onChange={e => onChange(e)}
          className="form-input2"
          rows="5"
        ></textarea>
      </div>

      <input type="submit" className="btn btn-primary" value="Add" />
    </form>
  );
};

AddCompany.propTypes = {
  addCompany: PropTypes.func.isRequired
};

export default connect(null, { addCompany })(withRouter(AddCompany));
