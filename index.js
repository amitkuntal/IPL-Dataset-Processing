
const dataprocessingFunctions=require('./dataprocessing.js')
const csv=require('csvtojson')
const fs = require("fs");

const filepath='./data-set/matches.csv';

csv().fromFile(filepath).then((matchesJson)=>{
    dataprocessingFunctions.matchesPerYear(matchesJson);
    dataprocessingFunctions.matchesWonPerTeamForAllYear(matchesJson);
    csv().fromFile('./data-set/deliveries.csv').then((deliveriesJson)=>{
      dataprocessingFunctions.extraRunConductedInYear(matchesJson,deliveriesJson,'2016');
    })
    
})

function writeJSONFile(result,JSONfilename){
    fs.writeFile("./output/"+JSONfilename+".json", JSON.stringify(result), (err) => {
        if (err) {
            console.error(err);
            return;
        };
        console.log(JSONfilename+".json  created");
    });
}
module.exports.writeJSONFile=writeJSONFile;





