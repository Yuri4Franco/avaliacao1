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

if(isset($data->email) && isset($data->password)){
    $email = $data->email;
    $password = $data->password;

    $stmt = $conn->prepare("SELECT password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();
    
    if ($stmt->num_rows > 0) {
        $stmt->bind_result($stored_password);
        $stmt->fetch();

        if ($stored_password == $password) {
            echo json_encode(["success" => true, "message" => "Logado com sucesso"]);
        } else {        
            echo json_encode(["success" => false, "message" => "Dados invalidos"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Email invalido"]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Erro"]);
}

$conn->close();
?>
