// Load Form
$('.modal-title').text('Nova Operação');
if ( data ) {
	$('.modal-title').text('Operacao #'+data.idoperacao);
	$('input[name="idoperacao"]').val(data.idoperacao);
	$('input[name="nome_operacao"]').val(data.nome_operacao);
}
$('form').submit(function(){
	var formData = $(this).serializeArray();
	formData.push({name: 'classe', value: 'operacao'});
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
				$('input[name="idoperacao"]').val(result.idoperacao);
				alert('Operação ID '+result.idoperacao+' gravado!');
				datatable.ajax.reload(null, false);
			}
		}
	});
	return false;
});	