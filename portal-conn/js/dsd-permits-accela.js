// Example of Standard Connections in Web Data Connectors using JSONPlaceholder JSON endpoints
// Tableau 10.1 - WDC API v2.1

// Define our Web Data Connector
(function(){
  var myConnector = tableau.makeConnector();
  myConnector.getSchema = function(schemaCallback) {
      var cols = [{"id": "project_id","dataType": "string"},
        {"id": "project_type","dataType": "string"},
        {"id": "project_processing_code","dataType": "string"},
        {"id": "date_project_create","dataType": "date"},
        {"id": "date_project_complete","dataType": "date"},
        {"id": "project_title","dataType": "string"},
        {"id": "project_scope","dataType": "string"},
        {"id": "address_job","dataType": "string"},
        {"id": "job_apn","dataType": "string"},
        {"id": "lat_job","alias":"latitude","dataType": "float"},
        {"id": "lng_job","alias":"longitude","dataType": "float"},
        {"id": "approval_id","dataType": "string"},
        {"id": "approval_type","dataType": "string"},
        {"id": "approval_status","dataType": "string"},
        {"id": "approval_scope","dataType": "string"},
        {"id": "date_approval_create","dataType": "date"},
        {"id": "date_approval_issue","dataType": "date"},
        {"id": "date_approval_expire","dataType": "date"},
        {"id": "date_approval_close","dataType": "date"},
        {"id": "approval_permit_holder","dataType": "string"}];

        var tableSchema = {
            id: "accela",
            alias: "DSD permits Accela",
            columns: cols
        };
      schemaCallback([tableSchema]);
  }

  myConnector.getData = function(table, doneCallback) {
    const table_url = "http://seshat.datasd.org/dsd/dsd_permits_all_accela.csv"
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
            tableau.connectionName = "DSD Permits Accela"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });

})();

