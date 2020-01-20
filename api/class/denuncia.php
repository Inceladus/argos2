<?php

class denuncia extends database {

	public function denunciar() {
		// variaveis da denuncia
		$this->denuncia = (@ $_REQUEST['denuncia']);
		$this->dt_abertura = (@ $_REQUEST['dt_abertura']);
		$this->situacao = 'REGISTRADA';
		
		// grava denuncia
		$this->id = $this->insert();
		
		// variaveis do local da denuncia
		$tipo = (@ $_REQUEST['type']);
		$nome = (@ $_REQUEST['placename']);
		$logradouro = (@ $_REQUEST['address']);
		$bairro = (@ $_REQUEST['district']);
		$municipio = (@ $_REQUEST['city']);
		$estado = (@ $_REQUEST['region']);
		$cep = @ $_REQUEST['postal'];
		$latitude = @ $_REQUEST['lat'];
		$longitude = @ $_REQUEST['lng'];

		// grava local da denuncia
		$this->execute("INSERT INTO local_denuncia (iddenuncia, tipo, nome, logradouro, bairro, municipio, estado, cep, latitude, longitude) VALUES ($this->id, '$tipo', '$nome', '$logradouro', '$bairro', '$municipio', '$estado', '$cep', $latitude, $longitude)");

		// verifica se algum arquivo foi anexado
		if ( @ $_FILES['file']['size'][0] > 0 ) {
			$dir = "../midia/" . $this->id;
			if ( ! is_dir($dir) ) mkdir ($dir);

			for ( $i=0; @ $_FILES['file']['name'][$i]; $i++ ) {
				$_FILES['file']['name'][$i] = sanitize($_FILES['file']['name'][$i]);
				move_uploaded_file( $_FILES['file']['tmp_name'][$i], "$dir/".$_FILES['file']['name'][$i] );
			}		
		}

		return array ( 'id' => $this->id );
	}

	public function obterRegistradas() {
		$sql = "SELECT d.iddenuncia, denuncia, dt_registro, tipo, nome, logradouro, bairro, municipio, estado, cep, referencia, latitude, longitude
		FROM denuncia as d
		INNER JOIN local_denuncia ld ON d.iddenuncia=ld.iddenuncia
		WHERE situacao='REGISTRADA'";
	
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






/*

	public function obterSetores() {
		$sql = "SELECT setor FROM denuncia group by setor";
	
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

	public function enviarMail() {


/*
		//SMTP
		$assunto = "Protocolo de abertura de chamada: $this->id";
		$mensagem = "<h2>Olá $this->solicitante.</h2><p>Sua solicitação de <i>$this->denuncia</i> foi registrada com sucesso no protocolo Nº $this->id.</p><p>Em breve, entraremos em contato com você no seu setor.</p><p>Em caso de dúvidas entre em contrato com o DITEL através do telefone (91)3184-2523.</p><p>Atenciosamente</p><p>Suporte Técnico do DITEL</p>";

		require_once('mail.php');
		$enviado = enviarEmail($this->email, $this->solicitante, $assunto, $mensagem);
		if ($enviado == true) {
			return array ( 'id' => $this->id );
		} else {
			return array ( 'error' => "Solicitação registrada, mas não foi possivel enviar o email ($enviado)" );
		}


	}
	
	public function obter() {
		$sql = "SELECT id, solicitante, setor, email, contato, denuncia, prioridade, dt_denuncia, dt_update, situacao, usuario_id, diagnostico FROM denuncia WHERE id=".$_REQUEST['id'];
	
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

	public function obterTodos() {
		$sql = "SELECT id, solicitante, setor, email, contato, denuncia, prioridade, dt_denuncia, dt_update, situacao, usuario_id, diagnostico FROM denuncia";
	
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

	public function obterDiagnostico(){
		$sql = "SELECT diagnostico from denuncia WHERE diagnostico<>'' GROUP BY diagnostico";
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

	public function obterTodosEmAberto() {
		$sql = "SELECT id, solicitante, setor, email, contato, denuncia, prioridade, dt_denuncia, dt_update, situacao, usuario_id, diagnostico FROM denuncia WHERE situacao='EM ABERTO'";
	
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

	public function obterTodosAguardandoAtendimento() {
		global $_user;

		$sql = "SELECT id, solicitante, setor, email, contato, denuncia, prioridade, dt_denuncia,  TIMEDIFF(now(),dt_update) 'espera', situacao, usuario_id, diagnostico FROM denuncia WHERE (situacao='AGUARDANDO ATENDIMENTO' or situacao='EM ATENDIMENTO') AND usuario_id='$_user->id'";

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

	public function distribuir() {
		global $_user;
		$this->id = @ $_REQUEST['id'];
		$this->usuario_id = @ $_REQUEST['usuario_id'];
		if ( @  $_REQUEST['prioridade'] ) $this->prioridade = "S";
		else $this->prioridade = "N";
		$this->situacao = "AGUARDANDO ATENDIMENTO";
		$this->dt_update = date('Y-m-d H:i:s');
		$this->update();

		require "classes/usuario.php";
		$_usuario = new usuario();
		$rs = $_usuario->obter();
		$usuario = $rs['data'][0];
		
		require "classes/tramitacao.php";
		$_tramitacao = new tramitacao();		
		$_REQUEST['tramitacao'] = "distribuiu denuncia para ".$usuario['nome']."/".$usuario['setor'];
		$_REQUEST['usuario_id'] = $_user->id;
		$_REQUEST['denuncia_id'] = @ $_REQUEST['id'];
		$_REQUEST['id'] = null;
		$_tramitacao->salvar();

		//SMTP
		$sql = "SELECT * FROM denuncia WHERE id = ".$this->id;
		if ( $rs = parent::fetch_all($sql) ) {
			$vet = array_shift($rs);
			$id = $vet['id'];
			$solicitante = $vet['solicitante'];
			$setor = $vet['setor'];
			$email = $vet['email'];
			$denuncia = $vet['denuncia'];

			//SMTP
			$assunto = "Protocolo de abertura de chamada: $this->id";
			$mensagem = "<h2>Olá $solicitante.</h2><p>Sua solicitação de <i>$denuncia</i> foi distribuida com sucesso e logo algum técnico irá para sua sessão <p>Em caso de dúvidas entre em contrato com o DITEL através do telefone (91)3184-2523.</p><p>Atenciosamente</p><p>Suporte Técnico do DITEL</p>";
			require_once('mail.php');
			$enviado = enviarEmail($email, $solicitante, $assunto, $mensagem);
			if ($enviado == true) {
				return array ( 'id' => $this->id );
			} else {
				return array ( 'error' => "denuncia $this->id registrada, mas não foi possivel enviar o email ($enviado)" );
			}
		}
	}

	public function diagnosticar() {
		global $_user;
		$this->id = @ $_REQUEST['id'];
		$this->diagnostico = (@ $_REQUEST['diagnostico']);
		$this->situacao = "EM ATENDIMENTO";
		$this->dt_update = date('Y-m-d H:i:s');
		$this->update();

		require "classes/tramitacao.php";
		$_tramitacao = new tramitacao();
		$_REQUEST['usuario_id'] = $_user->id;
		$_REQUEST['denuncia_id'] = @ $_REQUEST['id'];
		$_REQUEST['id'] = null;
		$_tramitacao->salvar();

		$this->saveLog("Diagnosticou denuncia ID $this->id", $_user->id);
		return array ( 'id' => $this->id );	
	}

	public function finalizar() {
		global $_user;
		$this->id = @ $_REQUEST['id'];
		$this->diagnostico = (@ $_REQUEST['diagnostico']);
		$this->situacao = "FINALIZADO";
		$this->dt_update = date('Y-m-d H:i:s');
		$this->update();

		require "classes/tramitacao.php";
		$_tramitacao = new tramitacao();
		$_REQUEST['usuario_id'] = $_user_id;
		$_REQUEST['denuncia_id'] = @ $_REQUEST['id'];
		$_REQUEST['id'] = null;
		$_tramitacao->salvar();

		//SMTP
		$sql = "SELECT * FROM denuncia WHERE id = ".$this->id;
		if ( $rs = parent::fetch_all($sql) ) {
			$vet = array_shift($rs);
			$id = $vet['id'];
			$solicitante = $vet['solicitante'];
			$setor = $vet['setor'];
			$email = $vet['email'];
			$denuncia = $vet['denuncia'];
			$diagnostico = $vet['diagnostico'];
			//SMTP
			$assunto = "Protocolo de abertura de chamada: $this->id";
			$mensagem = "<h2>Olá $solicitante.</h2><p>Sua solicitação de <i>$denuncia</i> foi finalizada com e o diagnostico foi:".$diagnostico." <p>Em caso de dúvidas entre em contrato com o DITEL através do telefone (91)3184-2523.</p><p>Atenciosamente</p><p>Suporte Técnico do DITEL</p>";
			require_once('mail.php');
			$enviado = enviarEmail($email, $solicitante, $assunto, $mensagem);
			if ($enviado == true) {
				$this->saveLog("Finalizou denuncia ID $this->id", $_user->id);
				return array ( 'id' => $this->id );
			} else {
				return array ( 'error' => "Solicitação finalizada, mas não foi possivel enviar o email ($enviado)" );
			}
		}
	}

	public function contarSolicitacoes(){
		$sql = "SELECT COUNT(*) as total,
				(SELECT COUNT(*) from denuncia WHERE situacao = 'EM ABERTO') as aberto,
				(SELECT COUNT(*) from denuncia WHERE situacao = 'AGUARDANDO ATENDIMENTO') as aguardando,
				(SELECT COUNT(*) from denuncia WHERE situacao = 'FINALIZADO') as finalizado 
		 		from denuncia";
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
	/*
	public function contarSolicitacoesEmAberto(){
		$sql = "SELECT COUNT(*) as aberto  from denuncia WHERE situacao = 'EM ABERTO'";
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
	public function contarSolicitacoesAguardandoAtendimento(){
		$sql = "SELECT COUNT(*) as aguardando from denuncia WHERE situacao = 'AGUARDANDO ATENDIMENTO'";
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
	public function contarSolicitacoesFinalizadas(){
		$sql = "SELECT COUNT(*) as finalizadas from denuncia WHERE situacao = 'FINALIZADO'";
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

*/
}
?>