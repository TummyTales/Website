const axios = require("axios");
const {response} = require("express");

const websiteURL = process.env.WEBSITE_URL;


function getInstructions(id){
    return new Promise((resolve, reject) => {

        axios.get(websiteURL + "/recipes/" + id + "/analyzedInstructions",{
            params:{
                apiKey: process.env.API_KEY,
                stepBreakdowm: true
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

function parseInstructions(data){
    const extendedInstructions=data[0]["steps"]
    const instructionsResult = []
    for(let i=0; i<extendedInstructions.length; i++){
        instructionsResult[i] = {
            number: extendedInstructions[i]["number"],
            step: extendedInstructions[i]["step"]
        }
    }


    return {

        instructions: instructionsResult,

    }
}

module.exports = {getInstructions, parseInstructions}