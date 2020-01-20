<?php

class natureza extends database {

	public function obterTodos() {
		$sql = "SELECT idnatureza,natureza FROM natureza";
	
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
		$this->idnatureza = @ $_REQUEST['idnatureza'];
		$this->natureza = @ $_REQUEST['natureza'];
		
		if ( $this->idnatureza ) {
			$this->update();	
			global $_user;
			$this->saveLog('alterou natureza ID '.$this->idnatureza, $_user->idusuario);
		} else {
			if ( $rs = parent::fetch_all("SELECT idnatureza FROM natureza WHERE natureza='$this->natureza'") ) {
				$vet = array_shift($rs);
				$this->idnatureza = $vet['idnatureza'];
			} else {				
				$this->idnatureza = $this->insert();
				global $_user;
				$this->saveLog('inserir natureza ID '.$this->idnatureza, $_user->idusuario);
			}
		}
		
		return array ( 'idnatureza' => $this->idnatureza );
	}


}

?>