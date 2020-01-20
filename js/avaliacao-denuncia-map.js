// url para API
//var URI = window.location.origin + '/181/api';

// Pará - BRA
var id = 0, lat = (data.latitude), lng = (data.longitude), zoom = 15;

// Creating a map object
var map = L.map('map', {center: [lat, lng], zoom: zoom});

// Creating a Layer object
var layer = new L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
	});
// Adding layer to the map
map.addLayer(layer);

// Creating scale control
var scale = L.control.scale(); 
// Adding scale control to the map
scale.addTo(map); 

// Creating marker
var marker = new L.marker(map.getCenter(), {draggable: true});
// Adding marker to the map
marker.addTo(map);

marker.on('dragend', function () {
	popupAddress(this.getLatLng());
});

/*
function decodeLocation() {
	var result = {}, keyValuePairs = location.search.slice(1).split("&");
	keyValuePairs.forEach(function(keyValuePair) {
		keyValuePair = keyValuePair.split('=');
		result[decodeURIComponent(keyValuePair[0])] = decodeURIComponent(keyValuePair[1]) || '';
	});
	return result;	
};

var param = decodeLocation();
if ( param['lat']!=='0' && param['lng']!=='0' && param['']!=='undefined' ) {
	map.setView([param['lat'], param['lng']], 16);
	id = param['id'];
} else {
	map.locate({setView: true, maxZoom: 15});
	map.on('locationfound', function(e) {
		marker.setLatLng(e.latlng);
		popupAddress(e.latlng);				
	});
	map.on('locationerror', function(e) {
		alert(e.message);
	});	
}
*/

// Adding search control to the map
var searchControl = L.esri.Geocoding.geosearch({
	placeholder:'Procurar por lugares ou endereços',
	position: "topright",
	expanded: false
	});
searchControl.addTo(map);

searchControl.on('results', function(data){
	results.clearLayers();
	for (var i = data.results.length - 1; i >= 0; i--) {
		marker.setLatLng(data.results[i].latlng);
		popupAddress(marker.getLatLng());
	}
});

// Adding results search to the map
var results = L.layerGroup().addTo(map);

// Creating geocode service 
var geocodeService = L.esri.Geocoding.geocodeService();

function popupAddress (latlng) {
	geocodeService.reverse().latlng(latlng).run(function(error, result) {
		// date and time now
		d = new Date();
		var now = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();

		marker.bindPopup("<form><input type=hidden name='dt_abertura' value='"+now+"'><input type=hidden name='type' value='"+result.address.Addr_type+"'><input type=hidden name='placename' value='"+result.address.PlaceName+"'><input type=hidden name='address' value='"+result.address.Address+"'><input type=hidden name='district' value='"+result.address.District+"'><input type=hidden name='city' value='"+result.address.City+"'><input type=hidden name='region' value='"+result.address.Region+"'><input type=hidden name='postal' value='"+result.address.Postal+"'><input type=hidden name='lat' value='"+result.latlng.lat+"'><input type=hidden name='lng' value='"+result.latlng.lng+"'>Local:<div class='form-control'>"+result.address.Match_addr+"</div>Denúncia:<textarea name='denuncia' class='form-control' placeholder='Escreva aqui ...' rows=5 required></textarea><p class='text-center'><button type='submit' class='btn btn-primary'>Enviar</button></p></form>");
		marker.openPopup();

		$('form').submit( function() {
			var data = $(this).serializeArray();
			$.post( URI + '/denuncia.php', data, function (result) {
				if ( result.error ) {
					alert(result.error);
				} else {
					marker.bindPopup('<p><b>Denúncia Nº '+result.id+' registrada com sucesso!!</b></p><p>Em breve iremos avaliar e tomar as devidas providências.</p><p>Sua ajuda foi muito importante!!</p>');
					marker.openPopup();
				}
			});	
			
			return false;			
		});
	});
}
