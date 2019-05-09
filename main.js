function getData(url, cb){
    var xhr = new XMLHttpRequest();

    
    
    xhr.onreadystatechange = function() { //xhr object maintains an internal state as it's completing various parts of our request operation
        if (this.readyState == 4 && this.status == 200) { //4-state means operation has been completed; 200 means okay as opposed to 404 meaning not found
            cb(JSON.parse(this.responseText));
        }
    };
    
    xhr.open("GET", url); //GET retrieves data, post sends data; second url is argument we want to retrieve
    xhr.send(); //send request
}

function getTableHeaders(obj){
    var tableHeaders = [];
    
    Object.keys(obj).forEach(function(key){
        tableHeaders.push(`<td>${key}</td>`)
    })
    
    return `<tr>${tableHeaders}</tr>`;
    
}

function generatePaginationButtons(next, prev){
    if (next && prev){
        return `<button onclick="writeToDocument('${prev}')">Previous</button>
                <button onclick="writeToDocument('${next}')">Next</button>`;
    } else if (next && !prev) {
        return `<button onclick="writeToDocument('${next}')">Next</button>`;
    } else if (!next && prev) {
        return `<button onclick="writeToDocument('${prev}')">Previous</button>`;
    }
    
}

function writeToDocument(url){
    var tableRows = [];
    var el = document.getElementById("data");
    
    getData(url, function(data){
        var pagination = "";
        if(data.next || data.previous){
            pagination = generatePaginationButtons(data.next, data.previous)
        }
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
        
        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>${pagination}`;
    });
}
