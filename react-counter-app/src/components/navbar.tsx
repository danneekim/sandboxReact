import React from "react";

const Navbar = (props: any) => {
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

// export default class NavBar extends Component<any, any> {
//   render() {
//     return (
//       <nav className="navbar navbar-light bg-light">
//         <div className="container-fluid">
//           <a className="navbar-brand mb-0 h1">
//             Navbar{" "}
//             <span className="badge rounded-pill bg-secondary">
//               {this.props.totalCounters}
//             </span>
//           </a>
//         </div>
//       </nav>
//     );
//   }
// };
