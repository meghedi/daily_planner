$(document).ready(() => {
  API.getAllTasks().then(function(data) {
    console.log(data);
  });
});
