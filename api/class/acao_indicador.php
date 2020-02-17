<?php

class acao_indicador extends database {
	
	public function obterTodos() {
		$sql = "SELECT idacao_indicador, a_i.idindicador, i.indicador, a.nome_acao ,a_i.idacao, quantidade
			FROM acao_indicador a_i
			INNER JOIN indicador i
			ON a_i.idindicador = i.idindicador
			INNER JOIN acao a
			ON a_i.idacao = a.idacao";
	
		if ( $rs = parent::fetch_all($sql) ) {
			foreach ( $rs as $row ) {
				$col = array();
				foreach ( $row as $k=>$v ) {
					$col[$k] = $v;
				}
				$rows[] = $col;
			}
			return array( 'data' => $rows );
		}
	}

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