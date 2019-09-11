/* eslint-disable max-len */
const dataProcessing = require('../server/dataprocessing.js');

const matchData = [{'id': 1, 'season': 2017, 'winner': 'Sunrisers Hyderabad'}, {'id': 2, 'season': 2017, 'winner': 'Rising Pune Supergiant'},
  {'id': 3, 'season': 2017, 'winner': 'Kolkata Knight Riders'}, {'id': 4, 'season': 2017, 'winner': 'Kings XI Punjab'}, {'id': 5, 'season': 2017, 'winner': 'Royal Challengers Bangalore'},
  {'id': 6, 'season': 2017, 'winner': 'Sunrisers Hyderabad'}, {'id': 7, 'season': 2017, 'winner': 'Mumbai Indians'}, {'id': 8, 'season': 2017, 'winner': 'Kings XI Punjab'}];
const deliveryData = [{'match_id': 1, 'ball': '1', 'bowler': 'TS Mills', 'bowling_team': 'Brijwasi', 'is_super_over': '0', 'bye_runs': '0', 'legbye_runs': '0', 'extra_runs': '1', 'total_runs': '1'},
  {'match_id': 2, 'ball': '1', 'bowler': 'Anuj Singh Chauhan', 'bowling_team': 'China', 'is_super_over': '0', 'bye_runs': '0', 'legbye_runs': '0', 'extra_runs': '1', 'total_runs': '2'},
  {'match_id': 3, 'ball': '1', 'bowler': 'Anuj Singh Chauhan', 'bowling_team': 'Karnatak', 'is_super_over': '0', 'bye_runs': '0', 'legbye_runs': '0', 'extra_runs': '2', 'total_runs': '2'},
  {'match_id': 2, 'ball': '1', 'bowler': 'A Kuntal', 'bowling_team': 'MountBlue', 'is_super_over': '0', 'bye_runs': '0', 'legbye_runs': '0', 'extra_runs': '1', 'total_runs': '1'},
  {'match_id': 1, 'ball': '1', 'bowler': 'Sarukh Khan', 'bowling_team': 'MountBlue', 'is_super_over': '0', 'bye_runs': '0', 'legbye_runs': '0', 'extra_runs': '1', 'total_runs': '2'},
  {'match_id': 2, 'ball': '1', 'bowler': 'Anuj Singh Chauhan', 'bowling_team': 'King IX', 'is_super_over': '0', 'bye_runs': '0', 'legbye_runs': '0', 'extra_runs': '0', 'total_runs': '1'},
  {'match_id': 3, 'ball': '1', 'bowler': 'A Kuntal', 'bowling_team': 'King IX', 'is_super_over': '0', 'bye_runs': '0', 'legbye_runs': '0', 'extra_runs': '1', 'total_runs': '2'},
  {'match_id': 1, 'ball': '1', 'bowler': 'Anuj Singh Chauhan', 'bowling_team': 'Brijwasi', 'is_super_over': '0', 'bye_runs': '0', 'legbye_runs': '0', 'extra_runs': '1', 'total_runs': '2'},
  {'match_id': 2, 'ball': '1', 'bowler': 'A Kuntal', 'bowling_team': 'China', 'is_super_over': '0', 'bye_runs': '0', 'legbye_runs': '0', 'extra_runs': '0', 'total_runs': '1'},
  {'match_id': 1, 'ball': '1', 'bowler': 'Anuj Singh Chauhan', 'bowling_team': 'Karnatak', 'is_super_over': '0', 'bye_runs': '0', 'legbye_runs': '0', 'extra_runs': '0', 'total_runs': '1'},
  {'match_id': 2, 'ball': '1', 'bowler': 'Sarukh Khan', 'bowling_team': 'Brijwasi', 'is_super_over': '0', 'bye_runs': '0', 'legbye_runs': '0', 'extra_runs': '0', 'total_runs': '1'}];
// ========================================================= Testing of Matches per year function declaration
test('matchesPerYear is defined or not', ()=>{
  expect(dataProcessing.matchesPerYear).toBeDefined();
});
test('matchesPerYear is returing something or not', ()=>{
  expect(dataProcessing.matchesPerYear(matchData)).not.toBeFalsy();
});
test('matchesPerYear is returing right result or not', () => {
  expect(dataProcessing.matchesPerYear(matchData)).toEqual({'2017': 8});
});
test('matchesPerYear throw error when empty or no data is passed', () => {
  expect(dataProcessing.matchesPerYear([])).toBe('You entered empty file or file data is not proper format');
});

test('matchesPerYear throw error when session is not present in data set', () => {
  expect(dataProcessing.matchesPerYear([{'match_id': '1'}, {'match_id': '2'}])).toBe('Could not find session in current data');
});

// ============================================================= Testing of matchesWonPerTeamForAllYear function declaration
test('matchesWonPerTeamForAllYear is defined or not', ()=>{
  expect(dataProcessing.matchesWonPerTeamForAllYear).toBeDefined();
});

test('matchesWonPerTeamForAllYear is returing something or not', ()=>{
  expect(dataProcessing.matchesWonPerTeamForAllYear(matchData)).not.toBeFalsy();
});

test('matchesWonPerTeamForAllYear throw error when empty or no data is passed', () => {
  expect(dataProcessing.matchesWonPerTeamForAllYear([])).toBe('You entered empty file or file data is not proper format');
});

test('matchesWonPerTeamForAllYear is returning right result or not', () => {
  expect(dataProcessing.matchesWonPerTeamForAllYear(matchData)).
      toEqual({'Sunrisers Hyderabad': {2017: 2},
        'Rising Pune Supergiant': {2017: 1},
        'Kolkata Knight Riders': {2017: 1},
        'Kings XI Punjab': {2017: 2},
        'Royal Challengers Bangalore': {2017: 1},
        'Mumbai Indians': {2017: 1},
      });
});

// ================================================= Testing of extraRunConductedInYear

test('extraRunConductedInYear is defined or not', ()=>{
  expect(dataProcessing.extraRunConductedInYear).toBeDefined();
});

test('extraRunConductedInYear is returing something or not', ()=>{
  expect(dataProcessing.extraRunConductedInYear(matchData, deliveryData, 2017)).not.toBeFalsy();
});

test('extraRunConductedInYear throw error when empty or no data is passed', () => {
  expect(dataProcessing.extraRunConductedInYear([])).toBe('You entered empty file or file data is not proper format');
});

test('extraRunConductedInYear is returning right result or not', () => {
  expect(dataProcessing.extraRunConductedInYear(matchData, deliveryData, '2017')).
      toEqual({'Brijwasi': 2,
        'China': 1,
        'Karnatak': 2,
        'MountBlue': 2,
        'King IX': 1,
      });
});

// ================================================= Testing of economicalBowlersInYears

test('economicalBowlersInYears is defined or not', ()=>{
  expect(dataProcessing.economicalBowlersInYears).toBeDefined();
});

test('economicalBowlersInYears is returing something or not', ()=>{
  expect(dataProcessing.economicalBowlersInYears(matchData, deliveryData, 2017)).not.toBeFalsy();
});

test('economicalBowlersInYears throw error when empty or no data is passed', () => {
  expect(dataProcessing.economicalBowlersInYears([])).toBe('You entered empty file or file data is not proper format');
});

test('economicalBowlersInYears is returning right result or not', () => {
  expect(dataProcessing.economicalBowlersInYears(matchData, deliveryData, '2017')).
      toEqual({'TS Mills': 6,
        'A Kuntal': 8,
        'Sarukh Khan': 9,
        'Anuj Singh Chauhan': 9.6,
      });
});

