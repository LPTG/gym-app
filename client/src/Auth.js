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
          sessionStorage.setItem("authenticated", true);
          sessionStorage.setItem("user", res.data.user.username);
        } else {
          sessionStorage.setItem("authenticated", false);
        }

        cb();
      })
      .catch((err) => {
        sessionStorage.setItem("authenticated", false);
        cb();
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
        sessionStorage.setItem("user", res.data.user.username);
      }
      cb();
    });
  }

  getAuth() {
    //console.log(JSON.stringify(sessionStorage.getItem("user"), null, 4));

    return sessionStorage.getItem("authenticated") === "true";
  }

  getUser() {
    //return sessionStorage.getItem("user");
    return sessionStorage.getItem("user");
  }
}

export default new Auth();
