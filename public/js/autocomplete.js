
$('#netflixRec').on('focus', function () {
  $('#searchResults1').css('visibility', 'visible');
});
$("#netflixRec").on("keyup", function (event) {
  event.preventDefault();
  $('#searchResults1').html('');
  var searchTerm = $("#netflixRec").val();
  var queryURL = "https://api.themoviedb.org/3/search/multi?api_key=ffb937069845c6fafb524eb3edfed81c&language=en-US&query=" + searchTerm;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    $("#netflixRec").text(JSON.stringify(response));
    for (i = 0; i < 5; i++) {
      if (response.results[i].media_type === 'movie') {
        $("#searchResults1").append('<div value="' + response.results[i].title + '" id="prediction' + i + '" class="result">');
        $('#prediction' + i).append('<div><img class="searchPoster" src="https://image.tmdb.org/t/p/w370_and_h556_bestv2/' + response.results[i].poster_path + '"></div><div><div>' + response.results[i].title + '</div><div>' + response.results[i].release_date.split("-")[0] + '</div></div>');
      } else {
        $("#searchResults1").append('<div value="' + response.results[i].name + '" id="prediction' + i + '" class="result">');
        $('#prediction' + i).append('<div><img class="searchPoster" src="https://image.tmdb.org/t/p/w370_and_h556_bestv2/' + response.results[i].poster_path + '"></div><div><div>' + response.results[i].name + '</div><div>' + response.results[i].first_air_date.split("-")[0] + '</div></div>');
      }
    };
    $('.result').click(function () {
      let title = $(this).attr('value');
      $('#netflixRec').val('');
      $('#netflixRec').val(title);
      $('#searchResults1').css('visibility', 'hidden');
      $(".result").off();
    });
  });
});

$('#huluRec').on('focus', function () {
  $('#searchResults2').css('visibility', 'visible');
});
$("#huluRec").on("keyup", function (event) {
  event.preventDefault();
  $('#searchResults2').html('');
  var searchTerm = $("#huluRec").val();
  var queryURL = "https://api.themoviedb.org/3/search/multi?api_key=ffb937069845c6fafb524eb3edfed81c&language=en-US&query=" + searchTerm;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    $("#huluRec").text(JSON.stringify(response));
    for (i = 0; i < 5; i++) {
      if (response.results[i].media_type === 'movie') {
        $("#searchResults2").append('<div value="' + response.results[i].title + '" id="prediction' + i + '" class="result">');
        $('#prediction' + i).append('<div><img class="searchPoster" src="https://image.tmdb.org/t/p/w370_and_h556_bestv2/' + response.results[i].poster_path + '"></div><div><div>' + response.results[i].title + '</div><div>' + response.results[i].release_date.split("-")[0] + '</div></div>');
      } else {
        $("#searchResults2").append('<div value="' + response.results[i].name + '" id="prediction' + i + '" class="result">');
        $('#prediction' + i).append('<div><img class="searchPoster" src="https://image.tmdb.org/t/p/w370_and_h556_bestv2/' + response.results[i].poster_path + '"></div><div><div>' + response.results[i].name + '</div><div>' + response.results[i].first_air_date.split("-")[0] + '</div></div>');
      }
    };
    $('.result').click(function () {
      let title = $(this).attr('value');
      $('#huluRec').val('');
      $('#searchResults2').css('visibility', 'hidden');
      $('#huluRec').val(title);
      $(".result").off();
    });
  });
});

$('#amazonRec').on('focus', function () {
  $('#searchResults3').css('visibility', 'visible');
});
$("#amazonRec").on("keyup", function (event) {
  event.preventDefault();
  $('#searchResults3').html('');
  var searchTerm = $("#amazonRec").val();
  var queryURL = "https://api.themoviedb.org/3/search/multi?api_key=ffb937069845c6fafb524eb3edfed81c&language=en-US&query=" + searchTerm;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    $("#movie").text(JSON.stringify(response));
    for (i = 0; i < 5; i++) {
      if (response.results[i].media_type === 'movie') {
        $("#searchResults3").append('<div value="' + response.results[i].title + '" id="prediction' + i + '" class="result">');
        $('#prediction' + i).append('<div><img class="searchPoster" src="https://image.tmdb.org/t/p/w370_and_h556_bestv2/' + response.results[i].poster_path + '"></div><div><div>' + response.results[i].title + '</div><div>' + response.results[i].release_date.split("-")[0] + '</div></div>');
      } else {
        $("#searchResults3").append('<div value="' + response.results[i].name + '" id="prediction' + i + '" class="result">');
        $('#prediction' + i).append('<div><img class="searchPoster" src="https://image.tmdb.org/t/p/w370_and_h556_bestv2/' + response.results[i].poster_path + '"></div><div><div>' + response.results[i].name + '</div><div>' + response.results[i].first_air_date.split("-")[0] + '</div></div>');
      }
    };
    $('.result').click(function () {
      let title = $(this).attr('value');
      $('#amazonRec').val('');
      $('#amazonRec').val(title);
      $('#searchResults3').css('visibility', 'hidden');
      $(".result").off();
    });
  });
});