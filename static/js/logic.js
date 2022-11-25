// Creating the map object
let myMap = L.map("map", {
  center: [-30, 133],
  zoomSnap: 0.25,
  zoom: 4.25,
  zoomControl: false,
  scrollWheelZoom: false,
  maxZoom: 4.25,
  minZoom: 4.25,
});

// Adding the tile layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(myMap);

// Use this link to get the GeoJSON data for state boundaries
let link =
  "https://raw.githubusercontent.com/edwinsteele/d3-projects/master/data/au-states.geojson";

// The function that will determine the colour of each state
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
}

// Getting our GeoJSON data
d3.json(link).then(function (data) {
  // Creating a GeoJSON layer with the retrieved data
  L.geoJson(data, {
    // Styling each feature (in this case, a state)
    style: function (features) {
      return {
        color: "white",
        // Call the chooseColor() function to decide which color to colour our state
        fillColor: chooseColor(features.properties.STATE_NAME),
        fillOpacity: 0.5,
        weight: 1.5,
      };
    },
    // This is called on each feature.
    onEachFeature: function (features, layer) {
      // Set the mouse events to change the map styling.
      layer.on({
        // When a user's mouse cursor touches a map feature, the mouseover event calls this function, which makes that feature's opacity change to 90% so that it stands out.
        mouseover: function (event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9,
          });
          layer.bindPopup(L.popup().setContent(features.properties.STATE_NAME));
          layer.openPopup();
        },
        // When the cursor no longer hovers over a map feature (that is, when the mouseout event occurs), the feature's opacity reverts back to 50%.
        mouseout: function (event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5,
          });

          trasee.resetStyle(layer);
          layer.closePopup();
        },

        click: function (event) {
          layer = event.target;
          if (features.properties.STATE_NAME == "Western Australia") {
            window.open("/wa", "_self");
          } else if (features.properties.STATE_NAME == "Victoria") {
            window.open("/vic", "_self");
          } else if (features.properties.STATE_NAME == "Northern Territory") {
            window.open("/nt", "_self");
          } else if (features.properties.STATE_NAME == "Queensland") {
            window.open("/qld", "_self");
          } else if (
            features.properties.STATE_NAME == "Australian Capital Territory"
          ) {
            window.open("/act", "_self");
          } else if (features.properties.STATE_NAME == "New South Wales") {
            window.open("/nsw", "_self");
          } else if (features.properties.STATE_NAME == "Tasmania") {
            window.open("/tas", "_self");
          } else if (features.properties.STATE_NAME == "South Australia") {
            window.open("/sa", "_self");
          }
        },
      });
      // Giving each feature a popup with information that's relevant to it
      layer.bindPopup("<h2>" + features.properties.STATE_NAME + "</h2>");
    },
  }).addTo(myMap);
});

myMap.dragging.disable();
myMap.touchZoom.disable();
myMap.doubleClickZoom.disable();
myMap.scrollWheelZoom.disable();
myMap.boxZoom.disable();
myMap.keyboard.disable();
