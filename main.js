const baseURL = "https://swapi.co/api/";

function getData(type, cb){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", baseURL + type + "/"); //GET retrieves data, post sends data; second url is argument we want to retrieve
    xhr.send(); //send request
    
    
    xhr.onreadystatechange = function() { //xhr object maintains an internal state as it's completing various parts of our request operation
        if (this.readyState == 4 && this.status == 200) { //4-state means operation has been completed; 200 means okay as opposed to 404 meaning not found
            cb(JSON.parse(this.responseText));
        }
    };
}

function printDataToConsole(data){
    console.log(data);
}

function getTableHeaders(obj){
    var tableHeaders = [];
    
    Object.keys(obj).forEach(function(key){
        tableHeaders.push(`<td>${key}</td>`)
    })
    
    return `<tr>${tableHeaders}</tr>`;
    
}

function writeToDocument(type){
    var tableRows = [];
    var el = document.getElementById("data");
    
    el.innerHTML = "";
    getData(type, function(data){
        data = data.results;
        var tableHeaders = getTableHeaders(data[0]);
        
        data.forEach(function(item) {
            var dataRow = [];
            
            Object.keys(item).forEach(function(key){
                var rowData = item[key].toString();
                var truncatedData = rowData.substring(0, 15);
                dataRow.push(`<td>${truncatedData}</td>`);
            });
            tableRows.push(`<tr>${dataRow}</tr>`);
        });
        
        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>`;
    });
}
