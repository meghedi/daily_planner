class api {
  getAllTasks() {
    return $.ajax({
      url: "http://localhost:8080/api/tasks",
      type: "GET",
      contentType: "application/json",
      headers: {
        // Token stored in localStorage -- note: this is usually seen as bad
        // practice, unless you take more steps than what we're doing here to
        // mitigate XSS concerns
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      error: function (error) {
        console.log("ERROR", error);
      },
    }).then((response) => {
      console.log(response);
    });
  }

  signIn(email, password) {
    return $.ajax({
      url: "http://localhost:8080/api/signin",
      type: "POST",
      data: { email, password },
      error: function (error) {
        console.log("ERROR", error);
      },
    }).then((response) => {
      console.log(response);

      localStorage.setItem("token", response.token);

      return window.location.href = 'http://localhost:8081/';
    });
  }
}

const API = new api();
