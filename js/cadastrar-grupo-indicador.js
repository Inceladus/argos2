$('title').text('Cadastrar Grupo de Indicadores');

var datatable = $('#datatable').DataTable( {
	"ajax": {
		"url": url + '/api.php',
		"deferRender": true,
		"dataSrc": function (json) { if (json.data) return json.data; else return false; },
		"type": "POST",
		"data": function (d) {
			d.classe = 'grupo_indicador';
			d.metodo = 'obterTodos';
			d.token = token;
		}
	},
	"columns": [
		{ "data": "idgrupo_indicador", "className": "details-control" },
		{ "data": "nome_grupo", "className": "details-control", "visible": true},
		{ "data": "dt_update", "className": "details-control dt-body-right", "visible": true, "render": function(datetime) { return datetime_format(datetime,'d/m/y h:i')} }
	],
	"responsive": true,		
	"language": {
		"url": "lib/datatables/Portuguese-Brasil.lang"
	}
});

$('#datatable tbody').on('click', 'tr', function () {
	data = datatable.row( this ).data();
	loadForm();
});

$('#btn-novo').click(function() {
	data = null;
	loadForm();
});

function loadForm() {
	$('.modal-content').load('partial/cadastrar-grupo-indicador-form.html', function(response,status) {
		if ( status == 'success' ) $('.modal').modal('show');
	});
}