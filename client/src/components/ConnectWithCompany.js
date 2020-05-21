import React, { useState } from "react";
import { connect } from "react-redux";
import { connectWithCompany } from "../actions/company";
const ConnectWithCompany = ({ connectWithCompany }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    accessKey: ""
  });

  const { companyName, accessKey } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = e => {
    e.preventDefault();
    connectWithCompany(companyName, accessKey);
  };

  return (
    <div className="outterBox">
      <div className="addTeam">
        <div className="teamBox">
          <h3>Connect with company</h3>
          <form className="form" onSubmit={e => onSubmit(e)}>
            <div className="form-group">
              <input
                className="form-input2"
                type="text"
                placeholder="Company Name"
                name="companyName"
                value={companyName}
                onChange={e => onChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <input
                className="form-input2"
                type="text"
                placeholder="Private Key"
                name="accessKey"
                value={accessKey}
                onChange={e => onChange(e)}
                required
              />
            </div>
            <input type="submit" className="btn btn-primary" value="Connect" />
          </form>
        </div>
      </div>

      <div className="col-60">
        <div className="teamBox">
          <div className="introMsg">
            <h4>Welcome to HANDSONTASK</h4>
            <br />
            <p>
              To fully enjoy <b>handsOnTask</b> experience connect with a
              company.
            </p>
            <p>
              To join any company you must know a <b>name</b> of the company and
              an <b>access key</b> which should be given to you by an
              administrator.{" "}
            </p>
            <p>
              The access key is to used <b>one time</b> ,you will never be
              prompted to enter it again.
            </p>
            <p>
              When the access key you entered is correct, you will be moved to
              your dashboard page.
            </p>
            <p>
              Options that you'll see are <b>based on the team selection</b>{" "}
              made by the administrator.
            </p>
            <br />
            <p>Regards,</p>
            <p>handsOnTask team.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { connectWithCompany })(ConnectWithCompany);
