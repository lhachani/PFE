// Namespace: GroupScheduleValidation
var GroupScheduleValidation = window.GroupScheduleValidation || {};

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

    // Check if both group and schedule fields are not null
    if (
      formContext.getAttribute("*****_schedule") !== null &&
      formContext.getAttribute("*****_group") !== null
    ) {
      // Get the schedule lookup value
      var scheduleLookup = formContext
        .getAttribute("*****_schedule")
        .getValue();

      // Get the group
      var group = formContext.getAttribute("*****_group").getValue();

      // Check if both group and schedule fields contain data
      if (scheduleLookup !== null && group !== null && group.length > 0) {
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

            // Call validateGroupSchedules function after setting the dates
            validateGroupSchedules(executionContext);
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

  function validateGroupSchedules(executionContext) {
    // Get the form context
    var formContext = executionContext.getFormContext();

    // Check if group field is not null
    if (formContext.getAttribute("*****_group") !== null) {
      // Get the group
      var group = formContext.getAttribute("*****_group").getValue();

      // Check if group field contains data
      if (group !== null && group.length > 0) {
        // Get the starting date and ending date
        var startingDate = formContext
          .getAttribute("*****_startingdate")
          .getValue();
        var endingDate = formContext
          .getAttribute("*****_endingdate")
          .getValue();

        Xrm.WebApi.retrieveMultipleRecords(
          "*****_groupschedule",
          "?$select=*****_startingdate,*****_endingdate,_*****_group_value&$filter=_*****_group_value eq " +
            group[0].id.replace("{", "").replace("}", "") +
            " and *****_endingdate gt " +
            startingDate.toISOString() +
            " and *****_startingdate lt " +
            endingDate.toISOString() +
            ""
        ).then(
          function success(result) {
            if (result.entities.length > 0) {
              formContext.ui.setFormNotification(
                "There is an overlap with existing group schedules. Please adjust the starting and ending dates.",
                "ERROR",
                "overlap_error"
              );
              formContext
                .getControl("*****_startingdate")
                .setNotification(
                  "There is an overlap with existing group schedules."
                );
              formContext
                .getControl("*****_endingdate")
                .setNotification(
                  "There is an overlap with existing group schedules."
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
}).call(GroupScheduleValidation);
