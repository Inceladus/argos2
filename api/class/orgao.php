<?php

class orgao extends database {

	public function obterTodos() {
		$sql = "SELECT idorgao , orgao FROM orgao";
	
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
		$this->idorgao = @ $_REQUEST['idorgao'];
		$this->orgao = @ $_REQUEST['orgao'];
		
		if ( $this->idorgao ) {
			$this->update();	
			global $_user;
			$this->saveLog('alterou orgao ID '.$this->idorgao, $_user->idusuario);
		} else {
			if ( $rs = parent::fetch_all("SELECT idorgao FROM orgao WHERE orgao='$this->orgao'") ) {
				$vet = array_shift($rs);
				$this->idorgao = $vet['idorgao'];
			} else {				
				$this->idorgao = $this->insert();
				global $_user;
				$this->saveLog('inserir orgao ID '.$this->idorgao, $_user->idusuario);
			}
		}
		
		return array ( 'idorgao' => $this->idorgao );
	}


}

?>