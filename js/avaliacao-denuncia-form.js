// title Modal
$('.modal-title').text('Denuncia #'+data.iddenuncia);

/*************************************************
 detalhes-tab
*************************************************/
$('input[name="iddenuncia"]').val(data.iddenuncia);
$('textarea[name="denuncia"]').val(data.denuncia);

// Select Picker
var select_1 = $('select[name="idnatureza"]');
// load naturezas
$.ajax({
	type: 'POST',
	url: url+'/api.php',
	data: {classe: "natureza", metodo: "obterTodos", token: token},
	success: function(result) {	
		if ( result.error ) result.data = [];

		//select_1.append( $('<option>', {text: '-- Nova natureza --'}) );
		$.each( result.data, function(index, element) {
			select_1.append( $('<option>', {value: element.idnatureza, text: element.natureza}) );
		});

		select_1.html(select_1.find('option').sort(function(x, y) {
			// to descending order switch "<" for ">"
			return $(x).text() > $(y).text() ? 1 : -1;
		}));

		if (data) select_1.val(data.idnatureza);
		else select_1.val(null);

		select_1.selectpicker();
	}
});

// submit form detalhes
$('#form-detalhes').submit( function () {
	var formData = $(this).serializeArray();
	formData.push({name: 'classe', value: 'denuncia'});
	formData.push({name: 'metodo', value: 'salvarDetalhes'});
	formData.push({name: 'token', value: token});
	
	console.log (formData);

	return false;
});

/***********************************************
 local-tab
***********************************************/
$('input[name="latitude"]').val(data.latitude);
$('input[name="longitude"]').val(data.longitude);

var id = 0, lat = (data.latitude), lng = (data.longitude), zoom = 18;
// Creating a map object
var map = L.map('map', {center: [lat, lng], zoom: zoom});

// Creating a Layer object
var layer = new L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'});
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

// Creating geocode service 
var geocodeService = L.esri.Geocoding.geocodeService();
function popupAddress (latlng) {
	geocodeService.reverse().latlng(latlng).run(function(error, result) {
		$('input[name="type"]').val(result.address.Addr_type);
		$('input[name="placename"]').val(result.address.PlaceName);
		$('input[name="address"]').val(result.address.Address);
		$('input[name="district"]').val(result.address.District);
		$('input[name="city"]').val(result.address.City);
		$('input[name="region"]').val(result.address.Region);
		$('input[name="postal"]').val(result.address.Postal);
		$('input[name="lat"]').val(result.latlng.lat);
		$('input[name="lng"]').val(result.latlng.lng);

		marker.bindPopup(result.address.Match_addr);
		marker.openPopup();
	});
}

// Showing Address on click
marker.on('click', function () {
	popupAddress(this.getLatLng());
});

// Showing Address on dragend
marker.on('dragend', function () {
	popupAddress(this.getLatLng());
});

$('#form-local').submit( function () {	
	var formData = $(this).serializeArray();
	formData.push({name: 'classe', value: 'denuncia'});
	formData.push({name: 'metodo', value: 'salvarLocal'});
	formData.push({name: 'token', value: token});
	
	console.log (formData);

	return false;
});

// clicking on nav-tabs
$('.nav-tabs').on('click', 'a', function() {
	id = $(this).attr('id');
	if ( id == 'local-tab' ) {
		setTimeout(function(){ map.invalidateSize() }, 500);
	}

});

/*************************************************************
 denunciados-tab
*************************************************************/
var datatableDenunciados = $('#datatable-denunciados').DataTable( {
	"ajax": {
		"url": url + '/api.php',
		"deferRender": true,
		"dataSrc": function (json) { if (json.data) return json.data; else return false; },
		"type": "POST",
		"data": function (d) {
			d.classe = 'denunciado';
			d.metodo = 'obterTodosNaDenuncia';
			d.iddenuncia = data.iddenuncia;
			d.token = token;
		}
	},
	"columns": [
		{ "data": "iddenunciado", "className": "details-control", "visible": false },
		{ "data": "denunciado", "className": "details-control" }
		//{ "data": "dt_registro", "className": "details-control dt-body-right", "render": function(datetime) { return datetime_format(datetime,'d/m/y h:i')} }
	],
	"responsive": true,	
	"dom": 'rt',
	"language": {
		"url": "lib/datatables/Portuguese-Brasil.lang"
	}
});

var datatableOutrosDenunciados = $('#datatable-outros-denunciados').DataTable( {
	"ajax": {
		"url": url + '/api.php',
		"deferRender": true,
		"dataSrc": function (json) { if (json.data) return json.data; else return false; },
		"type": "POST",
		"data": function (d) {
			d.iddenuncia = data.iddenuncia;
			d.classe = 'denunciado';
			d.metodo = 'obterOutros';
			d.token = token;
		}
	},
	"columns": [
		{ "data": "iddenunciado", "className": "details-control", "visible": false },
		{ "data": "denunciado" },
		{ "data": null, "className": "add-control", "orderable": false, "defaultContent": "" }
		//{ "data": "dt_registro", "className": "details-control dt-body-right", "render": function(datetime) { return datetime_format(datetime,'d/m/y h:i')} }
	],
	"responsive": true,	
	"language": {
		"url": "lib/datatables/Portuguese-Brasil.lang"
	}
});		

$('#datatable-outros-denunciados tbody').on('click', 'td.add-control', function () {
	var tr = $(this).closest('tr');
	var row = datatableOutrosDenunciados.row(tr);
	if ( confirm("Incluir denunciado na denuncia?") ) {
		$.ajax({
			type: 'POST',
			url: url+'/api.php',
			data: {
				classe: "denunciado", 
				metodo: "gravarDenunciadoNaDenuncia", 
				iddenuncia: data.iddenuncia,
				iddenunciado: row.data().iddenunciado,
				token: token
			},
			success: function(result) {	
				alert('Denunciado ID '+result.iddenunciado+' inserido na denuncia ID '+result.iddenuncia+'!');
				datatableDenunciados.ajax.reload(null, false);
				datatableOutrosDenunciados.ajax.reload(null, false);
				$('#modal').animate({ scrollTop: 0 }, "slow");
			}
		});
	}
});

$('#form-denunciado').hide();

$('#btn-novo-denunciado').click( function () {
	loadFormDenunciado(null);
});

function loadFormDenunciado (iddenunciado) {
	$('#cadastro-denunciados').hide();
	$('#form-denunciado').show();
	$('.title').text('Novo denunciado');

	if ( iddenunciado ) {
		$('.title').text('Denunciado #'+iddenunciado);
		$('input[name="iddenunciado"]').val(iddenunciado);

		$.ajax({
			type: 'POST',
			url: url+'/api.php',
			data: {
				classe: "denunciado", 
				metodo: "obter", 
				iddenunciado: iddenunciado,
				token: token
			},
			success: function(result) {	
				denunciado = result.data[0];
				$('input[name="nome"]').val(denunciado.nome);
				$('input[name="apelido"]').val(denunciado.apelido);
				$('select[name="sexo"]').val(denunciado.sexo);
				$('select[name="faixa_etaria"]').val(denunciado.faixa_etaria);
				$('select[name="altura"]').val(denunciado.altura);
				$('select[name="cutis"]').val(denunciado.cutis);
				$('select[name="compleicao"]').val(denunciado.compleicao);
				$('select[name="cor_olhos"]').val(denunciado.cor_olhos);
				$('select[name="tipo_cabelo"]').val(denunciado.tipo_cabelo);
				$('select[name="cor_cabelo"]').val(denunciado.cor_cabelo);
				$('#modal').animate({ scrollTop: $('#modal').height() }, "slow");		
			}
		});
	}
}

$('#btn-pesquisar-denunciados').click( function () {
	$('#form-denunciado').hide();
	$('#cadastro-denunciados').show();
});


$('#datatable-denunciados tbody').on('click', 'tr', function () {
	data = datatableDenunciados.row( this ).data();
	loadFormDenunciado(data.iddenunciado);
});

$('#form-denunciado').submit( function () {	
	var formData = $(this).serializeArray();
	formData.push({name: 'classe', value: 'denunciado'});
	formData.push({name: 'metodo', value: 'salvar'});
	formData.push({name: 'token', value: token});
	
	console.log (formData);

	return false;
});








/*
// Load Form


$('#btn-salvar-denunciado').click( function () {

});

$('#btn-excluir-denunciado').click( function () {

});


















/*
// Select Picker para permissao
var select_2 = $('select[name="permissao[]"]');
// Carrega options
$.each(menu.responseJSON.items, function(index, element) {
	if (element.subitems) {
		var optgroup = "<optgroup label='"+element.label+"'>";
		$.each(element.subitems, function(subIndex, subElement) {
			//select.append( $('<option>', {value: element.id, text: element.label+': '+element.label}) );
			optgroup += "<option value='"+subElement.id+"'>"+subElement.label+"</option>";
		});
		optgroup += "</optgroup>";
		select_2.append(optgroup);
	} else {
		select_2.append( $('<option>', {value: element.id, text: element.label}) );
	}
});			
if ( data ) select_2.val(data.permissao.split(','));
select_2.selectpicker();
*/

/*
// Load Form
$('.modal-title').text('Novo usuário');
if ( data ) {
	$('.modal-title').text('Usuário #'+data.idusuario);
	$('input[name="idusuario"]').val(data.idusuario);
	$('input[name="nome"]').val(data.nome);
	$('input[name="email"]').val(data.email);
	$('input[name="contato"]').val(data.contato);
	$('input[name="whatsapp"]').val(data.whatsapp);
}			

// Select Picker para Orgao
var select_1 = $('select[name="idorgao"]');
// Carrega options
$.post( URI + '/api.php', {classe: "orgao", metodo: "obterTodos", token: token},function (result, status) {
	if ( status == 'success' ) {
		if ( result.error ) result.data = [];

		select_1.append( $('<option>', {text: '-- Novo orgão --'}) );
		$.each( result.data, function(index, element) {
			select_1.append( $('<option>', {value: element.idorgao, text: element.orgao}) );
		});

		select_1.html(select_1.find('option').sort(function(x, y) {
			// to descending order switch "<" for ">"
			return $(x).text() > $(y).text() ? 1 : -1;
		}));

		if (data) select_1.val(data.idorgao);
		else select_1.val(null);

		select_1.selectpicker();				
	}
});	

// Select Picker para permissao
var select_2 = $('select[name="permissao[]"]');
// Carrega options
$.each(menu.responseJSON.items, function(index, element) {
	if (element.subitems) {
		var optgroup = "<optgroup label='"+element.label+"'>";
		$.each(element.subitems, function(subIndex, subElement) {
			//select.append( $('<option>', {value: element.id, text: element.label+': '+element.label}) );
			optgroup += "<option value='"+subElement.id+"'>"+subElement.label+"</option>";
		});
		optgroup += "</optgroup>";
		select_2.append(optgroup);
	} else {
		select_2.append( $('<option>', {value: element.id, text: element.label}) );
	}
});			
if ( data ) select_2.val(data.permissao.split(','));
select_2.selectpicker();

if ( data ) {
	if (data.ativado=='S') $('#ativado').prop('checked',true);
	// oculta o botao excluir
	$('#btn-excluir').hide();
} else {
	// oculta o botao excluir e renova senha
	$('#btn-excluir').hide();
	$('#btn-renovar-senha').hide();
}			

$('#idorgao').change( function() {
	if ($(this).val() == '-- Novo orgão --') {
		$('#div-setor').html("<input class='form-control' type='text' id='orgao' name='orgao' placeholder='Escreva o nome do orgão' required>");
		$('#orgao').focus();		
	}
});

$('form').submit(function(){
	var data = $(this).serializeArray();
	data.push({name: 'classe', value: 'usuario'});
	data.push({name: 'metodo', value: 'salvar'});
	data.push({name: 'token', value: token});
	$.post( URI + '/api.php', data, function (result) {
		if ( result.error ) {
			alert(result.error);
		} else {
			$('input[name="idusuario"]').val(result.idusuario);
			$('#btn-renovar-senha').show();
			//$('#btn-excluir').show();
			alert('Usuário ID '+result.idusuario+' gravado!');
			datatable.ajax.reload(null, false);
		}
	});
	return false;
});	

$('#btn-excluir').click(function(){
	if ( confirm('Tem certeza que deseja excluir este registro?') ) {
		var data=[];
		data.push({name: 'classe', value: 'usuario'});
		data.push({name: 'metodo', value: 'excluir'});
		data.push({name: 'token', value: token});
		data.push({name: 'idusuario', value: $('input[name="idusuario"]').val()});

		$.post( URI + '/api.php', data, function (result) {
			if ( result.error ) {
				alert(result.error);
			} else {
				$('input[name="idusuario"]').val(null);
				$('#btn-renovar-senha').hide();
				$('#btn-excluir').hide();

				alert('ID '+result.idusuario+' excluído!');
				datatable.ajax.reload(null, false);
			}
		});	
	}
});

$('#btn-renovar-senha').click(function(){
	var data=[];
	data.push({name: 'classe', value: 'usuario'});
	data.push({name: 'metodo', value: 'renovarSenha'});
	data.push({name: 'token', value: token});
	data.push({name: 'idusuario', value: $('input[name="idusuario"]').val()});
	data.push({name: 'email', value: $('input[name="email"]').val()});
	$.post(URI + "/api.php", data, function (result) {
		if ( result.error ) {
			alert(result.error);
		} else {
			alert('Senha do usuário ID '+result.idusuario+' renovada!');
			datatable.ajax.reload(null, false);
		}
	});	
});
*/
