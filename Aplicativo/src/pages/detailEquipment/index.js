import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, Linking  } from 'react-native';
import Constants from 'expo-constants';
import Header from '../../components/header';
import { Button } from '@rneui/themed';
import { defaultStyles, font } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import api from '../../config/api'
import baseUrl from '../../config/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Footer from '../../components/footer';
import CardsHistory from './cardsHistory';

export default (equipmentId) => {
  const [equipementInfo, setEquipementInfo] = useState();

  const [token, setToken] = useState('');

  const navigation = useNavigation();
    const handlePress = (path, data) => {
      navigation.navigate(path, data);

  };

  const apiGetEquipmentById = async () => {
    try {
      const response = await api.get(`/equipment?id=${equipmentId.route.params}`);
      const tempToken = await AsyncStorage.getItem('token');
      setToken(tempToken);
      setEquipementInfo(response.data)
    } catch (error) {
        showToastWithGravityAndOffset("Ocorreu um erro desconhecido.");
        console.log("error: ", error)
    }
}

  useEffect(() => {
    apiGetEquipmentById();
    console.log(equipementInfo)
  }, []);

  useFocusEffect(
        React.useCallback(() => {
            apiGetEquipmentById();
        }, [])
    );

  return (
    <ScrollView style={{marginTop: Constants.statusBarHeight,}}>
      <View style={styles.container}>
        <Header />
        <View style={styles.body}>
            <Image
                style={styles.image}
                source={{ uri: `${baseUrl}/file/equipment?equipment=${equipementInfo?.id}&token=${token}` }}
                resizeMode="cover"
            />
            <View style={styles.infoBox}>
              <View style={styles.titleBox}>
                <Text ellipsizeMode="tail" style={styles.title}>Nome do equipamento:</Text>
                <Text style={styles.text}>{equipementInfo?.name}</Text>
              </View>
              <View style={styles.textBox}>
                <Text ellipsizeMode="tail" style={styles.title}>Descrição:</Text>
                <Text ellipsizeMode="tail" style={styles.text}>{equipementInfo?.description}</Text>
              </View>
              <View style={styles.viewButtonNewHistory}>
                <Button title={"Adicionar novas Informações"} titleStyle={defaultStyles.fontButton} buttonStyle={defaultStyles.button}  onPress={() => handlePress("newHistoryEquipment", equipementInfo?.id)} />
              </View>
            </View>
            
        </View>
      </View>
      <View style={defaultStyles.styleLineView}><Text style={styles.titleTopicBox}>Historico</Text></View>
      < CardsHistory equipmentDataHistory={equipementInfo?.history}/>
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
  },
  image: {
    width: "100%",
    height: 200,
  },
  infoBox: {
    padding: 30,
    justifyContent: "center",
  },
  titleBox: {
    marginBottom: 20,
  },
  textBox: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  text: {
    fontFamily: font.fontFamily,
    fontSize: 14,
  },
  title: {
    fontFamily: font.fontFamily,
    fontWeight: "bold",
    fontSize: 20,
  },
  titleTopicBox:{
    fontFamily: font.fontFamily,
    fontWeight: "bold",
    fontSize: 25,
    color: "#ffffff"
  },
  viewButtonNewHistory:{
    marginTop: 20
  }
});