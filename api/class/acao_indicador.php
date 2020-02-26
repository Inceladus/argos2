<?php

class acao_indicador extends database {

	public function salvar() {
		$this->idacao_indicador = @ $_REQUEST['idacao_indicador'];
		$this->idindicador = @ $_REQUEST['idindicador'];
		$this->idacao = @ $_REQUEST['idacao'];
		$this->quantidade = @ $_REQUEST['quantidade'];	
		if ( $this->idacao_indicador ) {
			$this->update();
			global $_user;
			$this->saveLog('alterou acao_indicador ID '.$this->idacao_indicador, $_user->idusuario);
		} else {
			$this->idacao_indicador = $this->insert();
			global $_user;
			$this->saveLog('inserir acao_indicador ID '.$this->idacao_indicador, $_user->idusuario);
		}
		
		return array ( 'idacao_indicador' => $this->idacao_indicador );
	}
}
?>