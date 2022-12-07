// CONSTANTS

const URL = 'https://cocktail-by-api-ninjas.p.rapidapi.com/v1/cocktail?ingredients=';

// VARIABLES

// CACHED ELEMENTS

const $input = $('form');
const $ingredient = $('input[type="text"]');
const $list = $('#list');
const $instructions = $('#instructions');
const $parts = $('#parts');
const $drinkInfo = $('#directions');

// EVENT LISTENERS

$input.on('submit', getData);

// FUNCTIONS

function getData(evt) {
	evt.preventDefault();
	$list.html('');
	$drinkInfo.css('display', 'none');
	$list.css('display', 'block');
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
			if (list.length === 0) {
				console.log('oh no');
				$list.append(
					`<span class="error">Wow! You must be an expert mixologist - we can't find any cocktails with those ingredients. Maybe try a different set?</span>`,
				);
			} else {
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
					let menu = cocktail.ingredients;
					let steps = cocktail.instructions;
					let $newItem = $(
						`<li><input type="radio" name="drinks" id="${item2}" value="${item2}" data-drink="${item2}" data-menu="${menu}" data-steps="${steps}"><label for="${item2}">${item2}</label></li>`,
					);
					$list.append($newItem);
				}
			}
		},
		(error) => {
			console.log(error);
			$list.append(`<span class="error">Oh no, something went wrong! Please try again, we know you're thirsty.</span>`);
		},
	);
}

// Makes input field fit placeholder, centers text

$('input[placeholder]').each(function () {
	$(this).attr('size', $(this).attr('placeholder').length);
	$(this).css('textAlign', 'center');
});

$list.on('click', 'input', getInfo);

function getInfo() {
	console.log($(this).data('steps').split(',').join('\n'));
	$drinkInfo.css('display', 'flex');
	$parts.html($(this).data('menu').split(',').join('<br>'));
	$instructions.html($(this).data('steps').split('.').join('<br>'));
}
