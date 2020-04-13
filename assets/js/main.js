const DATE_FORMAT = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

// Compares two dates
const isSameDate = (date1, date2) => {
  return (
    date1.getFullYear() == date2.getFullYear() &&
    date1.getMonth() == date2.getMonth() &&
    date1.getDate() == date2.getDate()
  );
};

let taskState = [];

const renderTaskLists = () => {
  taskState.forEach((element) => {
    let innerHtml = `
      <li class="task">
        <h1>${element.title}</h1>
        <p>${element.description ? element.description : ""}</p>
        <p>Due: ${new Date(element.dueDate.$date).toLocaleString(
          "en-US",
          DATE_FORMAT
        )}</p>
      </li>`;

    // If today is same as duedate, render to today's list
    if (isSameDate(new Date(), new Date(element.dueDate.$date))) {
      $(".taskList-today").append(innerHtml);
    }
    // Otherwise, render to future list
    else {
      $(".taskList-future").append(innerHtml);
    }
  });

  // Add jQuery UI sorting
  $("#sortable1, #sortable2")
    .sortable({
      connectWith: ".connectedSortable",
      containment: ".taskList-container",
    })
    .disableSelection();
};

$(document).ready(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "https://rdkelley.github.io/daily_planner/signin";
  }

  $("#logout").click(() => {
    localStorage.clear();

    window.location.href = "https://rdkelley.github.io/daily_planner/signin";
  });

  API.getAllTasks().then(function (data) {
    // Assign data to task state
    taskState = data;

    renderTaskLists();
  });
});
