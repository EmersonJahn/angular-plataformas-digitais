<?php

date_default_timezone_set('America/Sao_Paulo');

ini_set("log_errors", 1);
ini_set("error_log", "./php-error.log");

require('../lib/util.php');
require('../lib/connection.php');

utilDefinesHeaders();

$connection = new Connection();
$pendingAnswers = $connection->connGetPendingAnswers(); 

if (count($pendingAnswers) > 0) {
    $pendAnswers = [];

    foreach ($pendingAnswers as $pa) {
        $problem = utilFormatProblem($connection->connGetProblemById(intval($pa->problema_id)));
        $answer  = utilFormatAnswer($connection->connGetAnswerById(intval($pa->resposta_id))); 

        $pendAnswer = new stdClass();
        $pendAnswer->id      = intval($pa->id);
        $pendAnswer->problem = $problem;
        $pendAnswer->answer  = $answer;

        $pendAnswers[] = $pendAnswer;
    }

    $pendingAnswers = $pendAnswers;
    
}

utilEchoReponse('pending_answers', $pendingAnswers);

?>