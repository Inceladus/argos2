<?php

class indicador extends database {

	public function obterTodos() {
		$sql = "SELECT idindicador, indicador, i.idgrupo_indicador,g.nome_grupo, i.dt_update 
			FROM indicador i
			INNER JOIN grupo_indicador g
			WHERE i.idgrupo_indicador = g.idgrupo_indicador";
	
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
			$this->dt_update = date('Y-m-d H:i:s');
			$this->update();
			
			global $_user;
			$this->saveLog('alterou indicador ID '.$this->idindicador, $_user->idusuario);
		} else {
			$this->idindicador = $this->insert();
			global $_user;
			$this->saveLog('inserir indicador ID '.$this->id, $_user->idusuario);
		}
		
		return array ( 'idindicador' => $this->idindicador );
	}

}

?>