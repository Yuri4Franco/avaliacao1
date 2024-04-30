<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

$host = "localhost";
$username = "root";
$password = "";
$dbname = "moveis";

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"));

if (isset($data->email) && isset($data->password) && isset($data->username)) {
    $email = $data->email;
    $password = $data->password;
    $username = $data->username;

    $stmt = $conn->prepare("INSERT INTO users (email, password, username) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $email, $password, $username);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo json_encode(["success" => true, "message" => "Cadastrado com sucesso"]);
    } else {
        echo json_encode(["success" => false, "message" => "Erro ao cadastrar"]);
    }
    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Dados inválidos"]);
}

$conn->close();
?>