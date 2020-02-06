<?php

class recurso extends database {
	
	public function obterTodos() {
		$sql = "SELECT * FROM recurso";
	
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
		$this->idrecurso = @ $_REQUEST['idrecurso'];
		$this->recurso = (@ $_REQUEST['recurso']);
	
		if ( $this->idrecurso ) {
			$this->recurso = @ $_REQUEST['recurso'];
			$this->update();
			
			global $_user;
			$this->saveLog('alterou recurso ID '.$this->idrecurso, $_user->idusuario);
		} else {
			$this->idrecurso = $this->insert();
			
			global $_user;
			$this->saveLog('inserir recurso ID '.$this->idrecurso, $_user->idusuario);
		}
		
		return array ( 'idrecurso' => $this->idrecurso );
	}
}
?>