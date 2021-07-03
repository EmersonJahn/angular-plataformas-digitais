<?php

date_default_timezone_set('America/Sao_Paulo');

ini_set("log_errors", 1);
ini_set("error_log", "./php-error.log");

require(__DIR__ . '/config.php');

class Connection {

    private $connection;
    private $host     = DB_HOST;
    private $user     = DB_USER;
    private $pass     = DB_PASS;
    private $database = DB_NAME;
	private $encode   = DB_ENCODE;

    function __construct() {
		
		$conn = pg_connect("host=".$this->host." user=".$this->user." dbname=".$this->database." password=".$this->pass);
	
        pg_set_client_encoding($conn, $this->encode);

		if (!$conn) {
            utilEchoDbConnectionError();
            exit;
	    }

	    $this->connection = $conn;

	    return $conn;
    }

    function connSelectToObject($sql) {
		$result = pg_query($sql);
		if (!$result) {
			return null;
		}

		$res = pg_fetch_assoc($result);
		$std = new \stdClass();

		foreach ($res as $key => $value) {
			$std->$key = $value;
		}

		return $std;
	}

	function connSelectToObjectList($sql) {
		$list = [];

		$result = pg_query($sql);
		if (!$result) {
			return null;
		}

		while ($row = pg_fetch_assoc($result)) {
			$std = new \stdClass();

			foreach ($row as $key => $value) {
				$std->$key = $value;
			}

			$list[] = $std;
		}

		return $list;
	} 

	function connSelectToArrayList($sql) {
		$list = [];

		$result = pg_query($sql);
		if (!$result) {
			return null;
		}

		while ($row = pg_fetch_assoc($result)) {
            $list[] = $row;
		}

		return $list;
	} 

	function connGetCategories() {
		$sql = "SELECT * FROM categoria ORDER BY categoria.descricao";
		return $this->connSelectToArrayList($sql);
	}
	
	function connGetProjectStatus() {
		$sql = "SELECT * FROM status_projeto ORDER BY status_projeto.id";
		return $this->connSelectToArrayList($sql);
	}

	function connGetCategoryById($categoryId) {
		$sql = "SELECT * FROM categoria WHERE categoria.id = $categoryId";
		return $this->connSelectToObject($sql);
	}

	function connValidLogin($email, $password) {
		$status   = 0;
		$message  = "Ocorreu um erro desconhecido ao validar o login.";
		$personId = 0;

		$sql = "SELECT * FROM pessoa WHERE pessoa.email = '$email'";
		$result = pg_fetch_assoc(pg_query($sql));
		if ($result) {

			if (trim($result['senha']) == $password) {
				$status   = 1;
				$message  = "Login realizado com sucesso!";
				$personId = intval($result['id']);

			} else {
				$message = "Senha incorreta.";
			}
			
		} else {
			$message = "E-mail não cadastrado.";
		}

		return "$status|$message|$personId";
	}

	function connGetPersonById($personId) {
		$sql = "SELECT * FROM pessoa WHERE pessoa.id =  $personId";
		return $this->connSelectToObject($sql);
	}

	function connCreateProblem($problem) {
		$personId        = intval($problem['person']['id']);
		$categoryId      = intval($problem['category']['id']);
		$title           = trim($problem['title']);
		$description     = trim($problem['description']);
		$problemStatusId = intval($problem['problem_status_id']);
		$numberAnswers   = intval($problem['number_answers']);

		$sql = "INSERT INTO problema (pessoa_id, categoria_id, titulo, descricao, status_problema_id, numero_respostas) 
							VALUES ($personId, $categoryId, '$title', '$description', $problemStatusId, $numberAnswers)";

		return pg_affected_rows(pg_query($sql)) > 0 ? true : false;
	}

	function connValidPersonEmail($email) {
		$sql = "SELECT * FROM pessoa WHERE pessoa.email = '$email'";
		return pg_fetch_assoc(pg_query($sql)) ? true : false;
	}

	function connUpdatePersonPassword($password, $email) {
		$sql = "UPDATE pessoa SET senha = '$password' WHERE pessoa.email = '$email'";
		return pg_affected_rows(pg_query($sql)) > 0 ? true : false;
	}

	function connCreateAnswer($answer) {
		$problemId      = intval($answer['problem']['id']);
		$personId       = intval($answer['person']['id']);
		$response       = trim($answer['answer']);
		$answerStatusId = intval($answer['answer_status_id']);

		$answerId = 0;
		$sql = "INSERT INTO resposta (problema_id, pessoa_id, resposta, status_resposta_id, resposta_correta) 
							VALUES ($problemId, $personId, '$response', $answerStatusId, 'false') RETURNING id";

		$result = pg_fetch_assoc(pg_query($sql));
		if ($result) {
			$answerId = intval($result['id']);
		}

		return $answerId;
	}

	function connCreatePendingAnswer($problemId, $answerId) {
		$sql = "INSERT INTO resposta_aprovacao_pendente (problema_id, resposta_id) VALUES ($problemId, $answerId)";
		return pg_affected_rows(pg_query($sql)) > 0 ? true : false;
	}

	function connGetAnswersByProblemId($problemId) {
		$sql = "SELECT r.*, pe.tipo_pessoa_id tipo_pessoa_id, pe.nome pessoa_nome, pe.cpf pessoa_cpf, pe.cnpj pessoa_cnpj, pe.email pessoa_email, pe.foto_perfil pessoa_foto_perfil 
				FROM resposta r JOIN pessoa pe ON r.pessoa_id = pe.id WHERE r.problema_id = $problemId AND r.status_resposta_id = 2";
		// $sql = "SELECT * FROM resposta WHERE resposta.problema_id = $problemId AND resposta.status_resposta_id = 2";
		return $this->connSelectToObjectList($sql);
	}

	function connGetAnswerById($answerId) {
		$sql = "SELECT r.*, p.id pessoa_id, p.tipo_pessoa_id tipo_pessoa_id, p.nome pessoa_nome, p.cpf pessoa_cpf, p.cnpj pessoa_cnpj, p.email pessoa_email, p.foto_perfil pessoa_foto_perfil
				FROM resposta r JOIN pessoa p ON r.pessoa_id = p.id WHERE r.id = $answerId";
		return $this->connSelectToObject($sql);
	}

	function connGetPendingAnswers() {
		// $sql = "SELECT rap.* , p.id pessoa_id, p.tipo_pessoa_id tipo_pessoa_id, p.nome pessoa_nome, p.cpf pessoa_cpf, p.cnpj pessoa_cnpj, p.email pessoa_email, p.foto_perfil pessoa_foto_perfil, pr.titulo problema_titulo
		// 		FROM resposta_aprovacao_pendente rap JOIN resposta r ON rap.resposta_id = r.id JOIN pessoa p ON r.pessoa_id = p.id JOIN problema pr ON rap.problema_id = pr.id ORDER BY rap.id";
		$sql = "SELECT * FROM resposta_aprovacao_pendente";
		return $this->connSelectToObjectList($sql);
	}

	function connApprovalAnswer($pendingAnswer, $approved) {
		$statusAnswer    = $approved ? 2 : 3;
		$pendingAnswerId = intval($pendingAnswer['id']);
		$problemId       = intval($pendingAnswer['problem']['id']);
		$answerId        = intval($pendingAnswer['answer']['id']);

		$sql = "UPDATE resposta SET status_resposta_id = $statusAnswer WHERE resposta.problema_id = $problemId AND resposta.id = $answerId";
		if (pg_affected_rows(pg_query($sql)) == 0) {
			return false;
		}

		$sql2 = "DELETE FROM resposta_aprovacao_pendente WHERE resposta_aprovacao_pendente.id = $pendingAnswerId";
		if (pg_affected_rows(pg_query($sql2)) == 0) {
			return false;
		}

		$sql3 = "SELECT numero_respostas FROM problema WHERE problema.id = $problemId";
		$result = pg_fetch_assoc(pg_query($sql3));
		if (!$result) {
			return false;
		}

		$numberAnswers = intval($result['numero_respostas']) + 1;
		$sql4 = "UPDATE problema SET numero_respostas = $numberAnswers WHERE problema.id = $problemId";
		if (pg_affected_rows(pg_query($sql4)) == 0) {
			return false;
		}

		return true;
	}

	function connGetProblemById($problemId) {
		$sql = "SELECT pr.*, pe.tipo_pessoa_id tipo_pessoa_id, pe.nome pessoa_nome, pe.cpf pessoa_cpf, pe.cnpj pessoa_cnpj, pe.email pessoa_email, pe.foto_perfil pessoa_foto_perfil, c.descricao categoria_descricao 
				FROM problema pr JOIN pessoa pe ON pr.pessoa_id = pe.id JOIN categoria c ON pr.categoria_id = c.id WHERE pr.id = $problemId";
		// $sql = "SELECT * FROM problema WHERE problema.id = $problemId";
		return $this->connSelectToObject($sql);
	}

	function connGetProblems($searchBy, $categoryId) {
		$condition = "";
		if (!empty($searchBy)) {
			$condition .= " WHERE UPPER(pr.titulo) LIKE '%$searchBy%' ";
		}
		if ($categoryId > 0) {
			$condition .= empty($condition) ? " WHERE " : " AND ";
			$condition .= " pr.categoria_id = $categoryId";
		}

		$sql = "SELECT pr.*, pe.tipo_pessoa_id tipo_pessoa_id, pe.nome pessoa_nome, pe.cpf pessoa_cpf, pe.cnpj pessoa_cnpj, pe.email pessoa_email, pe.foto_perfil pessoa_foto_perfil, c.descricao categoria_descricao 
				FROM problema pr JOIN pessoa pe ON pr.pessoa_id = pe.id JOIN categoria c ON pr.categoria_id = c.id $condition ORDER BY pr.id";
		return $this->connSelectToObjectList($sql);
	}

	function connSavePerson($person) {
		$personId     = intval($person['id']);
		$personTypeId = intval($person['person_type_id']);
		$name         = trim($person['name']);
		$cpf          = $personTypeId == 1 ? trim($person['cpf'])  : "";
		$cnpj         = $personTypeId == 2 ? trim($person['cnpj']) : "";
		$email        = trim($person['email']);
		$password     = trim($person['password']);
		$profilePhoto = trim($person['profile_photo']);

		if ($personId > 0) {
			$sql = "SELECT * FROM pessoa WHERE pessoa.id = $personId";
			$result = pg_fetch_assoc(pg_query($sql));

			if ($result) {
				if (empty($password)) {
					$password = $result['senha'];
				}

				$sql2 = "UPDATE pessoa SET 
							tipo_pessoa_id = $personTypeId,
							nome           = '$name'      ,
							cpf            = '$cpf'       , 
							cnpj           = '$cnpj'      , 
							email          = '$email'     , 
							senha          = '$password'  , 
							foto_perfil    = '$profilePhoto'
						 WHERE pessoa.id = $personId";

				return pg_affected_rows(pg_query($sql2)) > 0 ? true : false;
			}
		}

		$sql = "INSERT INTO pessoa (tipo_pessoa_id, nome, cpf, cnpj, email, senha, foto_perfil) VALUES ($personTypeId, '$name', '$cpf', '$cnpj', '$email', '$password', '$profilePhoto')";
		return pg_affected_rows(pg_query($sql)) > 0 ? true : false;
	}

	function connCreateProject($project) {
		$personId        = intval($project['person']['id']);
		$categoryId      = intval($project['category']['id']);
		$title           = trim($project['title']);
		$description     = trim($project['description']);
		$projectPhoto    = trim($project['project_photo']);
		$projectStatusId = intval($project['project_status']['id']);

		$sql = "INSERT INTO projeto (pessoa_id, categoria_id, titulo, descricao, foto_projeto, status_projeto_id) VALUES ($personId, $categoryId, '$title', '$description', '$projectPhoto', $projectStatusId)";
		return pg_affected_rows(pg_query($sql)) > 0 ? true : false;
	}

	function connGetProjects($searchBy, $categoryId) {
		$condition = "";
		if (!empty($searchBy)) {
			$condition .= " WHERE UPPER(pr.titulo) LIKE '%$searchBy%' ";
		}
		if ($categoryId > 0) {
			$condition .= empty($condition) ? " WHERE " : " AND ";
			$condition .= " pr.categoria_id = $categoryId";
		}

		// $sql = "SELECT pr.*, pe.tipo_pessoa_id tipo_pessoa_id, pe.nome pessoa_nome, pe.cpf pessoa_cpf, pe.cnpj pessoa_cnpj, pe.email pessoa_email, pe.foto_perfil pessoa_foto_perfil, c.descricao categoria_descricao 
		$sql = "SELECT pr.*, pe.tipo_pessoa_id tipo_pessoa_id, pe.nome pessoa_nome, pe.cpf pessoa_cpf, pe.cnpj pessoa_cnpj, pe.email pessoa_email, pe.foto_perfil pessoa_foto_perfil, c.descricao categoria_descricao, ps.descricao status_projeto_descricao 
				FROM projeto pr JOIN pessoa pe ON pr.pessoa_id = pe.id JOIN categoria c ON pr.categoria_id = c.id JOIN status_projeto ps ON pr.status_projeto_id = ps.id $condition ORDER BY pr.id";
		return $this->connSelectToObjectList($sql);
	}

	function connGetProjectById($projectId) {
		$sql = "SELECT pr.*, pe.tipo_pessoa_id tipo_pessoa_id, pe.nome pessoa_nome, pe.cpf pessoa_cpf, pe.cnpj pessoa_cnpj, pe.email pessoa_email, pe.foto_perfil pessoa_foto_perfil, c.descricao categoria_descricao, ps.descricao status_projeto_descricao 
				FROM projeto pr JOIN pessoa pe ON pr.pessoa_id = pe.id JOIN categoria c ON pr.categoria_id = c.id JOIN status_projeto ps ON pr.status_projeto_id = ps.id WHERE pr.id = $projectId";
		return $this->connSelectToObject($sql);
	}

	function connUpdateProject($project) {
		$projectId       = intval($project['id']);
		$categoryId      = intval($project['category']['id']);
		$title           = trim($project['title']);
		$description     = trim($project['description']);
		$projectPhoto    = trim($project['project_photo']);
		$projectStatusId = intval($project['project_status']['id']);
		
		$sql = "UPDATE projeto SET 
					categoria_id      = $categoryId    ,
					titulo            = '$title'       ,
					descricao         = '$description' ,
					foto_projeto      = '$projectPhoto',
					status_projeto_id = $projectStatusId
				WHERE id = $projectId";
		return pg_affected_rows(pg_query($sql)) > 0 ? true : false;
	}

	function connGetProjectMembersByProjectId($projectId) {
		$sql = "SELECT i.*, pe.tipo_pessoa_id tipo_pessoa_id, pe.nome pessoa_nome, pe.cpf pessoa_cpf, pe.cnpj pessoa_cnpj, pe.email pessoa_email, pe.foto_perfil pessoa_foto_perfil 
				FROM integrante i JOIN pessoa pe ON i.pessoa_id = pe.id WHERE i.projeto_id = $projectId AND i.status_integrante_id = 2";
		return $this->connSelectToObjectList($sql);
	}

	function connRemoveProjectMembers($projectMembers) {
		foreach ($projectMembers as $pm) {
			$projectId = intval($pm['project_id']);
			$personId  = intval($pm['person']['id']);

			$sql = "DELETE FROM integrante WHERE projeto_id = $projectId AND pessoa_id = $personId";
			if (pg_affected_rows(pg_query($sql)) == 0) {
				return false;
			}
		}
		return true;
	}

	function connCreatePendingProjectMember($pendingProjectMember) {
		$allCreated = false;

		$projectId    = $pendingProjectMember['project_id'];
		$personId     = $pendingProjectMember['person']['id'];
		$presentation = $pendingProjectMember['presentation'];

		$sql = "INSERT INTO integrante_aprovacao_pendente (projeto_id, pessoa_id, apresentacao) VALUES ($projectId, $personId, '$presentation')";

		if (pg_affected_rows(pg_query($sql)) > 0) {
			$sql2 = "INSERT INTO integrante (projeto_id, pessoa_id, status_integrante_id) VALUES ($projectId, $personId, 1)";

			if (pg_affected_rows(pg_query($sql2)) > 0) {
				$allCreated = true;	
			}
		}
		
		return $allCreated;
	}

	function connGetPendingMembersCount($projectId) {
		$sql = "SELECT COUNT(*) FROM integrante WHERE integrante.projeto_id = $projectId AND integrante.status_integrante_id = 1";
		$result = pg_fetch_assoc(pg_query($sql));
		return $result ? intval($result['count']) : 0;
	}

	function connGetPendingProjectMembers($projectId) {
		$sql = "SELECT iap.*, pe.tipo_pessoa_id tipo_pessoa_id, pe.nome pessoa_nome, pe.cpf pessoa_cpf, pe.cnpj pessoa_cnpj, pe.email pessoa_email, pe.foto_perfil pessoa_foto_perfil 
				FROM integrante_aprovacao_pendente iap JOIN pessoa pe ON iap.pessoa_id = pe.id WHERE iap.projeto_id = $projectId ORDER BY iap.id";
		return $this->connSelectToObjectList($sql);
	}

	function connApprovalProjectMember($pendingProjectMember, $approved) {
		$statusProjectMember    = $approved ? 2 : 3;
		$pendingProjectMemberId = intval($pendingProjectMember['id']);
		$projectId              = intval($pendingProjectMember['project_id']);
		$personId               = intval($pendingProjectMember['person']['id']);

		$sql = "UPDATE integrante SET status_integrante_id = $statusProjectMember WHERE integrante.projeto_id = $projectId AND integrante.pessoa_id = $personId";
		if (pg_affected_rows(pg_query($sql)) == 0) {
			return false;
		}

		$sql2 = "DELETE FROM integrante_aprovacao_pendente WHERE integrante_aprovacao_pendente.id = $pendingProjectMemberId";
		return pg_affected_rows(pg_query($sql2)) > 0 ? true : false;
	}

}

?>