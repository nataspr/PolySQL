<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once './config.php';

$data = json_decode(file_get_contents("php://input"));

try {
    $query = "INSERT INTO users (login, password, fio) VALUES (:login, :password, :fio)";
    $stmt = $pdo->prepare($query);

    $stmt->bindParam(':login', $data->login);
    $stmt->bindParam(':password', $data->password);
    $stmt->bindParam(':fio', $data->fio);

    if ($stmt->execute()) {
        echo json_encode(array("message" => "User registered successfully."));
    } else {
        echo json_encode(array("message" => "Unable to register user."));
    }
} catch (PDOException $e) {
    echo json_encode(array("message" => "Error: " . $e->getMessage()));
}
?>