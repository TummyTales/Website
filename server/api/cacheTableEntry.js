
const Cache=require('../models/cacheTable');

async function cacheEntry(parsedData, email){
    await Cache.deleteMany({email:email});

    parsedData.map(async (recipeData) => {
        const name=recipeData.name;
        const imageLink=recipeData.imageLink;
        const recipeLink=recipeData.recipeLink;
       
        const cache = new Cache({
           email:email,
           name: name,
           imageLink:imageLink,
           recipeLink: recipeLink, 

        });
        await cache.save();
    })

}

module.exports={cacheEntry};