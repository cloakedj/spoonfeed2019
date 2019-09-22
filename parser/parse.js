const Parser = require('rss-parser');
const rssSources = require("../config/rss");
const mongoose = require("mongoose");
const stripTags = require("striptags");
const pModel = require("../models/post"); 
const metaImage = require('metascraper')([require("metascraper-image")()]);
const got =require('got');
const parser = new Parser({
    defaultRSS: 2.0,
    xml2js:{
        ignoreAttrs : true, 
        mergeAttrs : false
    }
});


let parsedData = async (parseUrl) => {
    let feed = await parser.parseURL(parseUrl);
    let getImage = async (uri) =>{
        const { body: html, url } = await got(uri);
        const metadata = await metaImage({ html, url });
        return await metadata.image;
    }
    feed.items.forEach(item => {
            async function insertPostObj(){       
            let postDetObj = new pModel({
            postTitle:item.title,
            postSource:feed.title,
            postTags:item.categories,
            postLink:item.link,
            postDescription:item.contentSnippet,
            postDate:item.pubDate,
            postImageSrc:await getImage(item.link)
        });
        // const result = await postDetObj.save();
        // console.log(result);
    }
    insertPostObj();
    });
}


let changeSource = (async () =>{
try
{
JSON.parse(JSON.stringify(rssSources),(key,value)=>{
    parsedData(value);
});
}catch(err)
{
    console.log(err);
}
})();



module.exports = changeSource;
