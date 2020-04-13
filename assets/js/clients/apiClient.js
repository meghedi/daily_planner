class api {
  getAllTasks() {
    return $.ajax({
      url: "https://daily-planner-api.herokuapp.com/api/tasks",
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

  signIn(email, password, errorHandler) {
    return $.ajax({
      url: "https://daily-planner-api.herokuapp.com/api/signin",
      type: "POST",
      data: { email, password },
      // This is the error handler function passed from signin.html
      error: errorHandler,
    }).then((response) => {
      localStorage.setItem("token", response.token);

      return (window.location.href = "https://rdkelley.github.io/daily_planner/");
    });
  }
}

const API = new api();
