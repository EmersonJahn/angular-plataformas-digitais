<?php

date_default_timezone_set('America/Sao_Paulo');

ini_set("log_errors", 1);
ini_set("error_log", "./php-error.log");

require(__DIR__ . '/config.php');

// require(realpath(dirname(__FILE__) . './config.php'));

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

	function connSelectToObjectList($sql, $table="") {
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
		$sql = "SELECT * FROM categoria";
		// $result = pg_fetch_assoc(pg_query($sql));
		return $this->connSelectToArrayList($sql);
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
		$personId        = $problem['person_id'];
		$categoryId      = $problem['category_id'];
		$title           = $problem['title'];
		$description     = $problem['description'];
		$problemStatusId = $problem['problem_status_id'];
		$numberAnswers   = $problem['number_answers'];

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
		$problemId      = $answer['problem_id'];
		$personId       = $answer['person_id'];
		$answer         = $answer['answer'];
		$answerStatusId = $answer['answer_status_id'];
		$rightAnswer    = $answer['right_answer'];

		$answerId = 0;
		$sql = "INSERT INTO resposta (problema_id, pessoa_id, resposta, status_resposta_id, resposta_correta) 
							VALUES ($problemId, $personId, '$answer', $answerStatusId, '$rightAnswer') RETURNING id";

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

}

?>