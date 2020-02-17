// Load Form
$('.modal-title').text('Nova Ação');
$('#tabs').hide();
$('#acao-form').load('partial/acao-form.html');
if ( data ) {
	$('.modal-title').text('Ação #'+data.idacao);
	
	$('#tabs').show();
	$('#acao-form').hide();
	$('#acao').load('partial/acao-form.html');
	$('#acao-tab').click(function(){
		$('#acao').load('partial/acao-form.html');
	});

	$('#indicador-tab').click(function(){
		$('#indicador').load('partial/acao-indicador.html');
	});
	$('#instituicao-tab').click(function(){
		$('#instituicao').load('partial/acao-instituicao.html');
	});
	$('#ocorrencia-tab').click(function(){
		$('#ocorrencia').load('partial/acao-ocorrencia.html');
	});
	$('#recurso-tab').click(function(){
		$('#recurso').load('partial/acao-recurso.html');
	});
	$('#status-tab').click(function(){
		$('#status').load('partial/acao-status.html');
	});
}