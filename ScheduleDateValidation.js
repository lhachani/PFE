// Namespace: ScheduleDateValidation
var ScheduleDateValidation = window.ScheduleDateValidation || {};

(function () {
  // Event Functions
  this.onSave = function (executionContext) {
    // Get the form context
    var formContext = executionContext.getFormContext();

    // Call the validateDates function
    return validateDates(formContext);
  };

  this.onChange = function (executionContext) {
    // Get the form context
    var formContext = executionContext.getFormContext();

    // Call the validateDates function
    validateDates(formContext);
  };

  // Helper Functions
  function validateDates(formContext) {
    // Obtain the Value in the Start Date field
    var startDate = formContext.getAttribute("*****_startdate").getValue();

    // Obtain the Value in the End Date field
    var endDate = formContext.getAttribute("*****_enddate").getValue();

    // Compare the Start Date and End Date values
    if (new Date(startDate) >= new Date(endDate)) {
      formContext
        .getControl("*****_enddate")
        .setNotification(
          "End date must be greater than start date.",
          "invalid-end-date"
        );
      formContext
        .getControl("*****_startdate")
        .setNotification(
          "Start date must be before the end date.",
          "invalid-start-date"
        );
      return false;
    } else {
      formContext
        .getControl("*****_enddate")
        .clearNotification("invalid-end-date");
      formContext
        .getControl("*****_startdate")
        .clearNotification("invalid-start-date");
      return true;
    }
  }
}).call(ScheduleDateValidation);
