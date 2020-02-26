<?php

class acao_instituicao extends database {
	public function obterTodos() {
		$sql = "SELECT a.idacao AS aidacao, a.nome_acao AS anome_acao, a.dt_inicio AS adt_inicio, a.dt_termino AS adt_termino, a.hr_inicio AS ahr_inicio, a.hr_termino AS ahr_termino, a.latitude AS alatitude, a.longitude AS alongitude, 
			a.status AS status, a.idoperacao AS aidoperacao, o.nome_operacao, ainst.idacao_instituicao, 
			ainst.idinstituicao, ainst.idacao, ainst.responsavel, i.instituicao
			FROM acao a
			INNER JOIN operacao o
			ON o.idoperacao = a.idoperacao
			INNER JOIN acao_instituicao ainst
			ON a.idacao = ainst.idacao
			INNER JOIN instituicao i
			ON ainst.idinstituicao = i.idinstituicao
			WHERE ainst.idacao = ".$_REQUEST['idacao'];
	
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
			$this->idacao_instituicao = $this->insert();
			$this->saveLog('inserir acao_instituicao ID '.$this->idacao_instituicao, $_user->idusuario);
		}
		return array ( 'idacao_instituicao' => $this->idacao_instituicao );
	}
}
?>