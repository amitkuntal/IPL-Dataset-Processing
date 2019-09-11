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
      let matchesSeason=matchesJson.reduce((iplSeasons,match)=>{
        if(! (iplSeasons.includes(match["season"])))
        {
          iplSeasons.push(match["season"])
        }
        return iplSeasons;
      },[])
    
      let matchesPerTeam=matchesJson.reduce((matchesPerTeam,match)=>{
        if(match['winner'] !=="")
        {
        if(matchesPerTeam[match['winner']]==undefined)
        {
          matchesPerTeam[match['winner']]={};
        }
        matchesPerTeam[match['winner']][match['season']] = (matchesPerTeam[match['winner']][match['season']] || 0)+1;
        }
        return matchesPerTeam;
        },{});
        
        let teamsName=Object.keys(matchesPerTeam)
        let teamWins= teamsName.reduce((teamWins,teamName)=>{
          teamWins[teamName]=matchesPerTeam[teamName]
           matchesSeason.map((season)=>{
              if(teamWins[teamName][season]==undefined)
             {
              teamWins[teamName][season]=0;
             }
           })
           return teamWins
         },{});
          return teamWins;
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
    let matchsId=matches.filter((match)=>match.season==year).map((match)=> match.id);

    let extraRuns = deliveries.reduce((extraRuns,delivery)=>{
      if(matchsId.includes(delivery['match_id']))
      {
        extraRuns[delivery['bowling_team']]=(extraRuns[delivery['bowling_team']] || 0)+parseInt(delivery['extra_runs']);
      }
      return extraRuns;
    },{})
    return extraRuns;
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
      var sortedEconomy = calculateEconomy(bolAndRunCount).sort(function(bowlerOne, bowlerTwo) {
                      return bowlerOne.economy - bowlerTwo.economy;
                    });
      var bowlersEconomy=getTopBowlersEconomy(sortedEconomy,topCount);
  
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
            bowlerEconomy['economy']=parseFloat((bolAndRunCount[1]["total_runs"]/(bolAndRunCount[1]["total_balls"]/6)).toFixed(2));
            economy.push(bowlerEconomy);
            return economy;
          },[])
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