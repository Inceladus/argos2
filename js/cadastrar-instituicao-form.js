// Load Form
$('.modal-title').text('Nova Instituição');
if ( data ) {
	$('.modal-title').text('Instituição #'+data.idinstituicao);
	$('input[name="idinstituicao"]').val(data.idinstituicao);
	$('input[name="instituicao"]').val(data.instituicao);
}
$('form').submit(function(){
	var formData = $(this).serializeArray();
	formData.push({name: 'classe', value: 'instituicao'});
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
				$('input[name="idoinstituicao"]').val(result.idoperacao);
				alert('Instituição ID '+result.idinstituicao+' gravado!');
				datatable.ajax.reload(null, false);
			}
		}
	});
	return false;
});	