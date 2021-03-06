import axios from "axios";

class Auth {
  constructor() {
    // If we are not currently authenticated
    if (!sessionStorage.getItem("authenticated")) {
      sessionStorage.setItem("authenticated", false);
      sessionStorage.setItem("currentPage", "");
      sessionStorage.setItem("user", "");
    }
  }

  register(postData, cb) {
    axios.post("/api/users", postData).then((res) => {
      // login?
      cb();
    });
  }

  login(postData, cb) {
    axios
      .post("/api/session", postData)
      .then((res) => {
        if (res.loggedIn) {
          sessionStorage.setItem("authenticated", true);
          sessionStorage.setItem("user", res.data.user);
        } else {
          sessionStorage.setItem("authenticated", false);
        }

        cb(res);
      })
      .catch((err) => {
        //console.log(err.response.data);

        sessionStorage.setItem("authenticated", false);
        cb(err.response.data);
      });
  }

  logout(cb) {
    axios.delete("/api/session").then((res) => {
      sessionStorage.setItem("authenticated", false);
      cb();
    });
  }

  // Do we need to check session everytime a user navigates to a new page?
  checkSession(cb) {
    axios.get("/api/session").then((res) => {
      sessionStorage.setItem("authenticated", res.data.loggedIn);

      if (sessionStorage.getItem("authenticated") === "true") {
        sessionStorage.setItem("user", res.data.user);
      }
      cb();
    });
  }

  getAuth() {
    return sessionStorage.getItem("authenticated") === "true";
  }

  getUser() {
    return sessionStorage.getItem("user");
  }
}

export default new Auth();
