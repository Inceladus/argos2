// Load Form
$('.modal-title').text('Nova Ocorrência');
if ( data ) {
	$('.modal-title').text('Ocorrência #'+data.idocorrencia);
	$('input[name="idocorrencia"]').val(data.idocorrencia);
	$('input[name="ocorrencia"]').val(data.ocorrencia);
}
$('form').submit(function(){
	var formData = $(this).serializeArray();
	formData.push({name: 'classe', value: 'ocorrencia'});
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
				$('input[name="idocorrencia"]').val(result.idocorrencia);
				alert('ocorrencia ID '+result.idocorrencia+' gravado!');
				datatable.ajax.reload(null, false);
			}
		}
	});
	return false;
});	