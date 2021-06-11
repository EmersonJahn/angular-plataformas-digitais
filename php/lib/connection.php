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

}

?>