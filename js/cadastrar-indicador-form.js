// Load Form
$('.modal-title').text('Novo Indicador');
if ( data ) {
	$('.modal-title').text('Indicador #'+data.idindicador);
	$('input[name="idindicador"]').val(data.idindicador);
	$('input[name="indicador"]').val(data.indicador);
	$('select[name="idgrupo_indicador"]').val(data.idgrupo_indicador);
}
/* Operação */ 
//Select Picker para grupo_indicador
var selectgrupo_indicador = $('select[name="idgrupo_indicador"]');
$.ajax({
	type: 'POST',
	url: url+ "/api.php",
	data: {classe: "grupo_indicador", metodo: "obterTodos", token: token},
	success: function(result) {	
		if ( ! result.data ) result.data = [];
		$.each( result.data, function(index, element) {
			selectgrupo_indicador.append( $('<option>', {value: element.idgrupo_indicador, text: element.nome_grupo}) );
		});

		selectgrupo_indicador.html(selectgrupo_indicador.find('option').sort(function(x, y) {
			// to descending order switch "<" for ">"
			return $(x).text() > $(y).text() ? 1 : -1;
		}));

		if (data) selectgrupo_indicador.val(data.idgrupo_indicador);
		else selectgrupo_indicador.val(null);	

		selectgrupo_indicador.selectpicker();				
	}
});
$('form').submit(function(){
	var formData = $(this).serializeArray();
	formData.push({name: 'classe', value: 'indicador'});
	formData.push({name: 'metodo', value: 'salvar'});
	formData.push({name: 'token', value: token});
	$.ajax({
		type: 'POST',
		url: url+'/api.php',
		data: formData,
		success: function(result) {
			if ( result.error ) {
				alert(result.error);
			} else {
				$('input[name="idindicador"]').val(result.idindicador);
				alert('Operação ID '+result.idindicador+' gravado!');
				datatable.ajax.reload(null, false);
			}
		}
	});
	return false;
});	