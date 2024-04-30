import React from "react";
import { Image, Text } from "react-native";


function HomeTime({time, img, descricao}){
    return(
        <>
        <Text>{time}</Text>
        <Image style ={{width:200, height:200}} source={{uri: img}}></Image>
        </>
    )
}

export default HomeTime;