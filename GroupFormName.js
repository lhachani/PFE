// Namespace: GroupFormName
var GroupFormName = window.GroupFormName || {};

(function () {
  // Event Functions
  this.onSave = function (executionContext) {
    var formContext = executionContext.getFormContext();

    // Get the values of the Level, Major, Minor, and Number fields
    var level = formContext.getAttribute("*****_level").getValue();
    var major = formContext.getAttribute("*****_major").getValue();
    var groupNumber = formContext.getAttribute("*****_number").getValue();

    // Initialize the name variable
    var name = "";

    // Set the name based on the Level value
    switch (level) {
      case 857870000: // Freshman
        name = "Fr.Gr" + groupNumber;
        break;
      case 857870001: // Sophomore
        name = "So.Gr" + groupNumber;
        break;
      case 857870002: // Junior
        name = "Ju." + (major ? major[0].name : "") + groupNumber;
        break;
      case 857870003: // Senior
        name = "Se." + (major ? major[0].name : "") + groupNumber;
        break;
    }

    // Set the Name field value
    formContext.getAttribute("*****_name").setValue(name);
  };
}).call(GroupFormName);
