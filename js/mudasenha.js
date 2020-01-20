$('form').submit(function(){
	
	if ( $('#novasenha').val() != $('#confirmanovasenha').val() ) {
		alert('As senhas são diferentes');
		return false;
	}

	var formData = $(this).serializeArray();
	formData.push({name: 'classe', value: 'usuario'});
	formData.push({name: 'metodo', value: 'mudarSenha'});
	formData.push({name: 'token', value: token});
	$.ajax({
		type: 'POST',
		url: url+'/api.php',
		data: formData,
		success: function(result) {	
			if ( result.error ) {
				alert(result.error);
			} else {
				alert(result.success);
				$('input').val(null);
			}
		}
	});	
	return false;
});	
