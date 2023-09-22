const axios = require("axios");
const {response} = require("express");

const websiteURL = process.env.WEBSITE_URL;


function getRecipeInfo(id){
    return new Promise((resolve, reject) => {

        axios.get(websiteURL + "/recipes/" + id + "/information",{
            params:{
                apiKey: process.env.API_KEY,
                includeNutrition: true
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

function parseRecipeData(data){
    const vegetarian = data["vegetarian"]
    const vegan = data["vegan"]
    const glutenFree = data["glutenFree"]
    const dairyFree = data["dairyFree"]
    const extendedIngredients = data["extendedIngredients"]
    const extendedIngredientsResult = []
    for(let i=0; i<extendedIngredients.length; i++){
        extendedIngredientsResult[i] = {
            name: extendedIngredients[i]["name"],
            amount: extendedIngredients[i]["measures"]["metric"]["amount"],
            unit: extendedIngredients[i]["measures"]["metric"]["unitShort"]
        }
    }
    const title = data["title"]
    const readyMinutes = data["readyInMinutes"]
    const servings = data["servings"]
    const imageURL = data["image"]
    const summary = data["summary"]
    const winePairingText = data["winePairing"]["pairingText"]

    return {
        vegetarian: vegetarian,
        vegan: vegan,
        glutenFree: glutenFree,
        dairyFree: dairyFree,
        extendedIngredients: extendedIngredientsResult,
        title: title,
        readyMinutes: readyMinutes,
        servings: servings,
        imageURL: imageURL,
        summary: summary,
        winePairingText: winePairingText,
    }
}

module.exports = {getRecipeInfo, parseRecipeData}