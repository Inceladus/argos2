var url = window.location.origin + '/restaurante';
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