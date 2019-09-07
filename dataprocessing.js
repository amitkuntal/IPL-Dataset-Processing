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


function extraRunConductedInYear(matches,deliveries,year)
{
  let matchId=matches.filter((match)=>match.season==year).map((match)=> match.id);

  let result = deliveries.reduce((obj,delivery)=>
  {
    if(matchId.includes(delivery['match_id']))
    {
      obj[delivery['bowling_team']]=(obj[delivery['bowling_team']] || 0)+parseInt(delivery['extra_runs']);
    }
    return obj;
  },{})


  writeJson.writeJSONFile(result,'extraRunConductedInYear');
}


module.exports={matchesPerYear,matchesWonPerTeamForAllYear,extraRunConductedInYear}