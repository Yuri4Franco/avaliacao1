import { useNavigation } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";


function Competicoes({time}) {
    const navigation = useNavigation();

    const competicoes = [
        {
            nome: 'Copa do Brasil',
            tipo: 'Torneio',
            fase: 'Quartas-de-final',
            inicio: '25/03/24',
            fim: '25/05/24'

        },

        {
            nome: 'Gauchão',
            tipo: 'Torneio',
            fase: 'Semi-final',
            inicio: '25/03/24',
            fim: '25/05/24'

        }
    ]
    return (
        <SafeAreaView>
            <Text>Tela de competições do {time}</Text>

            <ScrollView>
                {competicoes.map((comp, index) => (
                    <View key={index}>
                        <Text>{comp.nome}</Text>
                        <Text>{comp.tipo}</Text>
                        <Text>{comp.fase}</Text>
                        <Text>{comp.inicio}</Text>
                        <Text>{comp.fim}</Text>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Competicoes;