<?php

class grupo_indicador extends database {

	public function obterTodos() {
		$sql = "SELECT * FROM grupo_indicador";
	
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
		$this->idgrupo_indicador = @ $_REQUEST['idgrupo_indicador'];
		$this->nome_grupo = @ $_REQUEST['nome_grupo'];
		
		if ( $this->idgrupo_indicador ) {
			$this->update();	
			global $_user;
			$this->saveLog('alterou grupo_indicador ID '.$this->idgrupo_indicador, $_user->idusuario);
		} else {
			if ( $rs = parent::fetch_all("SELECT idgrupo_indicador FROM grupo_indicador WHERE nome_grupo='$this->nome_grupo'") ) {
				$vet = array_shift($rs);
				$this->idgrupo_indicador = $vet['idgrupo_indicador'];
			} else {				
				$this->idgrupo_indicador = $this->insert();
				global $_user;
				$this->saveLog('inserir grupo de indicador ID '.$this->idgrupo_indicador, $_user->idusuario);
			}
		}
		
		return array ( 'idgrupo_indicador' => $this->idgrupo_indicador );
	}
}
?>