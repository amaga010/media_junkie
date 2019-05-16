function getPopularMedia() {
  var queryURL = "https://api.themoviedb.org/3/trending/movie/day?api_key=ffb937069845c6fafb524eb3edfed81c";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    $('#popMovie').attr('src', 'https://image.tmdb.org/t/p/w370_and_h556_bestv2/' + response.results[0].backdrop_path);
    $('#popMovieTitle').html(response.results[0].title);
  });

  var queryURL = "https://api.themoviedb.org/3/trending/tv/day?api_key=ffb937069845c6fafb524eb3edfed81c";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    $('#popTv').attr('src', 'https://image.tmdb.org/t/p/w370_and_h556_bestv2/' + response.results[0].backdrop_path);
    $('#popTvTitle').html(response.results[0].name);
  });

  var queryURL = "https://api.themoviedb.org/3/trending/tv/day?api_key=ffb937069845c6fafb524eb3edfed81c";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    for (i = 2; i < 5; i++) {
      $('#trending' + i).html(response.results[i].name);
    }
    console.log(response.results[2]);
    $('#trending').attr('src', 'https://image.tmdb.org/t/p/w370_and_h556_bestv2/' + response.results[2].backdrop_path)
  });
};

getPopularMedia();