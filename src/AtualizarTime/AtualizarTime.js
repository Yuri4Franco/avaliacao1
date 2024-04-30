import React, { useEffect, useState } from 'react';
import { Button, Image, View, TextInput, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useNavigation, useRoute } from "@react-navigation/native";

const AtualizarTime = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [nome, setNome] = useState('');
  const [imagem, setImagem] = useState(null);
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [timeId, setTimeId] = useState(route.params?.timeId);

  useEffect(() => {
    if (status !== 'granted') {
      requestPermission();
    }
  }, []);

  useEffect(() => {
    if (timeId) {
      async function fetchTimeData() {
        try {
          const response = await axios.get(`http://172.16.11.68:3000:3000/times`);
          setNome(response.data.nome);
          setImagem(response.data.imagem);
        } catch (error) {
          console.error(`Erro ao buscar dados do time: ${error}`);
        }
      }
      fetchTimeData();
    }
  }, [timeId]);

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

      await axios.put(`http://172.16.11.68:3000/times/${timeId}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert('Sucesso', 'Time atualizado com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao atualizar o time:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o time.');
    }
  };

  return (
    <View style={styles.container}>
      {imagem && (
        <Image
          source={{ uri: imagem }}
          style={{ width: 200, height: 200 }}
        />
      )}
      <TextInput
        value={nome}
        onChangeText={setNome}
        placeholder="Nome do Time"
      />
      <Button title="Carregar Imagem" onPress={selecionarImagem} />
      <Button title="Atualizar Time" onPress={salvar} />
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

export default AtualizarTime;
