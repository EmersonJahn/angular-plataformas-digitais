<?php

date_default_timezone_set('America/Sao_Paulo');

ini_set("log_errors", 1);
ini_set("error_log", "./php-error.log");

require('../lib/util.php');
require('../lib/connection.php');

utilDefinesHeaders();

$rest_json = file_get_contents("php://input");
$_POST     = json_decode($rest_json, true);

// $projectId = 1;
$projectId = intval($_POST["project_id"]);

$connection = new Connection();
$pendingProjectMembers = $connection->connGetPendingProjectMembers($projectId); 

if (count($pendingProjectMembers) > 0) {
    $pendProjMems = [];

    foreach ($pendingProjectMembers as $ppm) {
        $pendProjMem = new stdClass();
        $pendProjMem->id         = $ppm->id;
        $pendProjMem->project_id = intval($ppm->projeto_id);
        $pendProjMem->person     = utilFormatJoinPerson($ppm);

        $pendProjMems[] = $pendProjMem;
    }

    $pendingProjectMembers = $pendProjMems;
    
}

utilEchoReponse('pending_project_members', $pendingProjectMembers);

?>