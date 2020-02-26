<?php

class acao_indicador extends database {

	public function obterTodos(){
		//Acao Indicador
		$sql = "SELECT a.idacao AS aidacao, a.nome_acao AS anome_acao, a.dt_inicio AS adt_inicio, a.dt_termino AS adt_termino, a.hr_inicio AS ahr_inicio, a.hr_termino AS ahr_termino, a.latitude AS alatitude, a.longitude AS alongitude, a.status AS status, a.idoperacao AS aidoperacao, o.nome_operacao, ai.idacao_indicador AS aiidacao_indicador, ai.idindicador AS aiidindicador, i.indicador, ai.idacao AS aiidacao, ai.quantidade AS aiquantidade FROM acao a
			INNER JOIN operacao o
			ON o.idoperacao = a.idoperacao
			INNER JOIN acao_indicador ai
			ON a.idacao = ai.idacao
			INNER JOIN indicador i
			ON i.idindicador = ai.idindicador WHERE ai.idacao = ".$_REQUEST['idacao'];

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