// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
var filters = {};

// 3. Use this function to update the filters. 
function updateFilters() {

  // 4a. Save the element that was changed as a variable.
  let changed_ele = d3.select(this);

  // // 4b. Save the value that was changed as a variable.
  let element_value = changed_ele.property("value")

  // // 4c. Save the id of the filter that was changed as a variable.
  let filter_id = changed_ele.attr("id");

  // 5. If a filter value was entered then add that filterId and value
  // to the filters list. Otherwise, clear that filter from the filters object.
  if (element_value != "") {
    filters[filter_id] = element_value;
  }
  else {
    delete filters[filter_id];
  }

  // 6. Call function to apply all filters and rebuild the table
  filterTable();
}
  
  // 7. Use this function to filter the table when data is entered.
  function filterTable() {
  
    // 8. Set the filtered data to the tableData.
      let filteredData = tableData;
    
      // 9. Loop through all of the filters and keep any data that
      // matches the filter values
    Object.entries(filters).forEach(([filterId, elementValue]) => {
      if (filters[filterId] !== "") {
        if(filterId === 'city'){
          filteredData = filteredData.filter(entry => {
            return entry.city === elementValue
          });
        }
        else if(filterId === 'datetime'){
          filteredData = filteredData.filter(entry => entry.datetime === elementValue);
        }
        else if(filterId === 'state'){
          filteredData = filteredData.filter(entry => entry.state === elementValue);
        }
        else if(filterId === 'country'){
          filteredData = filteredData.filter(entry => entry.country === elementValue);
        }
        else{
          filteredData = filteredData.filter(entry => entry.shape === elementValue);
        }        
      }
    });    
    // 10. Finally, rebuild the table using the filtered data
    buildTable(filteredData)

  }
  
  // 2. Attach an event to listen for changes to each filter
  document.getElementById("state").addEventListener("keyup", updateFilters);
  document.getElementById("shape").addEventListener("keyup", updateFilters);
  document.getElementById("country").addEventListener("keyup", updateFilters);
  document.getElementById("datetime").addEventListener("keyup", updateFilters);
  document.getElementById("city").addEventListener("keyup", updateFilters);
  
  // Build the table when the page loads
  buildTable(tableData);
