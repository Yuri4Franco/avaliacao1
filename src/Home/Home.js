import React, { useEffect, useState } from "react";
import { Pressable, Alert, SafeAreaView, ScrollView, Text , Button} from "react-native";
import ItemLista from "../ItemLista/ItemLista";
import axios from 'axios';

function Home({ navigation }) {
  const [times, setTimes] = useState([]);

  useEffect(() => {
    const fetchTimes = async () => {
      try {
        const response = await axios.get('http://172.16.11.68:3000/times');
        setTimes(response.data);
      } catch (error) {
        console.error('Erro ao buscar times:', error);
        console.log(error);
      }
    };

    fetchTimes();
  }, []);

  const deletarTime = async (id) =>{
    try {
      const response = await axios.delete(`http://172.16.11.68:3000/times/${id}`);
      if (response.status === 200) {
        setTimes(times.filter(time => time.id !== id));
        alert('Time deletado com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao deletar time:', error);
      alert('Erro ao deletar time');
    }
  }

  const confirmarDeletar = async (id) =>{
    try {
      Alert.alert(
      'Deletar time',
      'Você realmente quer deletar?', [{
        text: 'Sim',
        onPress: async () => deletarTime(id),
        style:'destructive'
      },
      {
          text: 'Não',
          onPress: async () => console.log('Cancelado'),
          style: 'cancel'
        }
      ]);
    } catch (error) { 
    }
  }
  
  const atualizarTime = (id) => {
    navigation.navigate('AtualizarTime', { timeId: id });
  };


  return (
    <SafeAreaView>
      <Text>Lista de times:</Text>
      <ScrollView>
        {times.map((time) => (
          <Pressable key={time.id} onPress={() => {
            navigation.navigate('TelaTime', {
              time: time.nome,
              img: `http://172.16.11.68:3000/imagens/${time.imagem}`,
            })
          }}>
            <ItemLista
              nome={time.nome}
              img={`http://172.16.11.68:3000/imagens/${time.imagem}`}
            />
            <Button title="Deletar" onPress={() => confirmarDeletar(time.id)} color="red"/>
            <Button title="Atualizar" onPress={() => atualizarTime(time.id)} color="blue"/>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;
