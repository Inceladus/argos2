// Load Form
$('.modal-title').text('Nova Ação');
if ( data ) {
	$('.modal-title').text('Ação #'+data.idacao);
	$('input[name="dt_inicio"]').val(data.dt_inicio);
	$('input[name="dt_termino"]').val(data.dt_termino);
	$('input[name="hr_inicio"]').val(data.hr_inicio);
	$('input[name="status"]').val(data.status);
	$('select[name="idoperacao"]').val(data.idoperacao);
}
// listar Operacoes
var sel_operacao = $('select[name="idoperacao"]');
$.post( url + '/api.php', {classe: "operacao", metodo: "obterTodos", token: token},function (result) {
	sel_operacao.append( $('<option>', {text: '-- Nova Operação --'}) );

	if ( result.error ) result.data = [];
	$.each( result.data, function(i, field) {
		sel_operacao.append( $('<option>', {text: field.nome_operacao}) );
	});
	
	sel_operacao.html(sel_operacao.find('option').sort(function(x, y) {
		// to descending order switch "<" for ">"
		return $(x).text() > $(y).text() ? 1 : -1;
	}));

	if (data) sel_operacao.val(data.operacao);
	else sel_operacao.val(null);
	
	sel_operacao.selectpicker();
});	

$('form').submit(function(){
	var formData = $(this).serializeArray();
	formData.push({name: 'classe', value: 'acao'});
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
				$('input[name="idoacao"]').val(result.idoacao);
				alert('Ação ID '+result.idacao+' gravado!');
				datatable.ajax.reload(null, false);
			}
		}
	});
	return false;
});	