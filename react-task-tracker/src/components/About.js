import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h4>Version 1.0.0</h4>
      <Link to="/">Go back</Link>
    </div>
  );
};

export default About;
