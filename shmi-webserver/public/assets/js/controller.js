//Expanding tree-element
$(".caret").click(function() {
  var active = $(this)
    .closest("li")
    .find(".nested:first")
    .hasClass("active");
  if (!active) {
    $(this)
      .closest("li")
      .find(".nested:first")
      .slideDown();
  } else {
    $(this)
      .closest("li")
      .find(".nested:first")
      .slideUp();
  }
  $(this)
    .closest("li")
    .find(".nested:first")
    .toggleClass("active");
  $(this).toggleClass("caret-down");
});
