/* eslint-disable max-len */

/**
 * Calculate total match played in a specific year.
 * @param {JSON} matchesJson Json object.
 * @return {JSON} Json object that contain match count for specific year.
 */
function matchesPerYear(matchesJson) {
  try {
    if (matchesJson.length > 0 && typeof(matchesJson)=='object') {
      const seasons=matchesJson.reduce((seasons, match)=>{
        seasons[match['season']] = (seasons[match['season']] || 0)+1;
        return seasons;
      }, {});

      if (seasons['undefined']) {
        return 'Could not find session in current data';
      }
      return seasons;
    }
    return 'You entered empty file or file data is not proper format';
  } catch (err) {
    console.log(err);
  }
}

/**
 * Calculate total match played in a specific year for all team.
 * @param {JSON} matchesJson Json object.
 * @return {JSON} Json object that contain match count for specific year for all team.
 */
function matchesWonPerTeamForAllYear(matchesJson) {
  try {
    if (matchesJson.length > 0 && typeof(matchesJson)=='object') {
      const iplSeasons=matchesJson.reduce((iplSeasons, match)=>{
        if (iplSeasons[match['season']]==undefined) {
          iplSeasons[match['season']]=0;
        }
        return iplSeasons;
      }, {});
      const matchesPerTeam=matchesJson.reduce((matchesPerTeam, match)=>{
        if (match['winner'] !=='') {
          if (matchesPerTeam[match['winner']]==undefined) {
            matchesPerTeam[match['winner']]={...iplSeasons};
          }
          matchesPerTeam[match['winner']][match['season']] = (matchesPerTeam[match['winner']][match['season']] || 0)+1;
        }
        return matchesPerTeam;
      }, {});
      return matchesPerTeam;
    }
    return 'You entered empty file or file data is not proper format';
  } catch (err) {
    console.log(err);
  }
}

/**
 * Calculate Extra run conducted for all team in a specific year.
 * @param {JSON} matches Json object hold information about matches.
 * @param {JSON} deliveries json object hold information about delivery
 * @param {string} year string for which year we want to calculate extra runs
 * @return {JSON} Json object that total extra run conducted in a specific year.
 */
function extraRunConductedInYear(matches, deliveries, year) {
  try {
    if ((matches.length > 0 && deliveries.length>0) && (typeof(matches)=='object' && typeof(deliveries)=='object')) {
      const matchsId=matches.filter((match)=>match.season==year).map((match)=> match.id);

      const extraRuns = deliveries.reduce((extraRuns, delivery)=>{
        if (matchsId.includes(delivery['match_id'])) {
          extraRuns[delivery['bowling_team']]=(extraRuns[delivery['bowling_team']] || 0)+parseInt(delivery['extra_runs']);
        }
        return extraRuns;
      }, {});
      return extraRuns;
    }
    return 'You entered empty file or file data is not proper format';
  } catch (err) {
    console.log(err);
  }
}

/**
 * Calculate Economical bowler In a specific year
 * @param {JSON} matches Json object hold information about matches.
 * @param {JSON} deliveries json object hold information about delivery
 * @param {string} year string for which year we want to calculate extra runs
 * @param {number} topCount Number that is used for diplaying the top no of bowlers.
 * @return {JSON} Json object that total extra run conducted in a specific year.
 */
function economicalBowlersInYears(matches, deliveries, year, topCount) {
  try {
    if ((matches.length > 0 && deliveries.length>0) && (typeof(matches)=='object' && typeof(deliveries)=='object')) {
      const matchId=matches.filter((match)=>match.season==year).map((match)=> match.id);
      const ballAndRunCount=deliveries.reduce((ballAndRunCount, delivery)=> {
        if (matchId.includes(delivery['match_id'])) {
          if (ballAndRunCount[delivery['bowler']]==undefined) {
            ballAndRunCount[delivery['bowler']]={};
          }
          ballAndRunCount[delivery['bowler']]['total_runs']=(ballAndRunCount[delivery['bowler']]['total_runs'] || 0)+ (parseInt(delivery['total_runs']))-((parseInt(delivery['legbye_runs']))+parseInt(delivery['bye_runs']));
          ballAndRunCount[delivery['bowler']]['total_balls']=(ballAndRunCount[delivery['bowler']]['total_balls'] ||0)+1;
        }
        return ballAndRunCount;
      }, {});
      const sortedEconomy = calculateEconomy(ballAndRunCount).sort(function(bowlerOne, bowlerTwo) {
        return bowlerOne.economy - bowlerTwo.economy;
      });
      const bowlersEconomy=getTopBowlersEconomy(sortedEconomy, topCount);

      const getTopBowlers=bowlersEconomy.reduce((getTopBowlers, bowler)=>{
        getTopBowlers[bowler['bowler_name']]=bowler['economy'];
        return getTopBowlers;
      }, {});

      return getTopBowlers;
    }
    return 'You entered empty file or file data is not proper format';
  } catch (err) {
    console.log(err);
  }
}

/**
 * Calculate Economical bowler In a specific year
 * @param {Object} ballAndRunCount object hold info about total balls and runs.
 * @return {Array} array containing nested object about bowlers economy
 */
function calculateEconomy(ballAndRunCount) {
  return Object.entries(ballAndRunCount).reduce((economy, ballAndRunCount)=> {
    const bowlerEconomy={};
    bowlerEconomy['bowler_name']=ballAndRunCount[0];
    bowlerEconomy['economy']=parseFloat((ballAndRunCount[1]['total_runs']/(ballAndRunCount[1]['total_balls']/6)).toFixed(2));
    economy.push(bowlerEconomy);
    return economy;
  }, []);
}
/**
 * Used for slicing the object
 * @param {array} bowlersEconomy containing the bowlers name and economy in nested array
 * @param {number} count total no of result that are to be returned
 * @return {Array} array containing count no. of bowlers with there economy
 */
function getTopBowlersEconomy(bowlersEconomy, count=10) {
  if (bowlersEconomy.length < count) {
    return bowlersEconomy;
  }
  return bowlersEconomy.slice(0, count);
}


module.exports={matchesPerYear, matchesWonPerTeamForAllYear, extraRunConductedInYear, economicalBowlersInYears};
