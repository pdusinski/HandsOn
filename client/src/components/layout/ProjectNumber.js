import React, { useState, useEffect } from "react";

const ProjectNumber = ({ teams, user, company }) => {
  useEffect(() => {
    calculateProjects();
  }, []);

  const [projectTotal, setProjectTotal] = useState(0);
  let totalProjects = [];

  const calculateProjects = () => {
    teams.map(e => {
      if (e.members.includes(user.email) || company.owner === user._id) {
        totalProjects.unshift(e.numberOfProjects);
      }
    });

    let newTotal = totalProjects.reduce((total, num) => {
      return total + num;
    }, 0);
    setProjectTotal(newTotal);
  };

  return (
    <div className="numberBox w20">
      <div className="numberBox-logo">
        <i className="fas fa-tasks"></i>
      </div>

      <div className="numberBox-content">{projectTotal}</div>
      <div className="numberBox-title">Projects</div>
    </div>
  );
};

export default ProjectNumber;
