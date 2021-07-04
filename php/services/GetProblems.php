<?php

date_default_timezone_set('America/Sao_Paulo');

ini_set("log_errors", 1);
ini_set("error_log", "./php-error.log");

require('../lib/util.php');
require('../lib/connection.php');

utilDefinesHeaders();

$rest_json = file_get_contents("php://input");
$_POST     = json_decode($rest_json, true);

$searchBy   = strtoupper(trim($_POST["search_by"]));
$categoryId = intval($_POST["category_id"]);

$connection = new Connection();
$problems   = $connection->connGetProblems($searchBy, $categoryId); 

if (count($problems) > 0) {
    $problems2 = [];

    foreach ($problems as $problem) {
        $problems2[] = utilFormatProblem($problem);
    }

    $problems = $problems2;
}

utilEchoReponse('problems', $problems);

?>