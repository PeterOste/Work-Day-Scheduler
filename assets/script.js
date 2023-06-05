$(function () {
// A function is called that begins once the DOM is loaded.

  var currentDate = dayjs().format("MMM D, YYYY");
  $("#currentDay").text(currentDate);
  // The current date is retrieved and linked to an html id.

  function updateHourStatus() {
  // The status of the time-block is updated in relation to the current hour.

    var currentHour = parseInt(dayjs().format("H"));
    // The current hour is retrieved in 24 hour format as an integer.

    $(".time-block").each(function () {
      var timeBlock = $(this);
      var id = parseInt(timeBlock.attr("id").replace("hour-", ""));
      // Every element with the id time-block is checked and the hour is removed and then checked in relation to the current hour.
      // The string is converted into an integer and attached to the id variable.

      if (id < currentHour) {
        timeBlock.addClass("past").removeClass("present future");
      } else if (id === currentHour) {
        timeBlock.addClass("present").removeClass("past future");
      } else {
        timeBlock.addClass("future").removeClass("past present");
      }
    });
      // The id of the block status is checked to see which tense it belongs in.
      // It is then has the correct class added and the incorrect ones removed.
      // This is what determines the correct color styling is applied.
  }

  function loadSavedEvents() {
    $(".time-block").each(function () {
      // The time-block class is selected and iterated overy every instance.

      var timeBlock = $(this);
      var id = timeBlock.attr("id");
      var event = localStorage.getItem(id);
      // jQuery is wrapped around the time-block object to be manipulated.
      // The id becomes the key to retrieve the item from the local storage and is assigned to var event.

      if (event) {
        timeBlock.find(".description").val(event);
      }
    });
      // Checks if there is an id saved for an object.
      // If there is, then the id is assigned to the description for that respective container.
  }

  function saveEvent(timeBlock) {
    var id = timeBlock.attr("id");
    var event = timeBlock.find(".description").val();
    // The hour of the time block is set to a variable and stored in local storage.
    // The description within that block is saved to local storage.

    localStorage.setItem(id, event);
    // This line is what sets the two variables to the local storage.
  }

  $(".saveBtn").on("click", function () {
    var timeBlock = $(this).closest(".time-block");
    saveEvent(timeBlock);
  });
  // When a save button is clicked, then the next two lines execute.
  // (this) is the element that was clicked and the closest ancestor is found, .time-block which the save button is then found as a child.
  // the saveEvent function is called to save the description of whichever element is being edited.

  function startup() {
    loadSavedEvents();
    updateHourStatus();
  }
  // A function will start when the page is loaded that will allow textareas to persist their data if refreshes by checking the local storage.
  // The update hour status will change to the corresponding day when the page is rendered.

  startup();
  // The function is called.
});