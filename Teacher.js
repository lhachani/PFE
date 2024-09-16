// Namespace: Teacher
var Teacher = window.Teacher || {};

(function () {
  // Helper function for validation and clearing notifications
  this.validateAndClearNotification = function (
    formContext,
    fieldName,
    regexPattern,
    errorMessage,
    notificationId
  ) {
    var fieldValue = formContext.getAttribute(fieldName).getValue();
    var fieldControl = formContext.getControl(fieldName);

    if (!regexPattern.test(fieldValue)) {
      fieldControl.setNotification(errorMessage, notificationId);
      return false;
    } else {
      fieldControl.clearNotification(notificationId);
      return true;
    }
  };

  // Event Functions
  this.onSave = function (executionContext) {
    // Get the form context
    var formContext = executionContext.getFormContext();

    // Validate the input fields
    var isFirstNameValid = this.validateAndClearNotification(
      formContext,
      "*****_firstname",
      /^[A-Za-z\- ]+$/,
      "The First Name field must contain only characters from the alphabet. Numbers and special characters (except for the dash '-') are forbidden.",
      "invalid-firstname"
    );

    var isLastNameValid = this.validateAndClearNotification(
      formContext,
      "*****_lastname",
      /^[A-Za-z\- ]+$/,
      "The Last Name field must contain only characters from the alphabet. Numbers and special characters (except for the dash '-') are forbidden.",
      "invalid-lastname"
    );

    var isEmailValid = this.validateAndClearNotification(
      formContext,
      "*****_emailaddress",
      /^[\w\.\-]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
      "The Email Address field must have an email address format.",
      "invalid-email"
    );

    var isPhoneValid = this.validateAndClearNotification(
      formContext,
      "*****_phonenumber",
      /^\d{8}$/,
      "The Phone Number must be 8 digits long.",
      "invalid-phone"
    );

    // If any of the input fields are invalid, return false
    if (
      !isFirstNameValid ||
      !isLastNameValid ||
      !isEmailValid ||
      !isPhoneValid
    ) {
      return false;
    }

    // Concatenate First Name and Last Name to create Full Name
    var firstName = formContext.getAttribute("*****_firstname").getValue();
    var lastName = formContext.getAttribute("*****_lastname").getValue();
    var fullName = firstName + " " + lastName;

    // Set the value of the Full Name field
    formContext.getAttribute("*****_name").setValue(fullName);

    return true;
  };

  // Add change event handlers for the input fields
  this.onFirstNameChange = function (executionContext) {
    var formContext = executionContext.getFormContext();
    formContext
      .getControl("*****_firstname")
      .clearNotification("invalid-firstname");
  };

  this.onLastNameChange = function (executionContext) {
    var formContext = executionContext.getFormContext();
    formContext
      .getControl("*****_lastname")
      .clearNotification("invalid-lastname");
  };

  this.onEmailChange = function (executionContext) {
    var formContext = executionContext.getFormContext();
    formContext
      .getControl("*****_emailaddress")
      .clearNotification("invalid-email");
  };

  this.onPhoneChange = function (executionContext) {
    var formContext = executionContext.getFormContext();
    formContext
      .getControl("*****_phonenumber")
      .clearNotification("invalid-phone");
  };
}).call(Teacher);
