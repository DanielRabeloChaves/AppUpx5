import "core-js/stable/atob";
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import Logo from '../Img/logoWhite.png';
import { Button } from '@rneui/themed';
import { defaultStyles, defaultColor, font } from '../theme';
import { useNavigation } from '@react-navigation/native'; 
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";

export default ({type}) => {
  const [dataUser, setDataUser] = useState(null);
  
  const token = async () =>{
    const token = await AsyncStorage.getItem('token');
    const decoded = jwtDecode(token);
    setDataUser(decoded);
    return;
  } 

  const navigation = useNavigation();
  const handlePress = (path) => {
    navigation.navigate(path);
  };
  const handleGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if(!type)
      token();
  }, []);

  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        {type == "login" 
        ? <AntDesign name="back" size={24} color="white" onPress={handleGoBack} />
        : type == "startPage" 
        ? <Image style={styles.logo} source={Logo} />
        : <TouchableOpacity onPress={() => handlePress("home")} ><Image style={styles.logo} source={Logo} /></TouchableOpacity>
        }
      </View>
        {type == "startPage" 
        ?   <View  style={styles.rightContainer}>
                <Button title="Logar" titleStyle={defaultStyles.fontButton} buttonStyle={defaultStyles.button} containerStyle={{height: 35, width: 85}} onPress={() => handlePress("login")} />
                <Button title="Cadastrar" titleStyle={defaultStyles.fontButton} buttonStyle={defaultStyles.button} containerStyle={{height: 35, width: 85}} onPress={() => handlePress("signUp")} /> 
            </View>
        : type == "login" 
        ? <></> 
        : 
        <TouchableOpacity onPress={() => handlePress("profileUser")}>
          <View style={styles.profileUser}>
            <Text style={styles.textBox}>{dataUser?.name.substring(0, 2).toUpperCase()}</Text>
          </View>
        </TouchableOpacity>
        }
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 70,
    width: '100%',
    alignItems: 'center',
    backgroundColor: defaultColor.primaryColor,
    flexDirection: "row",
    paddingHorizontal: 10},
  logo: {
    height: 30,
    width: 74,
  },
  leftContainer: {
    flex: 1,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileUser: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: defaultColor.profile,
    justifyContent: "center",
    alignItems: "center"
  },
  textBox:{
    fontFamily: font.fontFamily,
    fontWeight: "bold",
    fontSize: 14,
    color: "#ffffff"
  },
});
