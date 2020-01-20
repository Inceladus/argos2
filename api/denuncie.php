<?php
# carrega as configuraçoes iniciais
require_once "config.php";

# inclui a classe
require_once "class/denuncia.php";

# instancia o objeto
$_denuncia = new denuncia();

$_REQUEST = array_utf8_decode ( $_REQUEST );

# define o retorno
$_RESPONSE = $_denuncia->denunciar();

$_RESPONSE = array_utf8_encode ( $_RESPONSE );

# retorno no formato json
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
print json_encode( $_RESPONSE );
?>