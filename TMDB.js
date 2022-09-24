//TMDB

const years = ["1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"];
const random = Math.floor(Math.random() * years.length);


const API_KEY = 'api_key=fd7402172ca9f36816c7691becaf455f';
const BASE_URL = 'https://api.themoviedb.org/3';
const LANG_ES = '&language=es-MX';
const LANG_EN = '&language=en-US';
//const API_URL = BASE_URL+'/discover/movie?primary_release_year='+years[random]+'&'+API_KEY+LANG_ES;
const API_URL = BASE_URL+'/discover/movie?'+API_KEY+'&append_to_response=videos'+LANG_ES;
const IMG_URL = 'https://image.tmdb.org/t/p/original';

const search_URL = BASE_URL+'/search/movie?'+API_KEY;
const form =	document.getElementById('form');
const search = document.getElementById('search');

//const anioEL = document.getElementById('years');
const main = document.getElementById('main');
const trailer_DIV = document.getElementById('trailer');





const genres = [
	{
		"id":28,
		"name":"Acción"
	},
	{
		"id":12,
		"name":"Aventura"
	},
	{
		"id":16,
		"name":"Animación"
	},
	{
		"id":35,
		"name":"Comedia"
	},
	{
		"id":80,
		"name":"Crimen"
	},
	{
		"id":99,
		"name":"Documental"
	},
	{
		"id":18,
		"name":"Drama"
	},
	{
		"id":10751,
		"name":"Familia"
	},
	{
		"id":14,
		"name":"Fantasía"
	},
	{
		"id":36,
		"name":"Historia"
	},
	{
		"id":27,
		"name":"Terror"
	},
	{
		"id":10402,
		"name":"Música"
	},
	{
		"id":9648,
		"name":"Misterio"
	},
	{
		"id":10749,
		"name":"Romance"
	},
	{
		"id":878,
		"name":"Ciencia ficción"
	},
	{
		"id":10770,
		"name":"Película de TV"
	},
	{
		"id":53,
		"name":"Suspenso"
	},
	{
		"id":10752,
		"name":"Bélica"
	},
	{
		"id":37,
		"name":"Western"
	}]

const TrailesC = [
	{
		'site':'YouTube',
		'type':'Trailer'
	}
]

getMovies(API_URL);

function getMovies(url){

	fetch(url).then(res => res.json()).then(data =>{
		//console.log(data)
		console.log(data.results)
		showMovies(data.results)
	})

}
function showMovies(data) {
	main.innerHTML = '';

	data.forEach(movie => {
		const {key, site, type, title, original_language, release_dates, original_title, backdrop_path, poster_path, release_date, vote_average, overview, id, genre_ids} = movie;
		const genreIdToName = (id) => genres.find(g => g.id === id).name
		var replaceTitle = { ":":"", " ":"_", "-":"_", "¡":"", "!":"", ",":"", "¿":"" };
		var replaceLang = { "en":"🇺🇸&nbsp;&#42;#Ingles", "fr":"🇫🇷&nbsp;&#42;#Frances", "it":"🇮🇹&nbsp;&#42;#Italiano", "de":"🇩🇪&nbsp;&#42;#Aleman", "ja":"🇯🇵&nbsp;&#42;#Japones", "es":"🇲🇽&nbsp;&#42;#Español", "ko":"🇰🇷 / 🇰🇵&nbsp;&#42;#Coreano" };
		const moviesEL = document.createElement('div');
		moviesEL.classList.add('movie');
		moviesEL.innerHTML = `
	<div class="movie-card">
			<div class="movie-card__header" style="background-image: url(${IMG_URL+backdrop_path})">
				<span class="movie-card_genre">
					ID: ${id}
				</span>
				<span class="movie-card_genre">
					<a href="https://apo-wposters.herokuapp.com/?url=${IMG_URL+poster_path}" target="_blank">
						P-WaterMark
					</a>
				</span>
				<span class="movie-card_genre">
					<a href="https://apo-wbackdrop.herokuapp.com/?url=${IMG_URL+backdrop_path}" target="_blank">
						B-WaterMark
					</a>
				</span>
				<span class="movie-card_genre">
					<a href="https://www.themoviedb.org/movie/${id}/" target="_blank">
						Toda la información
					</a>
				</span>
			</div>
		<div class="movie-card_content">
			<a href="${IMG_URL+poster_path}">
				<div class="movie-card__poster" style="background-image: url(${IMG_URL+poster_path})"></div>
			</a>
			<div class="d">




				<div class="contenedor border">
					/rename ${title.replace(/:|\s|-|!|¡|,|¿/g,function(match) {return replaceTitle[match];})}_(${release_date.substring(4,0)})_720p_dual-lat_@AstroPeliculasOficial.mp4
				</div>
				<div class="contenedor border">
					<div class="titulo_es">
						<b>
							🔠&nbsp;&#42;#${title.replace(/:|\s|-|!|¡|,|¿/g,function(match) {return replaceTitle[match];}).substring(1,0)}&#42;
						</b>
					</div>
					<div class="titulo_es">
						<b>
							🍿&nbsp;&#42;${title}&#42;
						</b>
					</div>
					<div class="titulo_en"><b>📽&nbsp;&#95;<i>${original_title}</i>&#95;</b></div>
					<div class="separador">▬▬▬▬▬▬▬▬▬▬▬▬▬▬</div>
					<div class="puntuacion"><b>🔝&nbsp;&#42;Puntuación TMDB&nbsp;|&#42;</b>&nbsp;&#42;<span style="color:${getColor(vote_average)}">${vote_average}</span>&#42;</div><br>
					<div class="genero"><b>🎭&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#42;Género&nbsp;|&#42;</b>&nbsp;&#42;${genre_ids.map(id => `#${genreIdToName(id).replace(/\s/g,function(match) {return replaceTitle[match];})}`).join(' ')}&#42;</div><br>
					<div class="ano"><b>🗓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#42;Año&nbsp;|&#42;</b>&nbsp;&#95;<i>${release_date.substring(4,0)}</i>&#95;</div><br>
					<div class="calidad"><b>📺&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#42;Calidad&nbsp;|&#42;&nbsp;&#42;#720p&#42;</b></div><br>
					<div class="idioma"><b>🗣&nbsp;&#42;Idioma Original&nbsp;|&#42;&nbsp;${original_language.replace(/en|fr|it|de|ja|es|ko/g,function(match) {return replaceLang[match];})}&#42;</b></div><br>
					<div class="audio"><b>🎧&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#42;Audio&nbsp;|&#42;&nbsp;🇲🇽&nbsp;&#42;#Latino&#42;</b></div><br>
					<div class="Sinopsis"><b>📝&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#42;Sinopsis&nbsp;|&#42;</b>&nbsp;<code>&#96;${overview}&#96;</code></div>
					<div class="separador">▬▬▬▬▬▬▬▬▬▬▬▬▬▬</div>
					<div class="redes"><b>▫️&nbsp;&#42;Síguenos&nbsp;como&#42;&nbsp;@AstroPeliculasOficial</b></div>
				</div>
				<div class="contenedor border">
					<div class="boton_1">👨‍🚀&nbsp;Cᴏɴᴛᴇɴᴇᴅᴏʀ&nbsp;👨‍🚀&nbsp;-&nbsp;https://t.me/+SG2n3GGMBEg3ZDAx</div>
					<div class="boton_2">Aᴘᴏʏᴀ&nbsp;Eʟ&nbsp;Cᴀɴᴀʟ&nbsp;-&nbsp;https://ouo.io/O5SMpM||Hᴀᴢ&nbsp;Tᴜs&nbsp;ᴘᴇᴛɪᴄɪᴏɴᴇs&nbsp;-&nbsp;@AstroPeliculasbot</div>
					<div class="boton_3">➡️&nbsp;Vᴇʀ&nbsp;/&nbsp;Dᴇsᴄᴀʀɢᴀʀ&nbsp;⬅️&nbsp;-&nbsp;https://t.me/c/1563307766/</div>
				</div>
				<div class="contenedor border">
					<div class="titulo_es"><b>🍿&nbsp;&#42;${title}&#42;</b></div>
					<div class="titulo_en"><b>📽&nbsp;&#95;<i>${original_title}</i>&#95;</b></div>
					<div class="separador">▬▬▬▬▬▬▬▬▬▬▬▬▬▬</div>
					<div class="puntuacion"><b>🔝&nbsp;&#42;Puntuación TMDB&nbsp;|&#42;</b>&nbsp;&#42;<span style="color:${getColor(vote_average)}">${vote_average}</span>&#42;</div><br>
					<div class="ano"><b>🗓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#42;Año&nbsp;|&#42;</b>&nbsp;&#95;${release_date.substring(4,0)}&#95;</div><br>
					<div class="calidad"><b>📺&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#42;Calidad&nbsp;|&#42;&nbsp;&#42;#720p&#42;</b></div><br>
					<div class="idioma"><b>🗣&nbsp;&#42;Idioma Original&nbsp;|&#42;&nbsp;${original_language.replace(/en|fr|it|de|ja|es|ko/g,function(match) {return replaceLang[match];})}&#42;</b></div><br>
					<div class="audio"><b>🎧&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#42;Audio&nbsp;|&#42;&nbsp;🇲🇽&nbsp;&#42;#Latino&#42;</b></div>
					<div class="separador">▬▬▬▬▬▬▬▬▬▬▬▬▬▬</div>
					<div class="redes"><b>▫️&nbsp;&#42;Síguenos&nbsp;como&#42;&nbsp;@AstroPeliculasOficial</b></div>
				</div>
				<div class="contenedor border">
					<div class="boton_1">📽&nbsp;Trailer&nbsp;Oficial&nbsp;📽&nbsp;-&nbsp;https://www.youtube.com/watch?v=${key}</div>
					<div class="boton_2">🌎&nbsp;Canal&nbsp;Principal&nbsp;🌎&nbsp;-&nbsp;@AstroPeliculasOficial</div>
					<div class="Boton_3">Apoya&nbsp;el&nbsp;canal&nbsp;-&nbsp;https://ouo.io/O5SMpM||Haz&nbsp;tu&nbsp;petición&nbsp;-&nbsp;@AstroPeliculasbot</div>
				</div>



			</div>
		</div>
	</div>
		`

		main.appendChild(moviesEL);

		document.getElementById(id)
			//console.log(id)
			//console.log(id.results)
			link_YT(movie)
	})
}

function link_YT(movie) {
	let id = movie.id;
	fetch(BASE_URL+'/movie/'+id+'/videos?'+API_KEY+LANG_ES).then(res => res.json()).then(trailer => {
	//fetch(BASE_URL+'/movie/'+id+'?'+API_KEY+'&append_to_response=videos'+LANG_ES).then(res => res.json()).then(trailer => {
		console.log(trailer)
		//console.log(trailer.results)
		//showTrailer(trailer.results)
	})
}


























form.addEventListener('submit', (e) => {
	e.preventDefault();

	const searchTerm = search.value;
		console.log('1 - busqueda: '+searchTerm);

	let params = new URLSearchParams(location.search+'?q='+searchTerm);
		console.log('2 - busqueda: '+params);

	const param = params.get('q');
		console.log('1 - query: '+param);

	console.log('2 - query: '+params.toString(param));

	if(searchTerm) {
		getMovies(search_URL+'&query='+searchTerm+LANG_ES)
	}else{
		getMovies(API_URL);
	}

});


document.getElementById("years").innerHTML = '<center>Peliculas del año: '+years[random]+'</center>';

function getColor(vote) {
	if(vote>= 8){
		return 'green'
	}else if(vote >= 5){
		return "orange"
	}else{
		return 'red'
	}
}
