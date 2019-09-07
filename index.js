
const dataprocessingFunctions=require('./dataprocessing.js')
const csv=require('csvtojson')
const fs = require("fs");

const filepath='./data-set/matches.csv';
try{
    csv().fromFile(filepath).then((matchesJson)=>{
        dataprocessingFunctions.matchesPerYear(matchesJson);
        dataprocessingFunctions.matchesWonPerTeamForAllYear(matchesJson);
        csv().fromFile('./data-set/deliveries.csv').then((deliveriesJson)=>{
          dataprocessingFunctions.extraRunConductedInYear(matchesJson,deliveriesJson,'2016');
          dataprocessingFunctions.economicalBowlersInYears(matchesJson,deliveriesJson,'2015')

        })
        
    })
}
catch(err){
  console.log(err);
}

try{
    function writeJSONFile(result,JSONfilename){
        fs.writeFile("./output/"+JSONfilename+".json", JSON.stringify(result), (err) => {
            if (err) {
                console.error(err);
                return;
            };
            console.log(JSONfilename+".json  created");
        });
    }
}
catch(err)
{
  console.log(err);
}
module.exports.writeJSONFile=writeJSONFile;





