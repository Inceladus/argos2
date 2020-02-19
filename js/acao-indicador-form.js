// //Requisitar dados
// $.ajax({
// 	url: url + '/api.php',
// 	data: {classe: 'acao_indicador', metodo: 'obterTodos', token: token},
// 	success: function(result){
// 		$('input[name="idacao_indicador"]').val(result.data[0].idacao_indicador);
// 		$('input[name="idacao"]').val(result.data[0].idacao);
// 		$('input[name="idindicador"]').val(result.data[0].idindicador);
// 		$('input[name="quantidade"]').val(result.data[0].quantidade);
// 		console.log(result.data[0].quantidade);
// 	}
// });

//Listar indicadores
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
				console.log(result);
				$('input[name="idindicador"]').val(result.idindicador);
				alert('Grupo de Indicador ID '+result.idindicador+' gravado!');
				datatable.ajax.reload(null, false);
			}
		}
	});
	return false;
});