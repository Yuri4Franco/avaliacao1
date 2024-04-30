import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";

//Cards que mostrarão os times
//Importante definir props, que recebe as variaveis
function ItemLista(props) {
    return (
        //Corpo do card View>IMAGEM>VIEW>TEXTOS
        <>
            <View style={styles.card}>
                <Image
                    style={styles.img}
                    source={{ uri: props.img }}
                />

                <View>
                    <Text style={styles.nome}>Nome do time: {props.nome} </Text>
                </View>
            </View>
        </>

    )
}

//Estilização do card
const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        pading: 10,
        alignItens: 'center',
        marginBottom: 10

    },

    img: {
        width: 100,
        height: 100

    },

    nome: {
        fontSize: 20,
        fontWeight: 'bold'

    },

    descricao: {
        fontSize: 16,
        fontFamily: 'serif',
    }
})

export default ItemLista;