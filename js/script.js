// CONSTANTS

const URL = 'https://cocktail-by-api-ninjas.p.rapidapi.com/v1/cocktail?ingredients=';

// VARIABLES

// CACHED ELEMENTS

const $input = $('form');
const $ingredient = $('input[type="text"]');
const $list = $('#list');
const $instructions = $('#instructions');
const $parts = $('#parts');

// EVENT LISTENERS

$input.on('submit', getData);

// FUNCTIONS

function getData(evt) {
	evt.preventDefault();
	const search = $ingredient.val();
	console.log(search);
	if (search === '') return;
	$ingredient.val('');

	$.ajax({
		async: true,
		crossDomain: true,
		url: URL + search,
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': 'bd64087a19msh36bd46abdf80a34p10b874jsn05bd909764e0',
			'X-RapidAPI-Host': 'cocktail-by-api-ninjas.p.rapidapi.com',
		},
	}).then(
		function (list) {
			console.log(list);
			$list.html('<ul></ul>');
			$parts.html('<ul></ul>');
			for (const cocktail of list) {
				let item = cocktail.name;
				let itemArr = item.split(' ');
				for (let i = 0; i < itemArr.length; i++) {
					itemArr[i] = itemArr[i].charAt(0).toUpperCase() + itemArr[i].slice(1);
					if (itemArr[i].charAt(0) === '(') {
						itemArr[i] = '(' + itemArr[i].charAt(1).toUpperCase() + itemArr[i].slice(2);
					}
				}
				let item2 = itemArr.join(' ');
				$list.append(`<li>${item2}</li>`);
				let steps = cocktail.instructions;
				let menu = cocktail.ingredients;
				$parts.append(`<li>${menu}</li>`);
				$instructions.append(`${steps}<br>`);
			}
		},
		(error) => {
			console.log(error);
		},
	);
}

// Makes input field fit placeholder, centers text

$('input[placeholder]').each(function () {
	$(this).attr('size', $(this).attr('placeholder').length);
	$(this).css('textAlign', 'center');
});
