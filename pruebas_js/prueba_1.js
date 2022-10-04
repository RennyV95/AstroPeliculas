const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY  = 'api_key=fd7402172ca9f36816c7691becaf455f';
const LANG_ES  = '&language=es-MX';
const LANG_EN  = '&language=en-US';
const MOVIE_ID = '346364';
//const API_URL = BASE_URL+'/discover/movie?primary_release_year=2022&'+API_KEY+LANG_ES;
//const API_URL = BASE_URL+'/discover/movie?'+API_KEY+'&append_to_response=videos'+LANG_ES;
const API_URL_a = BASE_URL+'/movie/'+MOVIE_ID+'?'+API_KEY+'&append_to_response=videos'+LANG_EN;
const API_URL_b = BASE_URL+'/movie/'+MOVIE_ID+'?'+API_KEY+'&append_to_response=videos'+LANG_ES;

getTrailer_a(API_URL_a);

function getTrailer_a(url){

	fetch(url).then(res => res.json()).then(data => {

		const trailers = data.videos.results.filter(video => video.official === true && video.type === "Trailer");
		console.log(trailers);
	})

}

getTrailer_a(API_URL_a);

function getTrailer_a(url){

	fetch(url).then(res => res.json()).then(data => {

		const trailers = data.videos.results.filter(video => video.official === true && video.type === "Trailer");
		console.log(trailers);
	})

}