<?php

date_default_timezone_set('America/Sao_Paulo');

ini_set("log_errors", 1);
ini_set("error_log", "./php-error.log");

require('../lib/util.php');
require('../lib/connection.php');

utilDefinesHeaders();

$rest_json = file_get_contents("php://input");
$_POST     = json_decode($rest_json, true);

$pendingProjectMember = $_POST["pending_project_member"];
$approved             = boolval($_POST["approved"]);

$connection = new Connection();
$isSaved    = $connection->connApprovalProjectMember($pendingProjectMember, $approved);

if ($isSaved) {
    $status      = 1;
    $textMessage = $approved ? "aprovado" : "rejeitado";
    $message     = "Integrante $textMessage com sucesso!"; 
} else {
    $status      = 0;
    $textMessage = $approved ? "aprovar" : "rejeitar";
    $message     = "Ocorreu um erro desconhecido ao $textMessage o integrante"; 
}

utilEchoReponse(null, null, $status, $message);

?>