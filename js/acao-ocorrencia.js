 $('title').text('Cadastro de Ações da Operação');

var datatable_ocorrencia = $('#datatable-acao-ocorrencia').DataTable( {
	"ajax": {
		"url": url + '/api.php',
		"deferRender": true,
		"dataSrc": function (json) { if (json.data) return json.data; else return false; },
		"type": "POST",
		"data": function (d) {
			d.classe = 'acao_ocorrencia';
			d.metodo = 'obterTodos'; 
			d.token = token;
			d.idacao = data.aidacao;
		}
	},
	"columns": [
		{ "data": "idacao_ocorrencia", "className": "details-control" },
		{ "data": "ocorrencia", "className": "details-control" },
		{ "data": "quantidade", "className": "details-control" }
	],
	"responsive": true,		
	"language": {
		"url": "lib/datatables/Portuguese-Brasil.lang"
	}
});

var loadFormAcaoocorrencia = function() {
	$('#ocorrencia').load('partial/acao-ocorrencia-form.html', function(response,status) {
		if ( status == 'success' ) $('.modal').modal('show');
	});
}

$('#datatable-acao-ocorrencia tbody').on('click', 'tr', function () {
	data = datatable_ocorrencia.row( this ).data();
	loadFormAcaoocorrencia();
});

$('#btn-novo-acao-ocorrencia').click(function() {
	data.idacao_ocorrencia = null;
	data.idocorrencia = null;
	data.quantidade = null;
	data.observacao = null;
	loadFormAcaoocorrencia();
});
