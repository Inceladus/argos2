//Listar indicadores
if(data){
	$('input[name="idacao_indicador"]').val(data.idacao_indicador);
	$('input[name="idacao"]').val(data.aidacao);
	$('input[name="quantidade"]').val(data.quantidade);
}

//Select Picker para indicador
var selectindicador = $('select[name="idindicador"]');
$.ajax({
	type: 'POST',
	url: url+ "/api.php",
	data: {classe: "indicador", metodo: "obterTodos", token: token},
	success: function(result) {	
		if ( ! result.data ) result.data = [];
		$.each( result.data, function(index, element) {
			selectindicador.append( $('<option>', {value: element.idindicador, text: element.indicador}) );
		});

		selectindicador.html(selectindicador.find('option').sort(function(x, y) {
			// to descending order switch "<" for ">"
			return $(x).text() > $(y).text() ? 1 : -1;
		}));

		if (data) selectindicador.val(data.idindicador);
		else selectindicador.val(null);	

		selectindicador.selectpicker();				
	}
});

$('form').submit(function(){
	var formData = $(this).serializeArray();
	console.log(formData);
	formData.push({name: 'classe', value: 'acao_indicador'});
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
				alert('Indicador da Ação ID '+result.idacao_indicador+' gravado!');
				$('#indicador').load('partial/acao-indicador.html');
				datatable_indicador.ajax.reload(null, false);
			}
		}
	});
	return false;
});