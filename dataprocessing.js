const writeJson= require('./index.js')

function matchesPerYear(matchesJson)
{
    let result=matchesJson.reduce((obj,match)=>{
        obj[match['season']] = (obj[match['season']] || 0)+1;
        return obj;
      },{});
    writeJson.writeJSONFile(result,'matchesPerYear');   
}



module.exports={matchesPerYear}