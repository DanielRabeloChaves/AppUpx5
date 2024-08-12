import React from 'react';
import { View, StyleSheet, Image, Text,  Linking } from 'react-native';
import { Button } from '@rneui/themed';
import { defaultStyles, font } from '../../theme';

export default ({data}) => {
  const handlePress = (url) => {Linking.openURL(url);};
  return (
    <View style={{marginVertical: 10}} >
      {data.map( (item, index)=>{
        return (
        <View style={styles.cards} key={index}>
            <View><Text style={styles.title}>{item.title}</Text></View>
            <Image style={styles.image} source={item.image} />
            <View><Text style={styles.text} >{item.text}</Text></View>
            <View style={styles.containerButton}>
                <Button title={"Saiba mais"} titleStyle={defaultStyles.fontButton} buttonStyle={defaultStyles.button} onPress={() => handlePress("https://github.com/DanielRabeloChaves/AppUpx5")}  />
            </View>
        </View>
        ) 
      })}
    </View>
  );
};

const styles = StyleSheet.create({
    cards: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        marginHorizontal: 5,
        alignItems: "center",
        justifyContent: "space-around",
        elevation: 5,
        padding: 15,
        marginTop: 30,
        marginHorizontal: 20,
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 5,
        marginVertical: 20
      },
    text: {
        fontFamily: font.fontFamily,
        fontSize: 12,
        marginBottom: 10,
    },
    title: {
        fontFamily: font.fontFamily,
        fontWeight: "bold",
        fontSize: 20,
    },
    containerButton:{
        marginVertical: 20,
        width: "100%",
        alignItems: "flex-end"
    }
  });
