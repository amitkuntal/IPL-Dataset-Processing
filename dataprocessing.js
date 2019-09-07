const writeJson= require('./index.js')

function matchesPerYear(matchesJson)
{
  if(matchesJson.length > 0 && typeof(matchesJson)=='object')
  {
      let result=matchesJson.reduce((obj,match)=>{
          obj[match['season']] = (obj[match['season']] || 0)+1;
          return obj;
        },{});
      //writeJson.writeJSONFile(result,'matchesPerYear'); 
      if(result["undefined"])
      {
        return "Could not find session in current data";
      }
      return JSON.stringify(result);  
    }
    return "You entered empty file or file is not data is not proper format";

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



function economicalBowlersInYears(matches,deliveries,year)
{
  let matchId=matches.filter((match)=>match.season==year).map((match)=> match.id);
  let result=deliveries.reduce((obj,delivery)=>{
    if(matchId.includes(delivery['match_id']))
    {

      if(obj[delivery['bowler']]==undefined)
        {
          obj[delivery['bowler']]={};
        }
        obj[delivery['bowler']]['total_runs']=(obj[delivery['bowler']]['total_runs'] || 0)+ (parseInt(delivery['total_runs']))-((parseInt(delivery['legbye_runs']))+parseInt(delivery['bye_runs']));
        if(delivery['wide_runs']=='0' && delivery['noball_runs']=='0')
        {
          obj[delivery['bowler']]['total_balls']=(obj[delivery['bowler']]['total_balls'] ||0)+1;
        }
    }
    return obj;
  },{})
  var bowlersEconomy=getTopBowlersEconomy(calculateEconomy(result),10);
  
  var getTopBowlers=bowlersEconomy.reduce((result,bowler)=>{
      result[bowler['bowler_name']]=bowler['economy'];
      return result;
    },{})
  
    writeJson.writeJSONFile(getTopBowlers,'economicalBowlersInYears');
}
  
function calculateEconomy(result){

  return Object.entries(result).reduce((acc,el)=>
          {
            var obj={}
            obj['bowler_name']=el[0]
            obj['economy']=el[1]["total_runs"]/(el[1]["total_balls"]/6);
            acc.push(obj);
            return acc;
          },[]).sort(function(obj1, obj2) {
            return obj1.economy - obj2.economy;
          });
}

function getTopBowlersEconomy(bowlersEconomy,count=10)
{
  if(bowlersEconomy.length < count)
  {
    return bowlersEconomy;
  }
  return bowlersEconomy.slice(0,count);

}


module.exports={matchesPerYear,matchesWonPerTeamForAllYear,extraRunConductedInYear,economicalBowlersInYears}