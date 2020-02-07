// Load Form
$('.modal-title').text('Novo Grupo de Indicadores');
if ( data ) {
	$('.modal-title').text('Grupo de Indicadores #'+data.idgrupo_indicador);
	$('input[name="idgrupo_indicador"]').val(data.idgrupo_indicador);
	$('input[name="nome_grupo"]').val(data.nome_grupo);
}
$('form').submit(function(){
	var formData = $(this).serializeArray();
	formData.push({name: 'classe', value: 'grupo_indicador'});
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
				$('input[name="idgrupo_indicador"]').val(result.idgrupo_indicador);
				alert('Grupo de Indicador ID '+result.idgrupo_indicador+' gravado!');
				datatable.ajax.reload(null, false);
			}
		}
	});
	return false;
});	