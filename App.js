import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import TelaRegistrar from './src/TelaRegistrar/TelaRegistrar';
import TelaLogin from './src/TelaLogin/TelaLogin';
import Home from './src/Home/Home';
import CadastroTime from './src/CadastroTime/CadastroTime';
import ItemLista from './src/ItemLista/ItemLista';
import HomeTime from './src/TelaTime/Home';
import Plantel from './src/TelaTime/Plantel';
import TelaTime from './src/TelaTime/TelaTime';
import AtualizarTime from './src/AtualizarTime/AtualizarTime';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }} initialRouteName='Home'>
        <Stack.Screen name="TelaRegistrar" component={TelaRegistrar} />
        <Stack.Screen name="TelaLogin" component={TelaLogin} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CadastroTime" component={CadastroTime} />
        <Stack.Screen name="ItemLista" component={ItemLista} />
        <Stack.Screen name="HomeTime" component={HomeTime} />
        <Stack.Screen name="Plantel" component={Plantel} />
        <Stack.Screen name="TelaTime" component={TelaTime} />
        <Stack.Screen name="AtualizarTime" component={AtualizarTime} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});