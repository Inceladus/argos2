// Load Form
$('.modal-title').text('Novo usuário');
if ( data ) {
	$('.modal-title').text('Usuário #'+data.idusuario);
	$('input[name="idusuario"]').val(data.idusuario);
	$('input[name="nome"]').val(data.nome);
	$('input[name="rg"]').val(data.rg);
	$('input[name="cpf"]').val(data.cpf);
	$('input[name="email"]').val(data.email);
	$('input[name="dt_nascimento"]').val(data.dt_nascimento);
	$('input[name="contato"]').val(data.contato);

}

// Select Picker para instituicao
var select_1 = $('select[name="idinstituicao"]');
// Carrega options
$.ajax({
	type: 'POST',
	url: url+'/api.php',
	data: {classe: "instituicao", metodo: "obterTodos", token: token},
	success: function(result) {	
		if ( result.error ) result.data = [];

		$.each( result.data, function(index, element) {
			select_1.append( $('<option>', {value: element.idinstituicao, text: element.instituicao}) );
		});

		select_1.html(select_1.find('option').sort(function(x, y) {
			// to descending order switch "<" for ">"
			return $(x).text() > $(y).text() ? 1 : -1;
		}));

		if (data) select_1.text(data.idinstituicao);
		else select_1.val(null);

		select_1.selectpicker();				
	}
});	

// Select Picker para permissao
var select_2 = $('select[name="permissao[]"]');
// Carrega options
$.each(menu.responseJSON.items, function(index, element) {
	if (element.subitems) {
		var optgroup = "<optgroup label='"+element.label+"'>";
		$.each(element.subitems, function(subIndex, subElement) {
			//select.append( $('<option>', {value: element.id, text: element.label+': '+element.label}) );
			optgroup += "<option value='"+subElement.id+"'>"+subElement.label+"</option>";
		});
		optgroup += "</optgroup>";
		select_2.append(optgroup);
	} else {
		select_2.append( $('<option>', {value: element.id, text: element.label}) );
	}
});			
if ( data ) select_2.val(data.permissao.split(','));
select_2.selectpicker();

if ( data ) {
	if (data.ativado=='S') $('#ativado').prop('checked',true);
	// oculta o botao excluir
	$('#btn-excluir').hide();
} else {
	// oculta o botao excluir e renova senha
	$('#btn-excluir').hide();
	$('#btn-renovar-senha').hide();
}			

$('#idinstituicao').change( function() {
	if ($(this).val() == '-- Novo orgão --') {
		$('#div-setor').html("<input class='form-control' type='text' id='instituicao' name='instituicao' placeholder='Escreva o nome do orgão' required>");
		$('#instituicao').focus();		
	}
});

$('form').submit(function(){
	var formData = $(this).serializeArray();
	formData.push({name: 'classe', value: 'usuario'});
	formData.push({name: 'metodo', value: 'salvar'});
	formData.push({name: 'token', value: token});
	$.ajax({
		type: 'POST',
		url: url+'/api.php',
		data: formData,
		success: function(result) {	
			if ( result.error ) {
				alert(result.error);
			} else {
				console.log(result);
				$('input[name="idusuario"]').val(result.idusuario);
				$('#btn-renovar-senha').show();
				//$('#btn-excluir').show();
				alert('Usuário ID '+result.idusuario+' gravado!');
				datatable.ajax.reload(null, false);
			}
		}
	});
	return false;
});	

$('#btn-excluir').click(function(){
	if ( confirm('Tem certeza que deseja excluir este registro?') ) {
		var formData=[];
		formData.push({name: 'classe', value: 'usuario'});
		formData.push({name: 'metodo', value: 'excluir'});
		formData.push({name: 'token', value: token});
		formData.push({name: 'idusuario', value: $('input[name="idusuario"]').val()});
		$.ajax({
			type: 'POST',
			url: url+'/api.php',
			data: formData,
			success: function(result) {	
				if ( result.error ) {
					alert(result.error);
				} else {
					$('input[name="idusuario"]').val(null);
					$('#btn-renovar-senha').hide();
					$('#btn-excluir').hide();

					alert('ID '+result.idusuario+' excluído!');
					datatable.ajax.reload(null, false);
				}
			}
		});	
	}
});

$('#btn-renovar-senha').click(function(){
	var formData=[];
	formData.push({name: 'classe', value: 'usuario'});
	formData.push({name: 'metodo', value: 'renovarSenha'});
	formData.push({name: 'token', value: token});
	formData.push({name: 'idusuario', value: $('input[name="idusuario"]').val()});
	formData.push({name: 'email', value: $('input[name="email"]').val()});
	$.ajax({
		type: 'POST',
		url: url+'/api.php',
		data: formData,
		success: function(result) {	
			if ( result.error ) {
				alert(result.error);
			} else {
				alert('Senha do usuário ID '+result.idusuario+' renovada!');
				datatable.ajax.reload(null, false);
			}
		}
	});	
});