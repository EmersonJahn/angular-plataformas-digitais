<?php

date_default_timezone_set('America/Sao_Paulo');

ini_set("log_errors", 1);
ini_set("error_log", "./php-error.log");

require('../lib/util.php');
require('../lib/connection.php');

utilDefinesHeaders();

$rest_json = file_get_contents("php://input");
$_POST     = json_decode($rest_json, true);

$project = $_POST["project"];

$connection = new Connection();
$isCreated  = $connection->connCreateProject($project);

if ($isCreated) {
    $status  = 1;
    $message = 'Projeto cadastrado com sucesso!'; 
} else {
    $status  = 0;
    $message = 'Ocorreu um erro desconhecido ao tentar cadastrar o projeto.'; 
}

utilEchoReponse(null, null, $status, $message);

?>