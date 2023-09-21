const Cache= require('../models/cacheTable');

async function cacheEntry(parsedData, email){
    // await Cache.deleteMany({email:email});
    const rL=parsedData.recipeLink;
    const content=await Cache.find({email:email,recipeLink:rL });
    // console.log(content);
    if(content.length>0){
        return;
    }
    else{
        const result = await Cache.countDocuments({ email: email });
        if(result>=5){
            const earliestEntry = await Cache.findOne({ email }).sort('createdAt');
            await Cache.findByIdAndRemove(earliestEntry._id);
        }
        const name=parsedData.name;
        const imageLink=parsedData.imageLink;
        const recipeLink=parsedData.recipeLink;
        const date=new Date();
        const cache = new Cache({
            email:email,
            name: name,
            imageLink:imageLink,
            recipeLink: recipeLink, 
            createdAt: date,
        });
        await cache.save()
    }
   

}

module.exports={cacheEntry};