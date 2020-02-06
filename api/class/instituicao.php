<?php

class instituicao extends database {

	public function obterTodos() {
		$sql = "SELECT idinstituicao , instituicao FROM instituicao";
	
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
		$this->idinstituicao = @ $_REQUEST['idinstituicao'];
		$this->instituicao = @ $_REQUEST['instituicao'];
		
		if ( $this->idinstituicao ) {
			$this->update();	
			global $_user;
			$this->saveLog('alterou instituicao ID '.$this->idinstituicao, $_user->idusuario);
		} else {
			if ( $rs = parent::fetch_all("SELECT idinstituicao FROM instituicao WHERE instituicao='$this->instituicao'") ) {
				$vet = array_shift($rs);
				$this->idinstituicao = $vet['idinstituicao'];
			} else {				
				$this->idinstituicao = $this->insert();
				global $_user;
				$this->saveLog('inserir instituicao ID '.$this->idinstituicao, $_user->idusuario);
			}
		}
		
		return array ( 'idinstituicao' => $this->idinstituicao );
	}


}

?>