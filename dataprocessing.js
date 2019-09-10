//================================== function for calculating total matches per year

function matchesPerYear(matchesJson)
{ 
  try{
        if(matchesJson.length > 0 && typeof(matchesJson)=='object')
        {
            let matches=matchesJson.reduce((matches,match)=>{
              matches[match['season']] = (matches[match['season']] || 0)+1;
                return matches;
              },{});
      
            if(matches["undefined"])
            {
              return "Could not find session in current data";
            }
            return matches;  
        }
      return "You entered empty file or file data is not proper format";
    }
    catch(err){
      console.log(err);
    } 
}

// ==================================================== Function for calculating matches per year for all team
function matchesWonPerTeamForAllYear(matchesJson)
{
  try{
    if(matchesJson.length > 0 && typeof(matchesJson)=='object')
    {
      let matchesPerTeam=matchesJson.reduce((matchesPerTeam,match)=>{
        if(matchesPerTeam[match['winner']]==undefined)
        {
          matchesPerTeam[match['winner']]={};
        }
        matchesPerTeam[match['winner']][match['season']] = (matchesPerTeam[match['winner']][match['season']] || 0)+1;
        return matchesPerTeam;
        },{});

      return matchesPerTeam;
    }
    return "You entered empty file or file data is not proper format";
  }
  catch(err){
    console.log(err);
  }
}

// ======================================================= Function for calculating Extra run conducted in a year
function extraRunConductedInYear(matches,deliveries,year)
{
  try{
    if((matches.length > 0 && deliveries.length>0) && (typeof(matches)=='object' && typeof(deliveries)=='object'))
    {
    let matchId=matches.filter((match)=>match.season==year).map((match)=> match.id);

    let extraRun = deliveries.reduce((extraRun,delivery)=>{
      if(matchId.includes(delivery['match_id']))
      {
        extraRun[delivery['bowling_team']]=(extraRun[delivery['bowling_team']] || 0)+parseInt(delivery['extra_runs']);
      }
      return extraRun;
    },{})
    return extraRun;
  }
  return "You entered empty file or file data is not proper format";
  }
  catch(err){
    console.log(err);
  }
}

// Function fo calulating economical bowler of the

function economicalBowlersInYears(matches,deliveries,year,topCount)
{
  try{
    if((matches.length > 0 && deliveries.length>0) && (typeof(matches)=='object' && typeof(deliveries)=='object'))
    {
      let matchId=matches.filter((match)=>match.season==year).map((match)=> match.id);
      let bolAndRunCount=deliveries.reduce((bolAndRunCount,delivery)=>{
        if(matchId.includes(delivery['match_id']))
        {
          if(bolAndRunCount[delivery['bowler']]==undefined)
            {
              bolAndRunCount[delivery['bowler']]={};
            }
            bolAndRunCount[delivery['bowler']]['total_runs']=(bolAndRunCount[delivery['bowler']]['total_runs'] || 0)+ (parseInt(delivery['total_runs']))-((parseInt(delivery['legbye_runs']))+parseInt(delivery['bye_runs']));
            bolAndRunCount[delivery['bowler']]['total_balls']=(bolAndRunCount[delivery['bowler']]['total_balls'] ||0)+1;
        }
        return bolAndRunCount;
      },{})
      
      var bowlersEconomy=getTopBowlersEconomy(calculateEconomy(bolAndRunCount),topCount);
  
      var getTopBowlers=bowlersEconomy.reduce((getTopBowlers,bowler)=>{
        getTopBowlers[bowler['bowler_name']]=bowler['economy'];
          return getTopBowlers;
        },{})
      
       return getTopBowlers;
      }
      return "You entered empty file or file data is not proper format";
  
    }
      catch(err){
        console.log(err);
      }
}
  
function calculateEconomy(bolAndRunCount){

  return Object.entries(bolAndRunCount).reduce((economy,bolAndRunCount)=>
          {

            var bowlerEconomy={}
            bowlerEconomy['bowler_name']=bolAndRunCount[0]
            bowlerEconomy['economy']=bolAndRunCount[1]["total_runs"]/(bolAndRunCount[1]["total_balls"]/6);
            economy.push(bowlerEconomy);
            return economy;
          },[]).sort(function(bowlerOne, bowlerTwo) {
            return bowlerOne.economy - bowlerTwo.economy;
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