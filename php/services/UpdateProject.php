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
$isUpdated  = $connection->connUpdateProject($project);

if ($isUpdated) {
    $status  = 1;
    $message = 'Projeto atualizado com sucesso!'; 
} else {
    $status  = 0;
    $message = 'Ocorreu um erro desconhecido ao tentar atualizar o projeto.'; 
}

utilEchoReponse(null, null, $status, $message);

?>