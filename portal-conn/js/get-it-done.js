// Example of Standard Connections in Web Data Connectors using JSONPlaceholder JSON endpoints
// Tableau 10.1 - WDC API v2.1

// Define our Web Data Connector
(function(){
  var myConnector = tableau.makeConnector();
  myConnector.getSchema = function(schemaCallback) {
      var cols = [{"id": "service_request_id", "dataType": "int"},
        {"id": "service_request_parent_id", "dataType": "int"},
        {"id": "sap_notification_number", "dataType": "int"},
        {"id": "date_requested","dataType": "datetime"}, 
        {"id": "case_age_days","dataType": "int"}, 
        {"id": "service_name","dataType": "string"},
        {"id": "case_record_type","dataType": "string"},
        {"id": "date_updated","dataType": "datetime"},
        {"id": "status","dataType": "string"},
        {"id": "lat","alias":"latitude","dataType": "float"},
        {"id": "lng","alias":"longitude","dataType": "float"},
        {"id": "council_district","dataType": "int"},
        {"id": "comm_plan_code","dataType": "int"},
        {"id": "comm_plan_name","dataType": "string"},
        {"id": "park_name","dataType": "string"},
        {"id": "case_origin","dataType": "string"},
        {"id": "referred","dataType": "string"},
        {"id": "public_description","dataType": "string"}];

        var tableSchema = {
            id: "gid",
            alias: "Get it Done Requests",
            columns: cols
        };
      schemaCallback([tableSchema]);
  }

  myConnector.getData = function(table, doneCallback) {
    const table_url = "http://seshat.datasd.org/get_it_done_311/get_it_done_requests_datasd.csv"
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
            tableau.connectionName = "Get It Done Requests"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });

})();

