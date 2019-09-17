/* eslint-disable comma-dangle */
/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable no-multi-str */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable space-before-blocks */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable indent */
const pg= require('pg');
const client = new pg.Client({
  user: 'mountblue',
  host: 'ipl-1.c3xodypxb4ts.ap-south-1.rds.amazonaws.com',
  database: 'ipl',
  password: 'mountblue!011q2w',
  port: 5432
});
function queryExecutor(query){
  client.connect();
  client.query(query).then((res)=>{
    console.table(res.rows);
    client.end();
  }).catch((err)=>console.log(err));
}

function matchesPerYear(){
    query='select season, count(season) season_count from public.matches group by season'
    queryExecutor(query)
}

function matchesPerTeamForAllYear(){
    query="select winner,season, count(season) season_count from public.matches \
            where winner!= 'null' group by season,winner order by winner"
    queryExecutor(query)
}
function extraRunConducted(){
    query ="select bowling_team,sum(extra_runs) from public.deliveries \
            where match_id  in (select distinct(id) from public.matches where season='2016')group by bowling_team"
    queryExecutor(query)
}
function economicBowler(){
    query="select bowler,cast(totalRun/over as numeric(10,2)) as economy from \
        (select bowler,cast(sum(total_runs-legbye_runs-bye_runs) as float) as totalRun,\
        cast(count(ball) as float)/cast(6 as float) as over from public.deliveries\
        where match_id  in (select distinct(id) from public.matches where season='2015')\
        group by bowler) as economy order by economy limit 10"
    queryExecutor(query)
}
economicBowler()
