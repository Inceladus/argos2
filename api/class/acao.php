<?php

class acao extends database {
	
	public function obterTodos() {
		// $sql = "SELECT a.idacao AS aidacao, a.nome_acao AS anome_acao, a.dt_inicio AS adt_inicio, a.dt_termino AS adt_termino, a.hr_inicio AS ahr_inicio, a.hr_termino AS ahr_termino, a.latitude AS alatitude, a.longitude AS alongitude, 
		// 	a.status AS status, a.idoperacao AS aidoperacao, o.nome_operacao, 
		// 	ai.idacao_indicador AS aiidacao_indicador, ai.idindicador AS aiidindicador, ai.idacao AS aiidacao, 
		// 	ai.quantidade AS aiquantidade, ainst.idacao_instituicao AS ainstidacao_instituicao, 
		// 	ainst.idinstituicao AS ainstidinstituicao, ainst.idacao AS ainstidacao, ainst.responsavel AS ainstresponsavel,
		// 	ao.idacao_ocorrencia AS aoidacao_ocorrencia, ao.idacao AS aoidacao, ao.idocorrencia AS aoidocorrencia,
		// 	ao.quantidade AS aoquantidade, ao.observacao AS aoobservacao, ar.idacao_recurso AS aridacao_recurso,
		// 	ar.idacao AS aridacao, ar.idrecurso AS aridrecurso, ar.quantidade AS arquantidade, 
		// 	ast.idacao_status AS astidacao_status, ast.idacao AS astidacao FROM acao a 
		// 	LEFT JOIN operacao o
		// 	ON o.idoperacao = a.idoperacao
		// 	LEFT JOIN acao_indicador ai
		// 	ON a.idacao = ai.idacao
		// 	LEFT JOIN acao_instituicao ainst
		// 	ON a.idacao = ainst.idacao
		// 	LEFT JOIN acao_ocorrencia ao
		// 	ON ao.idacao = a.idacao
		// 	LEFT JOIN acao_recurso ar
		// 	ON ar.idacao = a.idacao
		// 	LEFT JOIN acao_status ast
		// 	ON ast.idacao = a.idacao";

		//Acao
		$sql = "SELECT a.idacao AS aidacao, a.nome_acao AS anome_acao, a.dt_inicio AS adt_inicio, a.dt_termino AS adt_termino, a.hr_inicio AS ahr_inicio, a.hr_termino AS ahr_termino, a.latitude AS alatitude, a.longitude AS alongitude, a.status AS status, a.idoperacao AS aidoperacao, o.nome_operacao FROM acao a
			LEFT JOIN operacao o
			ON o.idoperacao = a.idoperacao";
	
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

	public function obterStatus(){
		$sql = "SELECT status FROM acao";

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
	
	public function obterDetalhes(){
		$sql = "SELECT idacao, latitude, longitude FROM acao";
	
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
		$this->idacao = @ $_REQUEST['idacao'];
		$this->nome_acao = @ $_REQUEST['nome_acao'];
		$this->dt_inicio = @ $_REQUEST['dt_inicio'];
		$this->dt_termino = @ $_REQUEST['dt_termino'];
		$this->hr_inicio = @ $_REQUEST['hr_inicio'];
		$this->hr_termino = @ $_REQUEST['hr_termino'];
		$this->latitude = @ $_REQUEST['lat'];
		$this->longitude = @ $_REQUEST['lng'];
		$this->status = @ $_REQUEST['status'];
		$this->idoperacao = @ $_REQUEST['idoperacao'];

		//Salvar a Acao
		if ( $this->idacao ) {
			$this->update();
			
			global $_user;
			$this->saveLog('alterou acao ID '.$this->idacao, $_user->idusuario);
		} else {
			$this->idacao = $this->insert();
			
			global $_user;
			$this->saveLog('inserir acao ID '.$this->idacao, $_user->idusuario);
		}
		
		return array ( 'idacao' => $this->idacao );
	}
}
?>