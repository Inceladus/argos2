if ( data ) {
	$('input[name="idacao"]').val(data.aidacao);
	$('input[name="idacao_ocorrencia"]').val(data.idacao_ocorrencia);
	$('input[name="quantidade"]').val(data.quantidade);
	$('textarea[name="observacao"]').val(data.observacao);
}
//Listar ocorrencia 
//Select Picker para ocorrencia
var selectocorrencia = $('select[name="idocorrencia"]');
$.ajax({
	type: 'POST',
	url: url+ "/api.php",
	data: {classe: "ocorrencia", metodo: "obterTodos", token: token},
	success: function(result) {	
		if ( ! result.data ) result.data = [];
		$.each( result.data, function(index, element) {
			selectocorrencia.append( $('<option>', {value: element.idocorrencia, text: element.ocorrencia}) );
		});

		selectocorrencia.html(selectocorrencia.find('option').sort(function(x, y) {
			// to descending order switch "<" for ">"
			return $(x).text() > $(y).text() ? 1 : -1;
		}));

		if (data) selectocorrencia.val(data.idocorrencia);
		else selectocorrencia.val(null);

		selectocorrencia.selectpicker();			
	}
});

$('form').submit(function(){
	var formData = $(this).serializeArray();
	formData.push({name: 'classe', value: 'acao_ocorrencia'});
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
				console.log(result);
				alert('Ocorrência da Ação ID '+result.idacao_ocorrencia+' gravada!');
				$('#ocorrencia').load('partial/acao-ocorrencia.html');
				datatable_ocorrencia.ajax.reload(null, false);
			}
		}
	});
	return false;
});