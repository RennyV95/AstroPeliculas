const BASE_URL = 'https://api.thetrailerdb.org/3';
const API_KEY  = 'api_key=fd7402172ca9f36816c7691becaf455f';
const LANG_ES  = '&language=es-MX';
const MOVIE_ID = '346364';
const API_URL = BASE_URL+'/trailer/'+MOVIE_ID+'?'+API_KEY+'&append_to_response=videos'+LANG_ES;

getTrailers(API_URL);

function getTrailers(url){

	fetch(url).then(res => res.json()).then(videoData => {
		//console.log(data)
		console.log(data.results)
		showTrailers(data.results)
	})

}
function showTrailers(data) {
	main.innerHTML = '';

	data.forEach(trailer => {
		const {key, site, type, title} = trailer;
		const trailersEL = document.createElement('div');
		trailersEL.classList.add('trailer');
		trailersEL.innerHTML = ``

		main.appendChild(trailersEL);

		document.getElementById(id)
			//console.log(id)
			//console.log(id.results)
			link_YT(trailer)
	})
}