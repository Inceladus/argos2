$('title').text('Cadastro de Ações da Operação');

var datatable_indicador = $('#datatable-acao-indicador').DataTable( {
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
		{ "data": "aiidacao_indicador", "className": "details-control" },
		{ "data": "aiidacao", "className": "details-control" },
		{ "data": "aiquantidade", "className": "details-control" }
	],
	"responsive": true,		
	"language": {
		"url": "lib/datatables/Portuguese-Brasil.lang"
	}
});

var loadFormAcaoIndicador = function() {
	$('#indicador').load('partial/acao-indicador-form.html', function(response,status) {
		if ( status == 'success' ) $('.modal').modal('show');
	});
}

$('#datatable-acao-indicador tbody').on('click', 'tr', function () {
	data = datatable_indicador.row( this ).data();
	loadFormAcaoIndicador();
});

$('#btn-novo-acao-indicador').click(function() {
	data.aiidacao_indicador = null;
	data.aiidindicador = null;
	data.aiquantidade = null;
	loadFormAcaoIndicador();
});