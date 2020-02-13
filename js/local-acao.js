var id = 0, lat =  -4.023233, lng = -53.105932, zoom = 6;

// Creating a map object
var map = L.map('map', {center: [lat, lng], zoom: zoom});

function queryObj()	{
	var result = {}, keyValuePairs = location.search.slice(1).split("&");
	keyValuePairs.forEach(function(keyValuePair) {
		keyValuePair = keyValuePair.split('=');
		result[decodeURIComponent(keyValuePair[0])] = decodeURIComponent(keyValuePair[1]) || '';
	});
	return result;	
};

var param = queryObj();
if ( param['lat']!=='0' && param['lng']!=='0' && param['']!=='undefined' ) {
	// console.log(param);
	map.setView([param['lat'], param['lng']], 16);
	id = param['id'];
} else {
	map.locate({setView: true, maxZoom: 12});
	map.on('locationfound', function(e) {
		marker.setLatLng(e.latlng);
		popupAddress(e.latlng);				
	});
	map.on('locationerror', function(e) {
		alert(e.message);
	});	
}

// Creating a Layer object
var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'});
// Adding layer to the map
map.addLayer(layer);
 
// Creating scale control
var scale = L.control.scale(); 
// Adding scale control to the map
scale.addTo(map); 

// Adding marker to the map
var marker = new L.marker(map.getCenter(), {draggable: true})
marker.addTo(map);
marker.on('dragend', function () {
	popupAddress(this.getLatLng());
});

// Creating geocode service 
var geocodeService = L.esri.Geocoding.geocodeService();
function popupAddress (latlng) {
	geocodeService.reverse().latlng(latlng).run(function(error, result) {
		//console.log (result);
		marker.bindPopup(result.address.LongLabel).openPopup();
	});
}
popupAddress(marker.getLatLng());

// Adding search control to the map
var searchControl = L.esri.Geocoding.geosearch({placeholder:'Procurar por lugares ou endereços'}).addTo(map);

// Adding results search to the map
var results = L.layerGroup().addTo(map);
searchControl.on('results', function(data){
	results.clearLayers();
	for (var i = data.results.length - 1; i >= 0; i--) {
		marker.setLatLng(data.results[i].latlng);
		marker.bindPopup(data.results[i].properties.LongLabel).openPopup();
	}
});

// Service Geocode Reverse By Esri
var geocodeService = L.esri.Geocoding.geocodeService();
var geocodeReverse = function ( latlng ) {
	geocodeService.reverse().latlng( latlng ).run(function(error, result) {
		if ( result ) {
			var address = result.address;
			address['StAddr'] = result.address.Address;
			address['X'] = result.latlng.lng;
			address['Y'] = result.latlng.lat;
			popupAddress( address );
		} else {
			alert(error);
		}
	});	
}

//Passar lat e lng
$('input[name="lat"]').val(lat);
$('input[name="lng"]').val(lng);

setTimeout(function(){ map.invalidateSize() }, 300);