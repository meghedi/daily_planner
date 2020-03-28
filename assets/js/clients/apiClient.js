class api {
  getAllTasks() {
    return $.ajax({
      url: "https://my.api.mockaroo.com/tasks?key=ad374b80",
      method: "Get"
    });
  }
}

const API = new api();