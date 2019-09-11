
const dataprocessingFunctions=require('./dataprocessing.js')
const csv=require('csvtojson')
const fs = require("fs");

const filepath='./data-set/matches.csv';
csv().fromFile(filepath).then((matchesJson)=>{
        let matchesPerYear=dataprocessingFunctions.matchesPerYear(matchesJson);
        writeJSONFile(matchesPerYear,'matchesPerYear');

        let matchesWonPerTeamForAllYear=dataprocessingFunctions.matchesWonPerTeamForAllYear(matchesJson);
        writeJSONFile(matchesWonPerTeamForAllYear,'matchesWonPerTeamForAllYear')

        csv().fromFile('./data-set/deliveries.csv').then((deliveriesJson)=>{

          let extraRunConductedInYear=dataprocessingFunctions.extraRunConductedInYear(matchesJson,deliveriesJson,'2016');
          writeJSONFile(extraRunConductedInYear,'extraRunConductedInYear')


          let economicalBowlersInYears =dataprocessingFunctions.economicalBowlersInYears(matchesJson,deliveriesJson,'2015',10)
          writeJSONFile(economicalBowlersInYears,'economicalBowlersInYears')

        })
        
    })
    // .catch(() => {})



 function writeJSONFile(result,JSONfilename){
       fs.writeFile(`./output/${JSONfilename}.json`, JSON.stringify(result), (err) => {
            if (err) {
                console.error(err);
                return;
            };
            console.log(JSONfilename+".json  created");
        });
    }
    


// module.exports.writeJSONFile=writeJSONFile;





