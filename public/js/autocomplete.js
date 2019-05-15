$(function () {
  $("#q").focus(); //Focus on search field
  $("#q").autocomplete({
    minLength: 0,
    delay: 5,
    source: "suggest.php",
    focus: function (event, ui) {
      $(this).val(ui.item.value);
      return false;
    },
    select: function (event, ui) {
      $(this).val(ui.item.value);
      return false;
    }
  }).data("uiAutocomplete")._renderItem = function (ul, item) {
    return $("<li></li>")
      .data("item.autocomplete", item)
      .append("<a>" + (item.img ? "<img class='imdbImage' src='imdbImage.php?url=" + item.img + "' />" : "") + "<span class='imdbTitle'>" + item.label + "</span>" + (item.cast ? "<br /><span class='imdbCast'>" + item.cast + "</span>" : "") + "<div class='clear'></div></a>")
      .appendTo(ul);
  };
});