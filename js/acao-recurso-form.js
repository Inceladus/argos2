//Select Picker para recurso
var selectrecurso = $('select[name="idrecurso"]');
$.ajax({
	type: 'POST',
	url: url+ "/api.php",
	data: {classe: "recurso", metodo: "obterTodos", token: token},
	success: function(result) {	
		if ( ! result.data ) result.data = [];
		$.each( result.data, function(index, element) {
			selectrecurso.append( $('<option>', {value: element.idrecurso, text: element.recurso}) );
		});

		selectrecurso.html(selectrecurso.find('option').sort(function(x, y) {
			// to descending order switch "<" for ">"
			return $(x).text() > $(y).text() ? 1 : -1;
		}));

		if (data) selectrecurso.val(data.idrecurso);
		else selectrecurso.val(null);

		selectrecurso.selectpicker();				
	}
});