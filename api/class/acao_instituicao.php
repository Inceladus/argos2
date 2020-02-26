<?php

class acao_instituicao extends database {
	
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
		global $_user;
		$this->idacao_instituicao = @ $_REQUEST['idacao_instituicao'];
		$this->idinstituicao = @ $_REQUEST['idinstituicao'];
		$this->idacao = @ $_REQUEST['idacao'];
		if ( @ $_REQUEST['responsavel'] ) $this->responsavel = 'S';
		else $this->responsavel = 'N';
		if ( $this->idacao_instituicao ) {
			$this->update();
			$this->saveLog('alterou acao_instituicao ID '.$this->idacao_instituicao, $_user->idusuario);
		} else {
			$this->idacao_indicador = $this->insert();
			global $_user;
			$this->saveLog('inserir acao_instituicao ID '.$this->idacao_instituicao, $_user->idusuario);
		}
		
		return array ( 'idacao_instituicao' => $this->idacao_instituicao );
	}
}
?>