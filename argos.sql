-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.3.15-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Copiando estrutura do banco de dados para argos
CREATE DATABASE IF NOT EXISTS `argos` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `argos`;

-- Copiando estrutura para tabela argos.identificador
CREATE TABLE IF NOT EXISTS `identificador` (
  `idindicador` int(11) NOT NULL AUTO_INCREMENT,
  `indicador` text NOT NULL,
  PRIMARY KEY (`idindicador`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela argos.identificador: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `identificador` DISABLE KEYS */;
/*!40000 ALTER TABLE `identificador` ENABLE KEYS */;

-- Copiando estrutura para tabela argos.ocorrencia
CREATE TABLE IF NOT EXISTS `ocorrencia` (
  `idocorrencia` int(11) NOT NULL AUTO_INCREMENT,
  `ocorrencia` text NOT NULL DEFAULT '0',
  PRIMARY KEY (`idocorrencia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela argos.ocorrencia: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `ocorrencia` DISABLE KEYS */;
/*!40000 ALTER TABLE `ocorrencia` ENABLE KEYS */;

-- Copiando estrutura para tabela argos.operacao
CREATE TABLE IF NOT EXISTS `operacao` (
  `idoperacao` int(11) NOT NULL AUTO_INCREMENT,
  `nome_operacao` text NOT NULL DEFAULT '0',
  PRIMARY KEY (`idoperacao`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela argos.operacao: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `operacao` DISABLE KEYS */;
/*!40000 ALTER TABLE `operacao` ENABLE KEYS */;

-- Copiando estrutura para tabela argos.orgao
CREATE TABLE IF NOT EXISTS `orgao` (
  `idorgao` int(11) NOT NULL AUTO_INCREMENT,
  `orgao` text NOT NULL DEFAULT '0',
  PRIMARY KEY (`idorgao`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela argos.orgao: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `orgao` DISABLE KEYS */;
INSERT INTO `orgao` (`idorgao`, `orgao`) VALUES
	(1, 'PM'),
	(2, 'PF');
/*!40000 ALTER TABLE `orgao` ENABLE KEYS */;

-- Copiando estrutura para tabela argos.recurso
CREATE TABLE IF NOT EXISTS `recurso` (
  `idrecuso` int(11) DEFAULT NULL,
  `nome_recurso` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela argos.recurso: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `recurso` DISABLE KEYS */;
/*!40000 ALTER TABLE `recurso` ENABLE KEYS */;

-- Copiando estrutura para tabela argos.subindicador
CREATE TABLE IF NOT EXISTS `subindicador` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sub_indicador` text NOT NULL DEFAULT '0',
  `idindicador` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela argos.subindicador: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `subindicador` DISABLE KEYS */;
/*!40000 ALTER TABLE `subindicador` ENABLE KEYS */;

-- Copiando estrutura para tabela argos.transacao
CREATE TABLE IF NOT EXISTS `transacao` (
  `idtransacao` int(11) NOT NULL AUTO_INCREMENT,
  `transacao` text NOT NULL,
  `idusuario` int(11) NOT NULL,
  `dt_transacao` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`idtransacao`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela argos.transacao: ~17 rows (aproximadamente)
/*!40000 ALTER TABLE `transacao` DISABLE KEYS */;
INSERT INTO `transacao` (`idtransacao`, `transacao`, `idusuario`, `dt_transacao`) VALUES
	(1, 'Entrou', 1, '2020-01-20 11:19:42'),
	(2, 'Entrou', 1, '2020-01-20 11:23:33'),
	(3, 'Entrou', 1, '2020-01-20 11:23:54'),
	(4, 'Entrou', 1, '2020-01-20 11:24:10'),
	(5, 'Entrou', 1, '2020-01-20 11:25:29'),
	(6, 'Entrou', 1, '2020-01-20 11:25:50'),
	(7, 'Entrou', 1, '2020-01-20 11:26:51'),
	(8, 'Entrou', 1, '2020-01-20 11:32:09'),
	(9, 'Entrou', 1, '2020-01-20 11:36:35'),
	(10, 'Entrou', 1, '2020-01-20 12:05:19'),
	(11, 'Entrou', 1, '2020-01-20 13:34:08'),
	(12, 'renovou senha do usuario ID 1', 1, '2020-01-20 13:34:15'),
	(13, 'Entrou', 1, '2020-01-20 13:34:20'),
	(14, 'Entrou', 1, '2020-01-20 13:37:47'),
	(15, 'Entrou', 1, '2020-01-20 14:10:07'),
	(16, 'inserir orgao ID 2', 1, '2020-01-20 14:13:15'),
	(17, 'alterou usuario ID 1', 1, '2020-01-20 14:13:15'),
	(18, 'Entrou', 1, '2020-01-20 14:14:47'),
	(19, 'alterou usuario ID 1', 1, '2020-01-20 14:15:24'),
	(20, 'mudou senha', 1, '2020-01-20 14:16:48'),
	(21, 'Entrou', 1, '2020-01-20 14:16:56'),
	(22, 'Entrou', 1, '2020-01-20 14:17:05'),
	(23, 'Entrou', 1, '2020-01-20 14:19:04'),
	(24, 'alterou usuario ID 1', 1, '2020-01-20 14:19:09'),
	(25, 'Entrou', 1, '2020-01-20 14:19:14');
/*!40000 ALTER TABLE `transacao` ENABLE KEYS */;

-- Copiando estrutura para tabela argos.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `idusuario` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL DEFAULT '0',
  `email` varchar(50) NOT NULL DEFAULT '0',
  `senha` varchar(50) NOT NULL DEFAULT '0',
  `permissao` text NOT NULL DEFAULT '0',
  `idorgao` text NOT NULL DEFAULT '0',
  `ativado` char(1) NOT NULL DEFAULT 'S',
  `dt_update` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`idusuario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela argos.usuario: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` (`idusuario`, `nome`, `email`, `senha`, `permissao`, `idorgao`, `ativado`, `dt_update`) VALUES
	(1, 'Administrador', 'admin@admin.com', '21232f297a57a5a743894a0e4a801fc3', 'painel-acoes,cadastrar-acoes,cadastrar-relatorios,consulta-relatorios,usuario,mudasenha', '2', 'S', '2020-01-20 14:19:09');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
