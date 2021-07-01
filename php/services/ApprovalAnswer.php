<?php

date_default_timezone_set('America/Sao_Paulo');

ini_set("log_errors", 1);
ini_set("error_log", "./php-error.log");

require('../lib/util.php');
require('../lib/connection.php');

utilDefinesHeaders();

$rest_json = file_get_contents("php://input");
$_POST     = json_decode($rest_json, true);

$pendingAnswer = $_POST["pending_answer"];
$approved      = boolval($_POST["approved"]);

$connection = new Connection();
$isSaved    = $connection->connApprovalAnswer($pendingAnswer, $approved);

if ($isSaved) {
    $status      = 1;
    $textMessage = $approved ? "aprovada" : "rejeitada";
    $message     = "Resposta $textMessage com sucesso!"; 
} else {
    $status      = 0;
    $textMessage = $approved ? "aprovar" : "rejeitar";
    $message     = "Ocorreu um erro desconhecido ao $textMessage a resposta."; 
}

utilEchoReponse(null, null, $status, $message);

?>