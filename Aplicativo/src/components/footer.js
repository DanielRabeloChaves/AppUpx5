import React from 'react'

import {View, StyleSheet, Text, Image} from 'react-native' 
import Logo from '../Img/logoWhite.png';

export default ({texto, cor='white', fontSize}) => (
    <View style={styles.footer}>
        <Image style={styles.logo} source={Logo}/>
        <Text style={styles.text} >©2024 Boston Scientific Corporation or its affiliates.</Text>
    </View>
)

const styles = StyleSheet.create({
    footer: {
      height: 70,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#007DB3",
      color: "white"
    },
    text: {
        fontFamily: 'Roboto',
        fontSize: 10,
        color: "white"
    },
    logo: {
        height: 30,
        width: 60,
    },
  })