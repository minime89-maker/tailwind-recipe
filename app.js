'use strict';

const burger = document.querySelector('#burger')
const menu = document.querySelector('#menu')
const searchBtn = document.querySelector('#search-btn')
const mealList = document.querySelector('.meal')
const recipeBtn = document.querySelector('#recipe-btn')
let searchInput = document.getElementById('search-input')
const key = config.api


//recipe card template
searchInput.addEventListener('keyup', (e) => {
	if (e.keyCode === 13) {
		searchInput = e.target.value
		const getRecipe = async () => {
			await fetch(`https://api.edamam.com/search?q=${searchInput}&app_id=b0c93240&app_key=${key}`)
				.then(response => {
					if(response.ok){
						return response.json()
						} throw new Error('Request failed!')
					}, err => {
						console.log(err.message)
					})
				.then(data => {
					console.log(data.hits)
					let html = ''
					if (data.hits) {
						data.hits.forEach(hit => {
							let ingredients = hit.recipe.ingredients
							let cal = hit.recipe.calories
							let lis = ''
							const listOfIngredients = ingredients.map(data => {
								return `<li class='list-none'>${data.text}</li>`
							})
							console.log({ listOfIngredients })
							html += ` 
						<div class='wrap'>
							<div class="rounded-2xl mx-auto max-w-sm overflow-hidden shadow-lg text-gray-700">
							<img class="object-cover mx-auto w-screen h-80 transform transition-all duration-500 scale-100 hover:scale-150 hover:rotate-12" src="${hit.recipe.image}" alt="img cake">
						</div>
						<div class="bg-white py-8 px-8 text-left rounded-xl shadow-lg transform -translate-y-24 sm:-translate-y-24 max-w-xs mx-auto">
							<h2 class="font-semibold text-4xl mb-4">${hit.recipe.label}</h2>
							
							<ol class='list-disc mb-6'>
								${listOfIngredients.join('')}
							</ol>

							<div class='flex items-center justify-between'>
							<a href='${hit.recipe.url}' class='bg-red-400 hover:bg-red-700 text-lg font-bold text-white text-ls py-2 px-4 rounded' target='_blank'>See more</a>
							<div class='flex direction-column items-center'>
							<ul>
								<li class='font-black text-xs text-gray-400'>#${hit.recipe.totalTime} min.</li>
								<li class='font-black text-xs text-gray-400'>#${cal.toFixed()}cal</li>
								<li class='font-black text-xs text-gray-400'>#${hit.recipe.cuisineType === undefined ? 'unknown' : hit.recipe.cuisineType}</li>
							</ul>
							</div>
							</div>
						</div>
						</div>
						
					`;
						})
					} 
					mealList.innerHTML = html
				})
		}
		getRecipe()
	} else if(e.keyCode === 13 && searchInput.length < 3) {
		alert(`Don't stay hungry 🍽`)
	}
}
)