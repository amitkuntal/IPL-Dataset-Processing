const writeJson= require('./index.js')

function matchesPerYear(matchesJson)
{
    let result=matchesJson.reduce((obj,match)=>{
        obj[match['season']] = (obj[match['season']] || 0)+1;
        return obj;
      },{});
    writeJson.writeJSONFile(result,'matchesPerYear');   
}

function matchesWonPerTeamForAllYear(matchesJson)
{
    let result=matchesJson.reduce((obj,match)=>{
        if(obj[match['winner']]==undefined)
        {
          obj[match['winner']]={};
        }
          obj[match['winner']][match['season']] = (obj[match['winner']][match['season']] || 0)+1;
        return obj;
      },{});
    writeJson.writeJSONFile(result,'matchesWonPerTeamForAllYear');
}


module.exports={matchesPerYear,matchesWonPerTeamForAllYear}