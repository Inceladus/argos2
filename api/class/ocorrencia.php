<?php

class ocorrencia extends database {

	public function obterTodos() {
		$sql = "SELECT * FROM ocorrencia";
	
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
		$this->idocorrencia = @ $_REQUEST['idocorrencia'];
		$this->ocorrencia = @ $_REQUEST['ocorrencia'];
		
		if ( $this->idocorrencia ) {
			$this->update();	
			global $_user;
			$this->saveLog('alterou ocorrencia ID '.$this->idocorrencia, $_user->idusuario);
		} else {
			if ( $rs = parent::fetch_all("SELECT idocorrencia FROM ocorrencia WHERE ocorrencia='$this->ocorrencia'") ) {
				$vet = array_shift($rs);
				$this->idocorrencia = $vet['idocorrencia'];
			} else {				
				$this->idocorrencia = $this->insert();
				global $_user;
				$this->saveLog('inserir ocorrencia ID '.$this->idocorrencia, $_user->idusuario);
			}
		}
		
		return array ( 'idocorrencia' => $this->idocorrencia );
	}


}

?>