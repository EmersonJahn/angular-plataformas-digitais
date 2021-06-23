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
$project    = $connection->connGetProjectById($projectId); 

if ($project->id > 0) {  
    $project = utilFormatProject($project);
}

utilEchoReponse('project', $project);

?>