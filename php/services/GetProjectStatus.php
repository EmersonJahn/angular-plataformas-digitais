<?php

date_default_timezone_set('America/Sao_Paulo');

ini_set("log_errors", 1);
ini_set("error_log", "./php-error.log");

require('../lib/util.php');
require('../lib/connection.php');

utilDefinesHeaders();

$connection = new Connection();

$status = $connection->connGetProjectStatus();

$projectStatus = [];
foreach ($status as $s) {
    $ps = new \stdClass();
    $ps->id          = intval($s["id"]);
    $ps->description = trim($s["descricao"]);
    $projectStatus[] = $ps;
}

utilEchoReponse("project_status", $projectStatus);

?>
