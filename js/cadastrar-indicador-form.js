// Load Form
$('.modal-title').text('Novo Indicador');
if ( data ) {
	$('.modal-title').text('Indicador #'+data.idindicador);
	$('input[name="indicador"]').val(data.indicador);
	$('select[name="idgrupo_indicador"]').val(data.idgrupo_indicador);
}
// listar Grupo de Indicadores
var sel_grupo_indicador = $('select[name="idgrupo_indicador"]');
$.post( url + '/api.php', {classe: "grupo_indicador", metodo: "obterTodos", token: token},function (result) {
	//sel_grupo_indicador.append( $('<option>', {text: '-- Nova Operação --'}) );
	if ( result.error ) result.data = [];
	$.each( result.data, function(i, field) {
		sel_grupo_indicador.append( $('<option>', {text: field.nome_grupo}) );
	});
	
	sel_grupo_indicador.html(sel_grupo_indicador.find('option').sort(function(x, y) {
		// to descending order switch "<" for ">"
		return $(x).text() > $(y).text() ? 1 : -1;
	}));

	if (data) sel_grupo_indicador.val(data.operacao);
	else sel_grupo_indicador.val(null);
	
	sel_grupo_indicador.selectpicker();
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
				console.log(result);
				$('input[name="idindicador"]').val(result.idindicador);
				alert('Operação ID '+result.idindicador+' gravado!');
				datatable.ajax.reload(null, false);
			}
		}
	});
	return false;
});	