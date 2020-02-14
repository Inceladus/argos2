<?php

class acao extends database {
	
	public function obterTodos() {
		$sql = "SELECT idacao, nome_acao, dt_inicio, dt_termino, hr_inicio, hr_termino, latitude, longitude, status, 
			a.idoperacao, o.nome_operacao
			FROM acao a
			INNER JOIN operacao o
			ON a.idoperacao = o.idoperacao";
	
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
	
		if ( $this->idacao ) {
			$this->nome_acao = @ $_REQUEST['nome_acao'];
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