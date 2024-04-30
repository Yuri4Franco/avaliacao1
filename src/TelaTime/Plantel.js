import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, Text } from "react-native";

function Plantel({time}) {
    const navigation = useNavigation();
    return (
        <>
            <Text>Tela do {time}</Text>
            <Button title="Voltar" onProgress={() => navigation.goBack()} ></Button>
        </>

    )
}

export default Plantel;