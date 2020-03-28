const DATE_FORMAT = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
};

$(document).ready(() => {
  API.getAllTasks().then(function(data) {
    data.forEach(element => {
      console.log(element.dueDate);
      let innerHtml = `
        <div class="task">
          <h1>${element.title}</h1>
          <p>${element.description ? element.description : ""}</p>
          <p>Due: ${new Date(element.dueDate.$date).toLocaleString(
            "en-US",
            DATE_FORMAT
          )}</p>
        </div>`;
      $(".taskList").append(innerHtml);
    });
  });
});
