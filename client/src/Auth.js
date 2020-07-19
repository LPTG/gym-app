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
        // Need to make a call to server to check if req.user exists instead of this garbage
        if (res.data.message === "Logged in") {
          console.log(res);
          this.authenticated = true;
        } else if (res.data.error) {
          // Not sure where res.data.error is set or if it is
          this.authenticated = false;
        }

        cb();
      })
      .catch((err) => {
        console.log(err);
        this.authenticated = false;
        cb();
      });
  }

  logout(cb) {
    axios.delete("/api/session").then((res) => {
      console.log(res);
      this.authenticated = false;
      cb();
    });
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
