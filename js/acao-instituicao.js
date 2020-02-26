$('title').text('Cadastro de Ações da Operação');

var datatable_instituicao = $('#datatable-acao-instituicao').DataTable( {
	"ajax": {
		"url": url + '/api.php',
		"deferRender": true,
		"dataSrc": function (json) { if (json.data) return json.data; else return false; },
		"type": "POST",
		"data": function (d) {
			d.classe = 'acao_instituicao';
			d.metodo = 'obterTodos'; 
			d.token = token;
			d.idacao = data.aidacao;
		}
	},
	"columns": [
		{ "data": "idacao_instituicao", "className": "details-control" },
		{ "data": "instituicao", "className": "details-control" },
		{ "data": "responsavel", "className": "details-control" }
	],
	"responsive": true,		
	"language": {
		"url": "lib/datatables/Portuguese-Brasil.lang"
	}
});

var loadFormAcaoInstituicao = function() {
	$('#instituicao').load('partial/acao-instituicao-form.html', function(response,status) {
		if ( status == 'success' ) $('.modal').modal('show');
	});
}

$('#datatable-acao-instituicao tbody').on('click', 'tr', function () {
	data = datatable_instituicao.row( this ).data();
	loadFormAcaoInstituicao();
});

$('#btn-novo-acao-instituicao').click(function() {
	data.idacao_instituicao = null;
	data.idinstituicao = null;
	data.quantidade = null;
	loadFormAcaoInstituicao();
});
