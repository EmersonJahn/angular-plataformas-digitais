<?php

date_default_timezone_set('America/Sao_Paulo');

ini_set("log_errors", 1);
ini_set("error_log", "./php-error.log");

require('../lib/util.php');
require('../lib/connection.php');

utilDefinesHeaders();

$rest_json = file_get_contents("php://input");
$_POST     = json_decode($rest_json, true);

$answer = $_POST["answer"];

$connection = new Connection();
$answerId   = $connection->connCreateAnswer($answer);

$status = 0;

if ($answerId > 0) {
    $isCreated = $connection->connCreatePendingAnswer($answer['problem_id'], $answerId);
    if ($isCreated) {
        $status  = 1;
        $message = "Resposta criada com sucesso!"; 
    } else {
        $message = "Ocorreu um erro desconhecido ao tentar gravar a resposta.";
    }

} else {
    $message = "Ocorreu um erro desconhecido ao tentar gravar a resposta.";
}

?>