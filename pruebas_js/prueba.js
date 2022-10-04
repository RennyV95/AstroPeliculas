const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY  = 'api_key=fd7402172ca9f36816c7691becaf455f';
const LANG_ES  = '&language=es-MX';
const LANG_EN  = '&language=en-US';
const MOVIE_ID = '718930';
const API_URL  = BASE_URL+'/movie/'+MOVIE_ID+'?'+API_KEY+'&append_to_response=videos'+LANG_EN;
getTrailer_a(API_URL);
function getTrailer_a(url){
	fetch(url).then(res => res.json()).then(data => {
		const trailers = data.videos.results.filter(video => video.official === true && video.type === "Trailer");
		console.log(trailers);
		showTrailers(trailers)
	})
}

const main = document.getElementById('youtubeES');
function showTrailers(data) {
	main.innerHTML = '';

	data.forEach(trailer => {
		const {key, site, type, name} = trailer;
		const trailersEL = document.createElement('div');
		trailersEL.classList.add('trailer');
		trailersEL.innerHTML = `
					<div class="boton_1">📽&nbsp;Trailer&nbsp;Oficial&nbsp;📽&nbsp;:&nbsp;${name}&nbsp;-&nbsp;<a href="https://www.youtube.com/watch?v=${key}" target="_blank">https://www.youtube.com/watch?v=${key}</a></div>
		`

		main.appendChild(trailersEL);
	})
}