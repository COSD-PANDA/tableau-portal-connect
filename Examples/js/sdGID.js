(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "service_request_id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "requested_datetime",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "case_age_days",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "service_name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "case_record_type",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "updated_datetime",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "status",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "lat",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "long",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "district",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "case_origin",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "referred_department",
            dataType: tableau.dataTypeEnum.string
        }
        ];

        var tableSchema = {
            id: "getitdone",
            alias: "Get it Done service requests",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        /*$.getJSON("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson", function(resp) {
            var feat = resp.features,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "id": feat[i].id,
                    "mag": feat[i].properties.mag,
                    "title": feat[i].properties.title,
                    "location": feat[i].geometry
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });*/
        $.get("http://seshat.datasd.org/get_it_done_311/get_it_done_2018_requests_datasd.csv", function( data ) {
            var result = $.csv.toObjects(data),tableData = result;

          /*for (var i = 1, len = result.length; i < len; i++) {
                tableData.push({
                    "service_request_id": result[i][0],
                    "requested_datetime": result[i][1],
                    "case_age_days": result[i][2],
                    "service_name": result[i][3],
                    "case_record_type": result[i][4],
                    "updated_datetime": result[i][5],
                    "status": result[i][6],
                    "lat": result[i][7],
                    "long": result[i][8],
                    "district": result[i][9],
                    "case_origin": result[i][10],
                    "referred_department": result[i][11]

                });
            }*/
            table.appendRows(tableData);
            console.log(table)
            doneCallback();
        });

    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            var dataset = $("dataLink").val();
            tableau.connectionName = dataset; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
