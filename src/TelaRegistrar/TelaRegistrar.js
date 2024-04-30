import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { Alert } from "react-native";
import axios from 'axios';

const TelaRegistrar = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');


    const handleRegister= async () => {
      try {
        const response = await axios.post('http://localhost/servidor.php',
      {
        email: email,
        username: username,
        password: password
      }
      ) 
      } catch (error) {
        console.log(error);
        Alert.alert('Erro', 'Ocorreu um erro ao fazer login');
      }
    };

    return (
        <View style={styles.container}>
           <TextInput
                placeholder="Nome"
                onChangeText={setUsername}
                value={username}
                style={styles.input}
            />
            <TextInput
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
                style={styles.input}
            />
            <TextInput
                placeholder="Senha"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
                style={styles.input}
            />
            <Button title="Registrar" onPress={handleRegister} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        width: "80%",
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
    },
});

export default TelaRegistrar;
