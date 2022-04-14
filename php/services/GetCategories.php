<?php

date_default_timezone_set('America/Sao_Paulo');

ini_set("log_errors", 1);
ini_set("error_log", "./php-error.log");

require('../lib/util.php');
require('../lib/connection.php');

utilDefinesHeaders();

$connection = new Connection();

$categs = $connection->connGetCategories();

$categories = [];
foreach ($categs as $c) {
    $category = new \stdClass();
    $category->id          = intval($c["id"]);
    $category->description = trim($c["descricao"]);
    $categories[] = $category;
}

utilEchoReponse("categories", $categories);

?>