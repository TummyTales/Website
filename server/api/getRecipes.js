const axios = require("axios");
const {response} = require("express");
const websiteURL = process.env.WEBSITE_URL;

// This function sends a GET request to the required API to get the
function getAllRecipesFromIngredientList(ingredientsList) {
    return new Promise((resolve, reject) => {
        let ingredientsParam = ingredientsList[0];

        // the ingredients param should be in the format ->  chicken, cheese, rice
        for (let i = 1; i < ingredientsList.length; i++) {
            ingredientsParam += ", +" + ingredientsList[i];
        }

        axios.get(websiteURL + '/food/search', {
            params: {
                apiKey: process.env.API_KEY,
                query: ingredientsParam,
                number: 5
            }
        })
            .then(function (response) {
                resolve(response.data);
            })
            .catch(function (error) {
                console.error(error);
                reject(error);
            });

    });

}

// This function parses the JSON data received as response, and cleans it and returns the necessary data
function parseRecipes(response){
    const searchResults = response["searchResults"];
    const recipes = searchResults[0];
    const results = recipes["results"]
    const finalData = []
    for(let i= 0; i<results.length; i++){
        finalData[i] = {
            id: results[i]["id"],
            name: results[i]["name"],
            imageLink: results[i]["image"],
            recipeLink: results[i]["link"],
            content: results[i]["content"]
        }
    }
    return finalData;
}

module.exports = {getAllRecipesFromIngredientList, parseRecipes};
