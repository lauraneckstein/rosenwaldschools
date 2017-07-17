// Edit the initial year and number of tabs to match your GeoJSON data and tabs in index.html


// Edit the center point and zoom level
var map = L.map('map', {
  center: [32.79, -90.6],
  zoom: 5,
  scrollWheelZoom: true
});

// Edit links to your GitHub repo and data source credit
map.attributionControl
.setPrefix('View <a href="http://github.com/lauraneckstein/rosenwaldschools">data and code on GitHub</a>, created with <a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>');

// Basemap layer
new L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
}).addTo(map);

// Edit to upload GeoJSON data file from your local directory
$.getJSON("rosenwald.geojson", function (data) {
  geoJsonLayer = L.geoJson(data, {
    style: style,
    onEachFeature: onEachFeature
  }).addTo(map);
});




// Edit range cutoffs and colors to match your data; see http://colorbrewer.org
// Any values not listed in the ranges below displays as the last color
function getColor(d) {
  return d < 1 ? '#FFFFFF' :
         d < 8 ? '#DADAEB' :
         d < 16 ? '#bcbddc' :
		 d < 24 ? '#9e9ac8' :
		 d < 31 ? '#807dba' :
		 d < 37 ? '#6a51a3' :
		 d < 46 ? '#54278f' :
		 d = 68 ? '#3f007d' :
                  '#FFFFFF' ;
}

// Edit the getColor property to match data properties in your GeoJSON file
// In this example, columns follow this pattern: index1910, index1920...
function style(feature) {
  return {
    fillColor: getColor(feature.properties.right_column_2),
    weight: 1,
    opacity: 1,
    color: 'black',
    fillOpacity: 0.9
  };
}

// This highlights the polygon on hover, also for mobile
function highlightFeature(e)  {
  resetHighlight(e);
  var layer = e.target;
  layer.setStyle({
    weight: 4,
    color: 'black',
    fillOpacity: 0.7
  });
  info.update(layer.feature.properties);
}

// This resets the highlight after hover moves away
function resetHighlight(e) {
  geoJsonLayer.setStyle(style);
  info.update();
}

// This instructs highlight and reset functions on hover movement
function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: highlightFeature
  });
}

// Creates an info box on the map
var info = L.control();
info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

// Edit info box labels (such as props.town) to match properties of the GeoJSON data

info.update = function (props) {
    this._div.innerHTML = '<h4>Number of Rosenwald Schools per County</h4>' +  (props ?
        '<b>' + props.right_column_2 + ' in ' + props.name + ' county '
        : 'Hover Over a County');
};

info.addTo(map);
// Edit grades in legend to match the range cutoffs inserted above
// In this example, the last grade will appear as "2+"
var legend = L.control({position: 'bottomright'});
legend.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend'),
    grades = [0, 1, 8, 16, 24, 31, 37, 46],
    labels = [],
    from, to;
  for (var i = 1; i < grades.length; i++) {
    from = grades[i];
    to = grades[i + 1];
    // manually inserted from + 0.1 to start one step above default 0 = white color
    labels.push(
      '<i style="background:' + getColor(from + 0.1) + '"></i> ' +
      from + (to ? '&ndash;' + to : '+'));
  }
  div.innerHTML = labels.join('<br>');
  return div;
};
legend.addTo(map);

