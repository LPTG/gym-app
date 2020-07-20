import axios from "axios";

class Auth {
  constructor() {
    this.authenticated = false;
    this.user = [];
  }

  register(postData, cb) {
    axios.post("/api/users", postData).then((res) => {
      console.log(res.data);

      // login?
      cb();
    });
  }

  login(postData, cb) {
    axios
      .post("/api/session", postData)
      .then((res) => {
        if (res.loggedIn) {
          this.authenticated = true;
        } else {
          this.authenticated = false;
        }

        cb();
      })
      .catch((err) => {
        this.authenticated = false;
        cb();
      });
  }

  logout(cb) {
    axios.delete("/api/session").then((res) => {
      this.authenticated = false;

      cb();
    });
  }

  // Do we need to check session everytime a user navigates to a new page?
  checkSession(cb) {
    axios.get("/api/session").then((res) => {
      this.authenticated = res.data.loggedIn;

      if (this.authenticated) {
        this.user = res.data.user;
        cb();
      }
    });
  }

  getAuth() {
    return this.authenticated;
  }

  getUser() {
    return this.user;
  }
}

export default new Auth();
