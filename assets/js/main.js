const DATE_FORMAT = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
};

const isSameDate = (date1, date2) => {
  console.log(date1, date2);

  return (
    date1.getFullYear() == date2.getFullYear() &&
    date1.getMonth() == date2.getMonth() &&
    date1.getDate() == date2.getDate()
  );
};

let taskState = [];

const renderTaskLists = () => {
  taskState.forEach(element => {
    console.log(element.dueDate);

    let innerHtml = `
      <li class="task">
        <h1>${element.title}</h1>
        <p>${element.description ? element.description : ""}</p>
        <p>Due: ${new Date(element.dueDate.$date).toLocaleString(
          "en-US",
          DATE_FORMAT
        )}</p>
      </li>`;

    // If today is same date as duedate, render to today's list
    if (isSameDate(new Date(), new Date(element.dueDate.$date))) {
      $(".taskList-today").append(innerHtml);
    } else {
      $(".taskList-future").append(innerHtml);
    }
  });

  $("#sortable1, #sortable2")
    .sortable({
      connectWith: ".connectedSortable",
      containment: ".taskList-container"
    })
    .disableSelection();
};

$(document).ready(() => {
  API.getAllTasks().then(function(data) {
    taskState = data;

    renderTaskLists();
  });
});
