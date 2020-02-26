 $('title').text('Cadastro de Ações da Operação');

var datatable_recurso = $('#datatable-acao-recurso').DataTable( {
	"ajax": {
		"url": url + '/api.php',
		"deferRender": true,
		"dataSrc": function (json) { if (json.data) return json.data; else return false; },
		"type": "POST",
		"data": function (d) {
			d.classe = 'acao_recurso';
			d.metodo = 'obterTodos'; 
			d.token = token;
			d.idacao = data.aidacao;
		}
	},
	"columns": [
		{ "data": "idacao_recurso", "className": "details-control" },
		{ "data": "recurso", "className": "details-control" },
		{ "data": "quantidade", "className": "details-control" }
	],
	"responsive": true,		
	"language": {
		"url": "lib/datatables/Portuguese-Brasil.lang"
	}
});

var loadFormAcaorecurso = function() {
	$('#recurso').load('partial/acao-recurso-form.html', function(response,status) {
		if ( status == 'success' ) $('.modal').modal('show');
	});
}

$('#datatable-acao-recurso tbody').on('click', 'tr', function () {
	data = datatable_recurso.row( this ).data();
	loadFormAcaorecurso();
});

$('#btn-novo-acao-recurso').click(function() {
	data.idacao_recurso = null;
	data.idrecurso = null;
	data.quantidade = null;
	data.observacao = null;
	loadFormAcaorecurso();
});
