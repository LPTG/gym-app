import React from "react";
import axios from "axios";
import "./Register.css";
import { Redirect } from "react-router-dom";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = { registerView: false, redirect: false };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const username = this.state.username;
    const email = this.state.email;
    const password = this.state.password;

    if (this.state.registerView) {
      const postData = {
        username,
        email,
        password,
      };

      // username must be at least 3 characters long
      // password must be at least 8 characters long and contain a special char, regex check?
      // regex check email

      axios.post("/register", postData).then((res) => {
        console.log(res.data);
      });
    } else {
      const postData = {
        username,
        password,
      };

      // username must be at least 3 characters long
      // password must be at least 8 characters long and contain a special char, regex check?
      axios
        .post("/api/login", postData)
        .then((res) => {
          console.log(res);
          // Request sent successfully
          if (res.status === 200) {
            if (res.data.success) {
              this.setState({ redirect: true });
            } else if (res.data.error) {
              console.log(res.data.error);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  handleChange(event) {
    const target = event.target;

    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleClick(event) {
    // Toggle to show email field or not
    this.setState({ registerView: !this.state.registerView });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={{ pathname: "/workoutlist" }} />;
    }

    return (
      <div className="loginOrRegister">
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input type="text" name="username" onChange={this.handleChange} />
            <br />
          </label>

          {this.state.registerView && (
            <label>
              Email:
              <input type="text" name="email" onChange={this.handleChange} />
              <br />
            </label>
          )}

          <label>
            Password:
            <input type="password" name="password" onChange={this.handleChange} />
            <br />
          </label>
          <input type="submit" value={this.state.registerView ? "Register" : "Login"} />
          <input
            type="button"
            value={this.state.registerView ? "Already Registered?" : "Need to Register?"}
            onClick={this.handleClick}
          />
        </form>
      </div>
    );
  }
}

export default Register;
