var showResume = function (d) {
  $("#pdfholder").css({"display": "block"});
};

var dropResume = function (d) {
  $("#pdfholder").css({"display": "none"});
};

$("#resume-button").on("click", showResume);
$("#noresume").on("click", dropResume);
