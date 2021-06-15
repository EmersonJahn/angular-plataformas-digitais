<?php

date_default_timezone_set('America/Sao_Paulo');

ini_set("log_errors", 1);
ini_set("error_log", "./php-error.log");

require('../lib/util.php');
require('../lib/connection.php');

utilDefinesHeaders();

$rest_json = file_get_contents("php://input");
$_POST     = json_decode($rest_json, true);

// $problemId = 1;
$problemId = intval($_POST["problem_id"]);

$connection = new Connection();
$problem    = $connection->connGetProblemById($problemId); 

if ($problem->id > 0) {  
    $p = $problem;

    $problem = new stdClass();
    $problem->id                   = intval($p->id);
    $problem->person_id            = intval($p->pessoa_id);
    $problem->category_id          = intval($p->categoria_id);
    $problem->title                = trim($p->titulo);
    $problem->description          = trim($p->descricao);
    $problem->status_problem_id    = intval($p->status_problema_id);
    $problem->number_answers       = intval($p->numero_respostas);
    // $problem->person_name          = trim($p->pessoa_nome);
    // $problem->person_profile_photo = trim($p->pessoa_foto_perfil);

}

utilEchoReponse('problem', $problem);

?>