import "core-js/stable/atob";
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, Linking  } from 'react-native';
import Constants from 'expo-constants';
import Header from '../../components/header';
import { Button } from '@rneui/themed';
import { defaultStyles, font, defaultColor } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import api from '../../config/api'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";
import moment from 'moment';

import Footer from '../../components/footer';

export default () => {
  const navigation = useNavigation();
    const handlePress = (path, data) => {
      navigation.navigate(path, data);
  };

  const [dataUser, setDataUser] = useState(null);
  const token = async () =>{
    const token = await AsyncStorage.getItem('token');
    const decoded = jwtDecode(token);
    setDataUser(decoded);
    return;
  }

const exitProfile = async () => {
    try{
        await AsyncStorage.removeItem('token');
        navigation.navigate("start");
    } catch (error) {
        console.error('Erro ao remover o token:', error);
    }
}

  useEffect(() => {
    token();
  }, []);

  return (
    <ScrollView style={{marginTop: Constants.statusBarHeight,}}>
      <View style={styles.container}>
        <Header />
        <View style={styles.bannerUser}>
                <View style={styles.profileUser}>
                    <Text style={styles.textBoxProfile}>{dataUser?.name.substring(0, 2).toUpperCase()}</Text>
                </View>
            </View>
        <View style={styles.body}>
            <View style={styles.profileData}>
                <Text style={styles.textBoxProfile}>{dataUser?.name}</Text>
            </View>
            <View style={styles.aboutUser}>
                <View style={styles.aboutUserItens}>
                    <Text style={styles.textBoxAboutUserTitle}>Login:</Text>
                    <Text style={styles.textBoxAboutUser}>{dataUser?.login}</Text>
                </View>
                <View style={styles.aboutUserItens}>
                    <Text style={styles.textBoxAboutUserTitle}>Email:</Text>
                    <Text style={styles.textBoxAboutUser}>{dataUser?.email}</Text>
                </View>
                <View style={styles.aboutUserItens}>
                    <Text style={styles.textBoxAboutUserTitle}>Telefone:</Text>
                    <Text style={styles.textBoxAboutUser}>{dataUser?.phone}</Text>
                </View>
                <View style={styles.aboutUserItens}>
                    <Text style={styles.textBoxAboutUserTitle}>Data de criação:</Text>
                    <Text style={styles.textBoxAboutUser}>{moment(dataUser?.create_date).format('DD/MM/YYYY')}</Text>
                </View>
                <View style={styles.aboutUserItens}>
                    <Text style={styles.textBoxAboutUserTitle}>Ultimo acesso:</Text>
                    <Text style={styles.textBoxAboutUser}>{moment(dataUser?.last_access_date).format('DD/MM/YYYY')}</Text>
                </View>
            </View>
            
            <View style={styles.boxButtons}>
                <Button title={"Finalizar sessão"} 
                    titleStyle={defaultStyles.fontButton} 
                    buttonStyle={[defaultStyles.button, {width: 180, marginVertical: 20}]} 
                    onPress={() => exitProfile()} 
                />
            </View>
        </View>
      </View>
      < Footer/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  body: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  profileUser: {
    height: 150,
    width: 150,
    borderRadius: 100,
    backgroundColor: defaultColor.profile,
    justifyContent: "center",
    alignItems: "center"
  },
  textBoxProfile:{
    fontFamily: font.fontFamily,
    fontWeight: "bold",
    fontSize: 30,
  },
  profileData: {
    width: "100%",
    marginVertical: 20,
  },
  textBoxAboutUser: {
    fontFamily: font.fontFamily,
    fontSize: 16,
  },
  textBoxAboutUserTitle:{
    fontFamily: font.fontFamily,
    fontSize: 16,
    fontWeight: "bold",
  },
  aboutUser:{
    width: "100%",
  },
  aboutUserItens: {
    marginVertical: 10,
  },
  titleTopicBox:{
    fontFamily: font.fontFamily,
    fontWeight: "bold",
    fontSize: 25,
    color: "#ffffff"
  },
  bannerUser:{
      height: 250,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#406",
  }
});