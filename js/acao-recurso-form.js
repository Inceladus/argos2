if ( data ) {
	$('input[name="idacao"]').val(data.aidacao);
	$('input[name="idacao_recurso"]').val(data.idacao_recurso);
	$('input[name="quantidade"]').val(data.quantidade);
}

//Select Picker para recurso
var selectrecurso = $('select[name="idrecurso"]');
$.ajax({
	type: 'POST',
	url: url+ "/api.php",
	data: {classe: "recurso", metodo: "obterTodos", token: token},
	success: function(result) {	
		if ( ! result.data ) result.data = [];
		$.each( result.data, function(index, element) {
			selectrecurso.append( $('<option>', {value: element.idrecurso, text: element.recurso}) );
		});

		selectrecurso.html(selectrecurso.find('option').sort(function(x, y) {
			// to descending order switch "<" for ">"
			return $(x).text() > $(y).text() ? 1 : -1;
		}));

		if (data) selectrecurso.val(data.idrecurso);
		else selectrecurso.val(null);

		selectrecurso.selectpicker();				
	}
});

$('form').submit(function(){
	var formData = $(this).serializeArray();
	formData.push({name: 'classe', value: 'acao_recurso'});
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
				alert('Recurso da Ação ID '+result.idacao_recurso+' gravada!');
				$('#recurso').load('partial/acao-recurso.html');
				datatable_recurso.ajax.reload(null, false);
			}
		}
	});
	return false;
});