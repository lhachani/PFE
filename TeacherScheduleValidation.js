// Namespace: TeacherScheduleValidation
var TeacherScheduleValidation = window.TeacherScheduleValidation || {};

(function () {
  // Event Functions
  this.onChange = function (executionContext) {
    clearErrorNotifications(executionContext);
    fillDates(executionContext);
  };

  // Helper Functions
  function fillDates(executionContext) {
    // Get the form context
    var formContext = executionContext.getFormContext();

    // Check if both teacher and schedule fields are not null
    if (
      formContext.getAttribute("*****_schedule") !== null &&
      formContext.getAttribute("*****_teacher") !== null
    ) {
      // Get the schedule lookup value
      var scheduleLookup = formContext
        .getAttribute("*****_schedule")
        .getValue();

      // Get the teacher
      var teacher = formContext.getAttribute("*****_teacher").getValue();

      // Check if both teacher and schedule fields contain data
      if (scheduleLookup !== null && teacher !== null && teacher.length > 0) {
        // Get the schedule record ID
        var scheduleId = scheduleLookup[0].id;

        // Retrieve the schedule record
        Xrm.WebApi.retrieveRecord(
          "*****_schedule",
          scheduleId,
          "?$select=*****_startdate,*****_enddate"
        ).then(
          function success(result) {
            var startDate = new Date(result.*****_startdate);
            var endDate = new Date(result.*****_enddate);
            // Set the Starting Date and Ending Date fields
            formContext.getAttribute("*****_startingdate").setValue(startDate);
            formContext.getAttribute("*****_endingdate").setValue(endDate);

            // Call validateTeacherSchedules function after setting the dates
            validateTeacherSchedules(executionContext);
          },
          function (error) {
            console.error("Error retrieving schedule record: ", error.message);
          }
        );
      } else {
        // Clear the Starting Date and Ending Date fields
        formContext.getAttribute("*****_startingdate").setValue(null);
        formContext.getAttribute("*****_endingdate").setValue(null);
      }
    }
  }

  function validateTeacherSchedules(executionContext) {
    // Get the form context
    var formContext = executionContext.getFormContext();

    // Check if teacher field is not null
    if (formContext.getAttribute("*****_teacher") !== null) {
      // Get the teacher
      var teacher = formContext.getAttribute("*****_teacher").getValue();

      // Check if teacher field contains data
      if (teacher !== null && teacher.length > 0) {
        // Get the starting date and ending date
        var startingDate = formContext
          .getAttribute("*****_startingdate")
          .getValue();
        var endingDate = formContext
          .getAttribute("*****_endingdate")
          .getValue();

        Xrm.WebApi.retrieveMultipleRecords(
          "*****_teacherschedule",
          "?$select=*****_startingdate,*****_endingdate,_*****_teacher_value&$filter=_*****_teacher_value eq " +
            teacher[0].id.replace("{", "").replace("}", "") +
            " and *****_endingdate gt " +
            startingDate.toISOString() +
            " and *****_startingdate lt " +
            endingDate.toISOString() +
            ""
        ).then(
          function success(result) {
            if (result.entities.length > 0) {
              formContext.ui.setFormNotification(
                "There is an overlap with existing teacher schedules. Please adjust the starting and ending dates.",
                "ERROR",
                "overlap_error"
              );
              formContext
                .getControl("*****_startingdate")
                .setNotification(
                  "There is an overlap with existing teacher schedules."
                );
              formContext
                .getControl("*****_endingdate")
                .setNotification(
                  "There is an overlap with existing teacher schedules."
                );
              executionContext.getEventArgs().preventDefault();
            }
          },
          function (error) {
            console.debug(
              "EROORRRRRRRRRRRRRR ---------------------------------"
            );
            console.debug(error);
            console.debug(
              "EROORRRRRRRRRRRRRR ---------------------------------"
            );
          }
        );
      }
    }
  }

  function clearErrorNotifications(executionContext) {
    var formContext = executionContext.getFormContext();
    formContext.ui.clearFormNotification("overlap_error");
    formContext.getControl("*****_startingdate").clearNotification();
    formContext.getControl("*****_endingdate").clearNotification();
  }
}).call(TeacherScheduleValidation);
