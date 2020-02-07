<?php

class indicador extends database {

	public function obterTodos() {
		$sql = "SELECT * FROM indicador";
	
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
		$this->idindicador = @ $_REQUEST['idindicador'];
		$this->indicador = @ $_REQUEST['indicador'];
		$this->idgrupo_indicador = @ $_REQUEST['idgrupo_indicador'];
		
		if ( $this->idindicador ) {
			$this->update();	
			global $_user;
			$this->saveLog('alterou indicador ID '.$this->idindicador, $_user->idusuario);
		} else {
			if ( $rs = parent::fetch_all("SELECT idindicador FROM indicador WHERE indicador='$this->indicador'") ) {
				$vet = array_shift($rs);
				$this->idindicador = $vet['idindicador'];
			} else {				
				$this->idindicador = $this->insert();
				global $_user;
				$this->saveLog('inserir indicador ID '.$this->idindicador, $_user->idusuario);
			}
		}
		
		return array ( 'idindicador' => $this->idindicador );
	}


}

?>