// Creating the map object
let myMap = L.map("map", {
    center: [-28, 133],
    zoomSnap: 0.25,
    zoom: 4.25,
    zoomControl: false,
    scrollWheelZoom: false,
    maxZoom: 4.25,
    minZoom: 4.25,
});


  
// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Use this link to get the GeoJSON data for state boundaries
let link = "https://raw.githubusercontent.com/edwinsteele/d3-projects/master/data/au-states.geojson";

// The function that will determine the colour of a neighbourhood based on the borough that it belongs to
function chooseColor(state) {
    if (state == "Western Australia") return "purple";
    else if (state == "Victoria") return "red";
    else if (state == "Northern Territory") return "orange";
    else if (state == "Queensland") return "green";
    else if (state == "Australian Capital Territory") return "yellow";
    else if (state == "New South Wales") return "blue";
    else if (state == "Tasmania") return "cyan";
    else if (state == "South Australia") return "pink";
    else return "black";
};

// Getting our GeoJSON data
d3.json(link).then(function(data) {
    // Creating a GeoJSON layer with the retrieved data
    L.geoJson(data, {
      // Styling each feature (in this case, a state)
      style: function(features) {
        return {
          color: "white",
          // Call the chooseColor() function to decide which color to colour our neighbourhood. (The colour is based on the borough.)
          fillColor: chooseColor(features.properties.STATE_NAME),
          fillOpacity: 0.5,
          weight: 1.5
        };
      },
      // This is called on each feature.
      onEachFeature: function(features, layer) {
        // Set the mouse events to change the map styling.
        layer.on({
          // When a user's mouse cursor touches a map feature, the mouseover event calls this function, which makes that feature's opacity change to 90% so that it stands out.
          mouseover: function(event) {
            layer = event.target;
            layer.setStyle({
              fillOpacity: 0.9
            });
          },
          // When the cursor no longer hovers over a map feature (that is, when the mouseout event occurs), the feature's opacity reverts back to 50%.
          mouseout: function(event) {
            layer = event.target;
            layer.setStyle({
              fillOpacity: 0.5
            });
          }
        });
        // Giving each feature a popup with information that's relevant to it
        layer.bindPopup("<h1>" + features.properties.STATE_NAME + "</h1>");
  
      }
    }).addTo(myMap);
});

myMap.dragging.disable();
myMap.touchZoom.disable();
myMap.doubleClickZoom.disable();
myMap.scrollWheelZoom.disable();
myMap.boxZoom.disable();
myMap.keyboard.disable();