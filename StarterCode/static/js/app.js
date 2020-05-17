// Create function for charts 
function getPlot(id) {
    
    // Get data from the json file
    d3.json("samples.json").then((data)=> {
        //console.log(data)
          
        // Filter samples by id 
        var samples = data.samples.filter(s => s.id.toString() === id)[0];
        //console.log(samples);
  
        // Top 10 OTU
        var samplevalues = samples.sample_values.slice(0, 10).reverse();
  
        var OTU_top = (samples.otu_ids.slice(0, 10)).reverse();
        
        var OTU_id = OTU_top.map(d => "OTU " + d)
        //console.log(`OTU IDS: ${OTU_id}`)
  
        var labels = samples.otu_labels.slice(0, 10);
  
        //console.log(`Sample Values: ${samplevalues}`)
        //console.log(`Id Values: ${OTU_top}`)

        // Bar Chart
        // Create trace
        var trace1 = {
            x: samplevalues,
            y: OTU_id,
            text: labels,
            type:"bar",
            orientation: "h",
        };
  
        // Create data array for bar plot
        var data1 = [trace1];
  
        // Define bar plot layout
        var layout1 = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };
  
        // Plot the bar chart
        Plotly.newPlot("bar", data1, layout1);
  
        // Bubble Chart
        // Create trace
        var trace2 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            },
            text: samples.otu_labels
  
        };
  
        // Define bubble plot layout
        var layout2 = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000
        };
  
        // Create data array for bubble plot 
        var data2 = [trace2];
  
        // Plot the bubble chart
        Plotly.newPlot("bubble", data2, layout2);
  
      });
  }  

  // Create function for sample metadata
function getInfo(id) {
    
    // Get data from the json file
    d3.json("samples.json").then((data)=> {
        
        // Get metadata info for demographics
        var metadata = data.metadata;
        //console.log(metadata)

        // Filter metadata info by id
        var result = metadata.filter(meta => meta.id.toString() === id)[0];

        // Select demographic info
        var demographicInfo = d3.select("#sample-metadata");
        
        // Empty the demographic info 
        demographicInfo.html("");

        // Grab demographic data for id and append info to panel
        Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}

// Create function for changes
function optionChanged(id) {
    getPlot(id);
    getInfo(id);
}

// Create function for dropdown
function init() {
   
    // Use D3 to select the dropdown menu 
    var dropdown = d3.select("#selDataset");

    // Get data from the json file 
    d3.json("samples.json").then((data)=> {
        // console.log(data)

        // Get data for dropdown
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // Call functions
        getPlot(data.names[0]);
        getInfo(data.names[0]);
    });
}

init();