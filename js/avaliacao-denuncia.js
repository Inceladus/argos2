$('title').text('Avaliação de Denúncia');

var datatable = $('#datatable').DataTable( {
	"ajax": {
		"url": url + '/api.php',
		"deferRender": true,
		"dataSrc": function (json) { if (json.data) return json.data; else return false; },
		"type": "POST",
		"data": function (d) {
			d.classe = 'denuncia';
			d.metodo = 'obterRegistradas';
			d.token = token;
		}
	},
	"columns": [
		{ "data": "iddenuncia", "className": "details-control" },
		{ "data": "denuncia", "className": "details-control" },
		{ "data": "dt_registro", "className": "details-control dt-body-right", "render": function(datetime) { return datetime_format(datetime,'d/m/y h:i')} }
	],
	"responsive": true,	
	"language": {
		"url": "lib/datatables/Portuguese-Brasil.lang"
	}
});

$('#datatable tbody').on('click', 'tr', function () {
	data = datatable.row( this ).data();
	$('.modal-content').load('partial/avaliacao-denuncia-form.html', function(response, status) {
		if ( status == 'success' ) $('.modal').modal('show');
	});
});