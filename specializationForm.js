//namespace: specializationForm
var specializationForm = window.specializationForm || {};

(function () {
  //Event Functions
  this.onChange = function (executionContext) {
    showHideRelatedSpecializationTab(executionContext);
  };
  this.onSave = function (executionContext) {
    setAbbreviationToUppercase(executionContext);
  };
  this.onLoad = function (executionContext) {
    showHideRelatedSpecializationTab(executionContext);
  };

  function showHideRelatedSpecializationTab(executionContext) {
    // Get the form context
    var formContext = executionContext.getFormContext();

    // Get the 'type' field value
    var typeValue = formContext.getAttribute("*****_type").getValue();

    // Get the tab containing the Related Specialization section
    var relatedSpecializationTab = formContext.ui.tabs.get(
      "relatedSpecializationTab"
    );

    // Check if the 'type' field value is Major or Both
    if (typeValue === 857870001 || typeValue === 857870002) {
      // Show the tab
      relatedSpecializationTab.setVisible(true);
    } else {
      // Hide the tab
      relatedSpecializationTab.setVisible(false);
    }
  }

  function setAbbreviationToUppercase(executionContext) {
    // Get the form context
    var formContext = executionContext.getFormContext();

    // Get the 'abbreviation' field value
    var abbreviationValue = formContext
      .getAttribute("*****_abbreviations")
      .getValue();

    // Check if the 'abbreviation' field has a value
    if (abbreviationValue) {
      // Set the 'abbreviation' field value to uppercase
      formContext
        .getAttribute("*****_abbreviations")
        .setValue(abbreviationValue.toUpperCase());
    }
  }
}).call(specializationForm);
