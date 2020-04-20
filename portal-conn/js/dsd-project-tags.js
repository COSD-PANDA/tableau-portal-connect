// Example of Standard Connections in Web Data Connectors using JSONPlaceholder JSON endpoints
// Tableau 10.1 - WDC API v2.1

// Define our Web Data Connector
(function(){
  var myConnector = tableau.makeConnector();
  myConnector.getSchema = function(schemaCallback) {
      var cols = [{"id": "development_id","dataType": "string"},
      {"id": "project_id","dataType": "string"},
      {"id": "project_scope","dataType": "string"},
      {"id": "project_tag_id","dataType": "string"},
      {"id": "project_tag_desc","dataType": "string"}
        ];

        var tableSchema = {
            id: "project_tags",
            alias: "DSD Project Tags",
            columns: cols
        };
      schemaCallback([tableSchema]);
  }

  myConnector.getData = function(table, doneCallback) {
    const table_url = "http://seshat.datasd.org/dsd/permits_set1_project_tags_datasd.csv"
    $.get(table_url, function( data ) {
      const result = $.csv.toObjects(data),tableData = result;
      table.appendRows(tableData);
      doneCallback();
    });
  }
  tableau.registerConnector(myConnector);

  // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "DSD Project Tags"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });

})();

