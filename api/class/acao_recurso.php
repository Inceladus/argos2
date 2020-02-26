<?php

class acao_recurso extends database {
	public function obterTodos() {
		$sql = "SELECT a.idacao AS aidacao, a.nome_acao AS anome_acao, a.dt_inicio AS adt_inicio, a.dt_termino AS adt_termino, a.hr_inicio AS ahr_inicio, a.hr_termino AS ahr_termino, a.latitude AS alatitude, a.longitude AS alongitude, 
			a.status AS status, a.idoperacao AS aidoperacao, o.nome_operacao, arec.idacao_recurso, 
			arec.idrecurso, arec.idacao, arec.quantidade, r.recurso
			FROM acao a
			INNER JOIN operacao o
			ON o.idoperacao = a.idoperacao
			INNER JOIN acao_recurso arec
			ON a.idacao = arec.idacao
			INNER JOIN recurso r
			ON arec.idrecurso = r.idrecurso
			WHERE arec.idacao = ".$_REQUEST['idacao'];
	
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
		$this->idacao_recurso = @ $_REQUEST['idacao_recurso'];
		$this->idrecurso = @ $_REQUEST['idrecurso'];
		$this->idacao = @ $_REQUEST['idacao'];
		$this->quantidade = @ $_REQUEST['quantidade'];

		if ( $this->idacao_recurso ) {
			$this->update();
			$this->saveLog('alterou acao_recurso ID '.$this->idacao_recurso, $_user->idusuario);
		} else {
			$this->idacao_recurso = $this->insert();
			$this->saveLog('inserir acao_recurso ID '.$this->idacao_recurso, $_user->idusuario);
		}
		return array ( 'idacao_recurso' => $this->idacao_recurso );
	}
}
?>