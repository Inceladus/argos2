// Load Form
$('.modal-title').text('Cadastrar Recurso');
if ( data ) {
	$('.modal-title').text('Recurso #'+data.idrecurso);
	$('input[name="idrecurso"]').val(data.idrecurso);
	$('input[name="recurso"]').val(data.recurso);
}
$('form').submit(function(){
	var formData = $(this).serializeArray();
	formData.push({name: 'classe', value: 'recurso'});
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
				$('input[name="idrecurso"]').val(result.idrecurso);
				alert('Recurso ID '+result.idrecurso+' gravado!');
				datatable.ajax.reload(null, false);
			}
		}
	});
	return false;
});	