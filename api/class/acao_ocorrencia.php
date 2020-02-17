<?php

class acao_ocorrencia extends database {
	
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
		$this->idacao_ocorrencia = @ $_REQUEST['idacao_ocorrencia'];
		$this->idacao = @ $_REQUEST['idacao'];
		$this->idocorrencia = @ $_REQUEST['idocorrencia'];
		$this->quantidade = @ $_REQUEST['quantidade'];
		$this->observacao = @ $_REQUEST['observacao'];
		if ( $this->idacao_instituicao ) {
			$this->update();
			global $_user;
			$this->saveLog('alterou acao_ocorrencia ID '.$this->idacao_ocorrencia, $_user->idusuario);
		} else {
			$this->idacao_ocorrencia = $this->insert();
			global $_user;
			$this->saveLog('inserir acao_ocorrencia ID '.$this->idacao_ocorrencia, $_user->idusuario);
		}
		
		return array ( 'idacao_ocorrencia' => $this->idacao_ocorrencia );
	}
}
?>