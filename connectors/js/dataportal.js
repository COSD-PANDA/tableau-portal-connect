// Example of Standard Connections in Web Data Connectors using JSONPlaceholder JSON endpoints
// Tableau 10.1 - WDC API v2.1

// Define our Web Data Connector
(function(){
  var myConnector = tableau.makeConnector("id");
  myConnector.getSchema = function(schemaCallback) {
    var tables = new Promise(function(resolve, reject) {
      loadJSON("GIDTableInfoData", function(json) {
        var tableName = tableau.connectionData;
        var obj = JSON.parse(json);
        var tableList = [];
        for (var table in obj.tables) {
          if (obj.tables[table].id == tableName){
            tableList.push(obj.tables[table]);
          }
        }
        resolve(tableList);
      }, true);
    });
    // Once all our promises are resolved, we can call the schemaCallback to send this info to Tableau
    Promise.all([tables]).then(function(data) {
      schemaCallback(data[0]);
    });
  }

  myConnector.getData = function(table, doneCallback) {
    var gid_data = table.tableInfo.id;
    var gid_year = gid_data.substring(3)
    var gid_url = "http://seshat.datasd.org/get_it_done_311/get_it_done_";
    gid_url += gid_year;
    gid_url += "_requests_datasd.csv"
    $.get(gid_url, function( data ) {
      var result = $.csv.toObjects(data),tableData = result;
      table.appendRows(tableData);
      doneCallback();
    });
  }
  tableau.registerConnector(myConnector);

  $(document).ready(function() {
    $("#submitButton").click(function() {
        var dataset = $("#dataSelector").val();
        tableau.connectionData = dataset;
        tableau.connectionName = "portal_"+dataset;
        tableau.submit();
    });
  });


})();


// Helper function that loads a json and a callback to call once that file is loaded

function loadJSON(path, cb, isLocal) {
  var obj = new XMLHttpRequest();
  obj.overrideMimeType("application/json");
  if(isLocal) {
    obj.open("GET", "../json/" + path + ".json", true);
  }
  obj.onreadystatechange = function() {
    if (obj.readyState == 4 && obj.status == "200"){
      cb(obj.responseText);
    }
  }
  obj.send(null);
}


