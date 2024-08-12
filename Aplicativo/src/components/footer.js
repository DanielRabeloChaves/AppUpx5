import React from 'react'
import {View, StyleSheet, Text, Image, Linking, TouchableOpacity } from 'react-native' 
import Logo from '../Img/logoWhite.png';
import { defaultStyles, defaultColor } from '../theme';
import { AntDesign, Entypo, FontAwesome6 } from '@expo/vector-icons';

export default () => {
    const handlePress = (url) => {Linking.openURL(url);};
    return (
        <View>
            <View style={defaultStyles.styleLineView}>
                <View style={styles.SocialIcons}>
                <TouchableOpacity onPress={() => handlePress("https://www.facebook.com/Daniel.Rabelo.chaves")}>
                    <Entypo name="facebook-with-circle" size={30} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePress("https://www.instagram.com/daniell.rabelo/")}>
                    <AntDesign name="instagram" size={30} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePress("https://github.com/DanielRabeloChaves")}>
                    <AntDesign name="github" size={30} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePress("https://www.linkedin.com/in/danielrabelochaves/")}>
                    <Entypo name="linkedin-with-circle" size={30} color="white" />
                </TouchableOpacity>
                </View>
            </View>
            <View style={styles.footer}>
                <Image style={styles.logo} source={Logo}/>
                <Text style={styles.text} >©2024 Lorem Ipsum Corporation or its affiliates (Daniel RC).</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
      height: 70,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: defaultColor.primaryColor,
      color: "white",
    },
    text: {
        fontFamily: 'Roboto',
        fontSize: 10,
        color: "white"
    },
    logo: {
        height: 50,
        width: 50,
    },
    SocialIcons:{
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-evenly"
  }
})