// CONSTANTS

const URL = 'https://cocktail-by-api-ninjas.p.rapidapi.com/v1/cocktail?ingredients=';

// VARIABLES

// CACHED ELEMENTS

const $input = $('form');
const $ingredient = $('input[type="text"]');

// EVENT LISTENERS

$input.on('submit', getData);

// FUNCTIONS

function getData(evt) {
	evt.preventDefault();
	search = $ingredient.val();
	console.log(search);
	if (search === '') return;
	$ingredient.val('');

	$.ajax({
		async: true,
		crossDomain: true,
		url: URL + $ingredient,
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': 'bd64087a19msh36bd46abdf80a34p10b874jsn05bd909764e0',
			'X-RapidAPI-Host': 'cocktail-by-api-ninjas.p.rapidapi.com',
		},
	}).then(
		function (list) {
			console.log(list);
		},
		(error) => {
			console.log(error);
		},
	);
}
