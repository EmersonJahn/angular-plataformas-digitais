<?php

date_default_timezone_set('America/Sao_Paulo');

ini_set("log_errors", 1);
ini_set("error_log", "./php-error.log");

require('../lib/util.php');
require('../lib/connection.php');

utilDefinesHeaders();

$rest_json = file_get_contents("php://input");
$_POST     = json_decode($rest_json, true);

$projectId = $_POST["project_id"];

$connection = new Connection();
$pendingMembersCount  = $connection->connGetPendingMembersCount($projectId);

utilEchoReponse("pending_members_count", $pendingMembersCount);

?>