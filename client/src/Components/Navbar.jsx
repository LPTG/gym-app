import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

class Navbar extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to={`/${this.props.user}/workouts`}>
              <input type="button" value="My Workouts" />
            </Link>
          </li>
          <li>
            <Link to={`/${this.props.user}/templates`}>
              <input type="button" value="My Templates" />
            </Link>
          </li>
          {/* <li><a href={`/${this.props.user}/templates`}>Logout</a></li> */}
        </ul>
      </div>
    );
  }
}

export default withRouter(Navbar);
