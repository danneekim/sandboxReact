import React from "react";

const Navbar = (props: any) => {
  // console.log("Navbar - Rendered");

  const { totalCounters } = props;
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand mb-0 h1">
          Navbar{" "}
          <span className="badge rounded-pill bg-secondary">
            {totalCounters}
          </span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
