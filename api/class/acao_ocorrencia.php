<?php

class acao_ocorrencia extends database {
	
	public function obterTodos() {
		$sql = "SELECT a.idacao AS aidacao, a.nome_acao AS anome_acao, a.dt_inicio AS adt_inicio, a.dt_termino AS adt_termino, a.hr_inicio AS ahr_inicio, a.hr_termino AS ahr_termino, a.latitude AS alatitude, a.longitude AS alongitude, 
			a.status AS status, a.idoperacao AS aidoperacao, o.nome_operacao, ao.idacao_ocorrencia, 
			ao.idocorrencia, ao.idacao, ao.quantidade, ao.observacao, oc.ocorrencia
			FROM acao a
			INNER JOIN operacao o
			ON o.idoperacao = a.idoperacao
			INNER JOIN acao_ocorrencia ao
			ON a.idacao = ao.idacao
			INNER JOIN ocorrencia oc
			ON ao.idocorrencia = oc.idocorrencia
			WHERE ao.idacao = ".$_REQUEST['idacao'];
	
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
		if ( $this->idacao_ocorrencia ) {
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