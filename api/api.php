<?php
# carrega as configuraçoes iniciais
require_once "config.php";

$_REQUEST = array_utf8_decode( $_REQUEST );

if ( $classe = @ $_REQUEST['classe'] ) {
	# carrega classe
	require_once "class/$classe.php";

	# instancia objeto
	$_object = new $classe();

	if ( $_token = validateJWT( @ $_REQUEST['token'] ) ) {
		if ( $_token->exp > time() ) {
			if ( $metodo = @ $_REQUEST['metodo'] ) {
				$_user = json_decode($_token->data);
				if ( $rs = @ $_object->$metodo() ) {
					$_RESPONSE = $rs;
				} else {
					$_RESPONSE['error'] = 'Nenhum resultado encontrado';
				}
			} else {
				$_RESPONSE['error'] = 'Nenhum METODO requerido';
			}
		} else {
			$_RESPONSE['error'] = 'Token expirado';
		}
	} else {
		$_RESPONSE['error'] = 'Token invalido';
	}
} else {
	$_RESPONSE['error'] = 'Nenhuma CLASSE requerida';
}

$_RESPONSE = array_utf8_encode( $_RESPONSE );

# retorno no formato json
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=utf-8", true);
print json_encode( @ $_RESPONSE );
?>