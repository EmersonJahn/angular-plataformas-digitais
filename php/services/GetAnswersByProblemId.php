<?php

date_default_timezone_set('America/Sao_Paulo');

ini_set("log_errors", 1);
ini_set("error_log", "./php-error.log");

require('../lib/util.php');
require('../lib/connection.php');

utilDefinesHeaders();

$rest_json = file_get_contents("php://input");
$_POST     = json_decode($rest_json, true);

$problemId = intval($_POST["problem_id"]);

$connection = new Connection();
$answers    = $connection->connGetAnswersByProblemId($problemId); 

if (count($answers) > 0) {
    $answers2 = [];

    foreach ($answers as $a) {
        $answer = utilFormatAnswer($a);
        $answers2[] = $answer;
    }

    $answers = $answers2;
}

utilEchoReponse('answers', $answers);

?>