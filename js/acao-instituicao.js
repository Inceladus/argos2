$('title').text('Cadastro de Ações da Operação');

var datatable_instituicao = $('#datatable-acao-instituicao').DataTable( {
	"ajax": {
		"url": url + '/api.php',
		"deferRender": true,
		"dataSrc": function (json) { if (json.data) return json.data; else return false; },
		"type": "POST",
		"data": function (d) {
			d.classe = 'acao';
			d.metodo = 'obterTodos';
			d.token = token;
		}
	},
	"columns": [
		{ "data": "ainstidacao_instituicao", "className": "details-control" },
		{ "data": "ainstidinstituicao", "className": "details-control" },
		{ "data": "ainstresponsavel", "className": "details-control" }
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
	data.aiidacao_instituicao = null;
	data.aiidinstituicao = null;
	data.aiquantidade = null;
	loadFormAcaoInstituicao();
});
