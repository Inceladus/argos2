$('title').text('Cadastro de Ações da Operação');

var datatable = $('#datatable').DataTable( {
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
		{ "data": "anome_acao", "className": "details-control" },
		{ "data": "adt_inicio", "className": "details-control", "visible": true, "render": function(datetime) { return datetime_format(datetime,'d/m/y')} },
		{ "data": "adt_termino", "className": "details-control", "visible": true, "render": function(datetime) { return datetime_format(datetime,'d/m/y')} },
		{ "data": "astatus", "className": "details-control", "visible": true},
		{ "data": "nome_operacao", "className": "details-control", "visible": true}
	],
	"responsive": true,		
	"language": {
		"url": "lib/datatables/Portuguese-Brasil.lang"
	}
});

$.ajax({
	url: url + '/api.php',
	data: {classe: 'acao', metodo: 'obterTodos', token: token},
	success: function(result){
		console.log(result);
	}
});

var loadForm = function() {
	$('.modal-content').load('partial/cadastrar-acoes-form.html', function(response,status) {
		if ( status == 'success' ) $('.modal').modal('show');
	});
}

$('#datatable tbody').on('click', 'tr', function () {
	data = datatable.row( this ).data();
	loadForm();
});

$('#btn-novo').click(function() {
	data = null;
	loadForm();
});
