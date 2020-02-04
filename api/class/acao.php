<?php

class acao extends database {
	
	public function obterTodos() {
		$sql = "SELECT nome_acao, dt_inicio, dt_termino, status, idoperacao FROM acao";
	
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
		$this->idoperacao = @ $_REQUEST['idoperacao'];
		$this->nome_operacao = (@ $_REQUEST['nome_operacao']);
	
		if ( $this->idoperacao ) {
			$this->nome_operacao = @ $_REQUEST['nome_operacao'];
			$this->update();
			
			global $_user;
			$this->saveLog('alterou operacao ID '.$this->idoperacao, $_user->idusuario);
		} else {
			$this->idoperacao = $this->insert();
			
			global $_user;
			$this->saveLog('inserir operacao ID '.$this->idoperacao, $_user->idusuario);
		}
		
		return array ( 'idoperacao' => $this->idoperacao );
	}
}
?>