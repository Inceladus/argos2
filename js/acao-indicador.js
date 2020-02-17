$('title').text('Cadastro de Ações da Operação');

var datatable = $('#datatable2').DataTable( {
	"ajax": {
		"url": url + '/api.php',
		"deferRender": true,
		"dataSrc": function (json) { if (json.data) return json.data; else return false; },
		"type": "POST",
		"data": function (d) {
			d.classe = 'acao_indicador';
			d.metodo = 'obterTodos';
			d.token = token;
		}
	},
	"columns": [
		{ "data": "idacao_indicador", "className": "details-control" },
		{ "data": "idacao", "className": "details-control" },
		{ "data": "quantidade", "className": "details-control" }
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

$('#datatable2 tbody').on('click', 'tr', function () {
	data = datatable.row( this ).data();
	loadFormAcaoIndicador();
});

$('#btn-novo-acao-indicador').click(function() {
	data = null;
	loadFormAcaoIndicador();
});
