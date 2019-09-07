const dataProcessing = require('../dataprocessing.js');
//testing of Matches per year function
test('Total matches played in per year',() => {
    expect(dataProcessing.matchesPerYear([{"season":"2008"},{"season":"2008"},{"season":"2008"},{"season":"2008"},{"season":"2008"}])).toBe(JSON.stringify({"2008":5}));
})
test('Total matches played in per year',() => {
    expect(dataProcessing.matchesPerYear([])).toBe("You entered empty file or file is not data is not proper format");
})

test('Total matches played in per year',() => {
    expect(dataProcessing.matchesPerYear([{"match_id":"1"},{"match_id":"2"}])).toBe("Could not find session in current data");
})

