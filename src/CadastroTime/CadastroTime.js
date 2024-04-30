import React, { useEffect, useState } from 'react';
import { Button, Image, View, TextInput, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";


const CadastroTime = () => {

  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [imagem, setImagem] = useState(null);
  const [status, requestPermission] = ImagePicker.useCameraPermissions();


  useEffect(() => {
    if (status !== 'granted') {
      requestPermission();
    }
  }, []);

  useEffect(()=>{
    console.log(imagem);
   }, [imagem]
)


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://172.16.11.68:3000/times');
        console.log(response.data);
      } catch (error) {
        console.error(`Erro ao buscar dados: ${error}`);
      }
    }

    fetchData();
  }, []); 


  const selecionarImagem = async () => {
    Alert.alert('Escolha uma opção', '', [
      {
        text: 'Tirar foto',
        onPress: async () => {
          let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });

          
          if (!result.cancelled) {
            setImagem(result.assets[0].uri);
          }
         
        },
      },
      {
        text: 'Escolher da biblioteca',
        onPress: async () => {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });


          if (!result.cancelled) {
            setImagem(result.assets[0].uri);
          }
        },
      },
    ]);
  };

  const salvar = async () => {
    try {
      let data = new FormData();
      data.append('nome', nome);
      data.append('imagem', {
        uri: imagem, 
        type: 'image/jpeg',
        name: 'imagem.jpg',
      });

      let response = await axios.post('http://172.16.11.68:3000/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

     console.warn(response.data);

    } catch (error) {
      console.error(error);
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    }
  };

  return (
    <View>
      {imagem && (
        <Image
          source={{ uri: imagem }}
          style={{ width: 200, height: 200 }}
        />
      )}
      <TextInput
        value={nome}
        placeholder="Nome do Time"
        onChangeText={setNome}
      />
      <Button title="Carregar Imagem" onPress={selecionarImagem} />

      <Button
        title="Cadastrar Time"
        // onPress={() => console.log('Time cadastrado:', nome)}
        onPress={salvar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  }
});

export default CadastroTime;