// Example of Standard Connections in Web Data Connectors using JSONPlaceholder JSON endpoints
// Tableau 10.1 - WDC API v2.1

// Define our Web Data Connector
(function(){
  var myConnector = tableau.makeConnector();
  myConnector.getSchema = function(schemaCallback) {
      var cols = [{"id": "development_id","dataType": "string"},
        {"id": "project_id","dataType": "string"},
        {"id": "project_type","dataType": "string"},
        {"id": "project_status","dataType": "string"},
        {"id": "project_processing_code","dataType": "string"},
        {"id": "date_project_create","dataType": "datetime"},
        {"id": "date_project_complete","dataType": "datetime"},
        {"id": "project_sap_internal_order","dataType": "string"},
        {"id": "project_title","dataType": "string"},
        {"id": "project_scope","dataType": "string"},
        {"id": "job_id","dataType": "string"},
        {"id": "job_drawing_number","dataType": "string"},
        {"id": "address_job","dataType": "string"},
        {"id": "job_apn","dataType": "string"},
        {"id": "job_bc_code","dataType": "string"},
        {"id": "job_bc_code_description","dataType": "string"},
        {"id": "lat_job","alias":"latitude","dataType": "float"},
        {"id": "lng_job","alias":"longitude","dataType": "float"},
        {"id": "approval_id","dataType": "string"},
        {"id": "approval_category_code","dataType": "string"},
        {"id": "approval_type","dataType": "string"},
        {"id": "approval_status","dataType": "string"},
        {"id": "approval_scope","dataType": "string"},
        {"id": "date_approval_create","dataType": "datetime"},
        {"id": "date_approval_issue","dataType": "datetime"},
        {"id": "date_approval_expire","dataType": "datetime"},
        {"id": "date_approval_close","dataType": "datetime"},
        {"id": "approval_valuation","dataType": "float"},
        {"id": "approval_du_net_change","dataType": "float"},
        {"id": "approval_stories","dataType": "float"},
        {"id": "approval_floor_area","dataType": "float"},
        {"id": "approval_du_extremely_low","dataType": "float"},
        {"id": "approval_du_very_low","dataType": "float"},
        {"id": "approval_du_low","dataType": "float"},
        {"id": "approval_du_moderate","dataType": "float"},
        {"id": "approval_du_above_moderate","dataType": "float"},
        {"id": "approval_du_future_demo","dataType": "float"},
        {"id": "approval_du_bonus","dataType": "float"},
        {"id": "approval_permit_holder","dataType": "string"},
        {"id": "bid_name","dataType": "string"}];

        var tableSchema = {
            id: "pts",
            alias: "DSD permits PTS",
            columns: cols
        };
      schemaCallback([tableSchema]);
  }

  myConnector.getData = function(table, doneCallback) {
    const table_url = "http://seshat.datasd.org/dsd/dsd_permits_all_pts.csv"
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
            tableau.connectionName = "DSD Permits PTS"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });

})();

