<?php

date_default_timezone_set('America/Sao_Paulo');

ini_set("log_errors", 1);
ini_set("error_log", "./php-error.log");

require('../lib/util.php');
require('../lib/connection.php');

utilDefinesHeaders();

$rest_json = file_get_contents("php://input");
$_POST     = json_decode($rest_json, true);

$projectMembers = $_POST["project_members"];

$connection = new Connection();
$isRemoved  = $connection->connRemoveProjectMembers($projectMembers);

if ($isRemoved) {
    $status  = 1;
    $message = 'Integrante(s) removido(s) com sucesso!'; 
} else {
    $status  = 0;
    $message = 'Ocorreu um erro desconhecido ao remover o(s) integrante(s) do projeto.';
}

utilEchoReponse(null, null, $status, $message);

?>