<?php

class status extends database {

	public function obterTodos() {
		$sql = "SELECT idstatus, status FROM status";
		if ( $rs = parent::fetch_all($sql) ) {
			foreach ( $rs as $row ) {
				$col = array();
				foreach ( $row as $k=>$v ) {
					$col[$k] = ($v);
				}
				$rows[] = $col;
			}
			return array( 'data' => $rows );
		}
	} 
	public function salvar() {
		$this->idstatus = @ $_REQUEST['idstatus'];
		$this->status = @ $_REQUEST['status'];
	
		if ( $this->idstatus ) {
			$this->dt_update = date('Y-m-d H:i:s');
			$this->update();
			
			global $_user;
			$this->saveLog('alterou status ID '.$this->idstatus, $_user->idusuario);
		} else {
			$this->idstatus = $this->insert();
			global $_user;
			$this->saveLog('inserir status ID '.$this->id, $_user->idusuario);
		}
		
		return array ( 'idstatus' => $this->idstatus );
	}

}

?>