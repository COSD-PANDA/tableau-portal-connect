// Example of Standard Connections in Web Data Connectors using JSONPlaceholder JSON endpoints
// Tableau 10.1 - WDC API v2.1

// Define our Web Data Connector
(function(){
  var myConnector = tableau.makeConnector("id");
  myConnector.getSchema = function(schemaCallback) {
    var tables = new Promise(function(resolve, reject) {
      loadJSON("dataportal", function(json) {
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
    var table_id = table.tableInfo.id;
    var table_url_pre = "http://seshat.datasd.org/"
    
    switch (table_id) {
      case 'pts':
        var table_url = table_url_pre + "dsd/dsd_permits_all_pts.csv";
        break;
      case 'gid':
        var table_url = table_url_pre + "get_it_done_311/get_it_done_requests_datasd.csv";
        break;
      default:
        var table_url = table_url_pre + "get_it_done_311/get_it_done_requests_datasd.csv";
    }
    
    $.get(table_url, function( data ) {
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


