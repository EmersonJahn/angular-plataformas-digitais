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
        $answer = new stdClass();
        $answer->id               = intval($a->id);
        $answer->problem_id       = intval($a->problema_id);
        $answer->person_id        = intval($a->pessoa_id);
        $answer->answer           = trim($a->resposta);
        $answer->answer_status_id = intval($a->status_resposta_id);
        $answer->right_answer     = $a->resposta_correta == "t" ? true : false;

        $answers2[] = $answer;
    }

    $answers = $answers2;

}

utilEchoReponse('answers', $answers);

?>