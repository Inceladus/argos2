var url = window.location.origin + '/restaurante';

function carregaMain(URI){
	$.ajax({
		url: url + '/partial/' + URI + '.html',
		success: function(data){
			$('main').html(data);
		}
	});
}

carregaMain('refeicao');

$.ajax({
	url: url + '/partial/cardapio-nav.html',
	success: function(data){
		$('nav').html(data);
	}
});

$.ajax({
	url: url + '/partial/cardapio-footer.html',
	success: function(data){
		$('footer').html(data);
	}
});