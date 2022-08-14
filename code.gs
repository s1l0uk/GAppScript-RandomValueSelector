var ss = SpreadsheetApp.getActiveSpreadsheet();
var data_sheet = "DataCooking"

function onOpen(e) {
  generateValues();
}

function doGet(e) {
  generateValues();
}

function generateValues() {
  Logger.log("Hello World!");
  var v = [];
  for (i=0;i<3;i++) {
    Logger.log("Getting Data:");
    var data = getColumn(data_sheet,i)
    Logger.log(data);
    Logger.log("Abstracting Random Values");
    var random = getRandomFrom(data);
    v.push(random)
    if (i == 2) {
      var random2 = random
      while (random2 == random) {
        random2 = getRandomFrom(data);
      }
      v.push("and " + random2);
    }
  }
  writeOutValues(v)
}

function writeOutValues(values) {
  Logger.log("The final values are:")
  cells = [
    [2,1],
    [4,1],
    [6,1],
    [7,1]
  ]
  for (i=0;i<values.length;i++) {
    Logger.log(values[i])
    var sheet = ss.getSheetByName("Content");
    Logger.log(cells[i][0])
    Logger.log(cells[i][1])
    var cell = sheet.getRange(cells[i][0], cells[i][1]);
    cell.setValue(values[i]);
  }

}

function Transpose(a){
  return Object.keys(a[0]).map( function (c) { return a.map(function (r) { return r[c];}); });
}

function getColumn(sheet,col) {
  sheet = ss.getSheetByName(sheet);
  range = sheet.getDataRange().getValues();
  Logger.log("Original Range:");
  Logger.log(range);
  range = Transpose(range);
  Logger.log("Transposed Range:");
  Logger.log(range);
  return range[col]
}

function getRandomFrom(contenders) {
  const random = Math.floor(Math.random() * contenders.length);
  console.log(random, contenders[random]);
  return contenders[random]
}
