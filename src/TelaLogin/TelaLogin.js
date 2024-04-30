import React, { useState, useContext } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';

const TelaLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  //Função para quando clicar no botão login axios
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost/login.php', {
        email: email,
        password: password
      });
  
      if (response.data.success) {
        console.log(response.data.message);
        navigation.navigate('Home');
      } else {
        console.log(response.data.message);
      }
  
    } catch (error) {
      console.error('Erro de login:', error.response ? error.response.data.message : error.message);
    }
  }

  return (
    <View style={styles.container}>
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
      <Button title="Login" onPress={handleLogin} />
      <Text style={styles.link} onPress={() => navigation.navigate('TelaRegistrar')}>
        Criar conta
      </Text>
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
  link: {
    marginTop: 10,
    color: "blue",
  },
});

export default TelaLogin;
