<?php

date_default_timezone_set('America/Sao_Paulo');

ini_set("log_errors", 1);
ini_set("error_log", "./php-error.log");

require('../lib/util.php');
require('../lib/connection.php');
require('../token.php'); // TODO criar

// utilDefinesHeaders();

// foreach (getallheaders() as $name => $value) {
//     if ($name == 'token') {
//         $token = $value;
//     }
// }    

// if (!utilValidToken($token)) {
//     exit;
// }

$connection = new Connection();

$categs = $connection->connGetCategories();

$categories = [];
foreach ($categs as $c) {
    $category = new \stdClass();
    $category->id          = intval($c["id"]);
    $category->description = ucwords(strtolower(trim($c["id"])));
    $categories[] = $category;
}

utilEchoReponse("categories", $categories);

?>