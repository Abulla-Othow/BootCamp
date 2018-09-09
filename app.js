function buildMetadata(sample) {

    // @TODO: Complete the following function that builds the metadata panel
    var PANEL = document.getElementById("sample-metadata");
    // Clear any existing metadata
    PANEL.innerHTML = '';
    // Loop through all of the keys in the json response and
    // create new metadata tags
    for(var key in data) {
        h6tag = document.createElement("h6");
        h6Text = document.createTextNode(`${key}: ${data[key]}`);
        h6tag.append(h6Text);
        PANEL.appendChild(h6tag);
    }
}
function buildCharts(sampleData, otuData) {
    // Loop through sample data and find the OTU Taxonomic Name
    function buildCharts(sample, otuData) {
  
        // @TODO: Use `d3.json` to fetch the sample data for the plots
      var lables =smaple[0]['otu_ids'].map(function(item){
          return otuData[item]
      })
          // @TODO: Build a Bubble Chart using the sample data
      var bubble_layout = {
            margin: { t: 0},
            hovermode: 'closest',
            xaxis: { title: 'OTU ID'}
      };
      var bubData = [{
          x: sample[0]['otu_ids'],
          y: sample[0]['sample_values'],
          text: lables,
          mode: 'markers',
          marker: {
              size: sample[0]['otu_ids'],
              color: sample[0]['otu_ids'],
              colorscale: "Earth",
          }
      }];
      var bubble = document.getElementById('bubble');
      Plotly.plot(bubble, bubData, bubble_layout)
    
    // Use `d3.json` to fetch the metadata for a sample
      // Use d3 to select the panel with id of `#sample-metadata`
  
      // Use `.html("") to clear any existing metadata
  
      // Use `Object.entries` to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
  
      // BONUS: Build the Gauge Chart
      // buildGauge(data.WFREQ);
  }
  
  
      // @TODO: Build a Pie Chart
      // HINT: You will need to use slice() to grab the top 10 sample_values,
      // otu_ids, and labels (10 each).
      console.log(sampleData[0]['sample_values'].slice(0, 10))
      var pieData =[{
          values=sample[0]['sample_vales'].slice(0, 10),
          labels: sample[0]['otu_ids'].slice(0, 10),
          hovertext: labels.slice(0, 10),
          hoverinfo: 'hovertext',
          type: 'pie'
      }];
      var pie_layout = {
          margin: { t: 0, l: 0}
      };
      var Pie = document.getElementById("pie");
      Plotly.plot(Pie, pieData, pie_layout);
};
// UPDATE the pie chart
function updatepie(new_values, new_labels, new_names, sample_name){
    Plotly.restyle("Pie", 'values', [new_values]);
    Plotly.restyle("Pie", "labels", [new_labels]);
    Plotly.restyle("pie", "hovertext", [new_names]);
    Plotly.relayou("Pie", "title", "Sample values for " + sample_name);
    console.log("Pie Chart Updated");

};

//Update the Bubble Chart
 function updateBubble (values, labels, names, smaple_name) {
    Plotly.restyle("bubblePlot", "x", [labels]);
    Plotly.restyle("bubblePlot", "y", [values]);
    Plotly.restyle("bubblePlot", "marker.size", [values]);
    Plotly.restyle("bubblePlot", "text", [names]);
    Plotly.relayout("bubblePlot", "title", "Sample Values for " + sample_name);
    console.log("Bubble Chart Updated!");
 };


  function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("/names").then((sampleNames) => {
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      // Use the first sample from the list to build the initial plots
      const firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }
  
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
  }
  
  // Initialize the dashboard
  init();
  