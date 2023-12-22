

let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson' 


//perform a get request 

let geoJSON; 

let earthquakes; 

d3.json(url).then(function(data){

    geojson = L.choropleth(data, {

        // Define which property will define the shade.
        valueProperty: "feature.geometry.coordinates[2]",
    
        // Set the color scale.
        scale: ["#DAF7A6", "#C70039"],
    
        // set the number of breaks in the step range
        steps: 0.25,
    
        // choose mode and style 
        mode: "e",
        style: {
          color: "#fff",
          weight: 1,
          fillOpacity: 0.9
        }
    }).addTo(earthquakeMap);
        

    createFeatures(data.features,);

}); 

function createFeatures(earthquakeData) {

    function onEachFeature(feature, layer) {
        layer.bindPopup('Magnitude: ' + feature.property.mag);
      }
    

    let earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature
      });
    
    createMap(earthquakes); 
    

}

function createMap(object) {


//Add tile layer from openstreetmaps 

let topograph =  L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });


let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});


//Create baseMaps 

let baseMaps = {
"Topographic Map": topograph, 
"Street Map": street
}; 

//Create overlayMaps 

let overlayMap = {
    Earthquakes: earthquakes 
}; 

//Generate Map 

let earthquakeMap = L.map("map", {
    center: [-175.3556,51.3266,30.086],
    zoom: 5,
    layers: [topograph, earthquakes]
  });


//create and add layers to map 

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(earthquakeMap);
}




