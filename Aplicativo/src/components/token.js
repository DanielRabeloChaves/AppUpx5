import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid, Keyboard  } from 'react-native';
import { defaultStyles, font, defaultColor } from '../theme';
import { Button } from '@rneui/themed';
import api from '../config/api'
import { useNavigation } from '@react-navigation/native'; 

export default ({data, type}) => {
  const navigation = useNavigation();
  const handlePress = (path) => {
    navigation.navigate(path);
  };

  const [inputValues, setInputValues] = useState(['', '', '', '', '']);

  const char1Ref = useRef(null);
  const char2Ref = useRef(null);
  const char3Ref = useRef(null);
  const char4Ref = useRef(null);
  const char5Ref = useRef(null);

  const handleKeyUp = (text, ref, index) => {
    const maxLength = 1;
    if (text.length >= maxLength) {
      ref.current.focus();
    }
    const newInputValues = [...inputValues];
    newInputValues[index] = text;
    setInputValues(newInputValues);
  };

  const showToastWithGravityAndOffset = (text) => { ToastAndroid.showWithGravityAndOffset( text, ToastAndroid.LONG, ToastAndroid.TOP, 25, 50);};
  const apiAuthentication = async (dataUser) => {
      try {
        console.log("Entrou aqui forget login")
        const response = await api.post("/user/login", dataUser);
        const data = response.data;
        Keyboard.dismiss();
        showToastWithGravityAndOffset(data.menssage || data.error);
        if(data.status && data.status == "Sucesso"){
          handlePress("home")
        }
      } catch (error) {
          showToastWithGravityAndOffset("Ocorreu um erro desconhecido.");
          console.log(error)
      }
  }

  const apiForgetPassword = async (dataUser) => {
    try {
      console.log("Entrou aqui forget password")
      const response = await api.post("/user/forgetpassword", dataUser);
      const data = response.data;
      console.log(data)
      if(data.menssage && data.status === "Preencher Campos"){
        console.log("Preencher Campos")
      }
      if(data.menssage && data.status === "Sucesso"){
        console.log("Sucesso")
      }
      showToastWithGravityAndOffset(data.menssage || data.error);
    } catch (error) {
        showToastWithGravityAndOffset("Ocorreu um erro desconhecido.");
        console.log(error)
    }
  }

  const concatenateChars = () => {
    const tokenLogin = inputValues.join('');
    const user = {
      login: data.login,
      password: data.password,
      loginToken: tokenLogin
    };

    const userForgetPassword = {
      login: data.login,
      loginToken: tokenLogin,
      password: '',
      confirm_passowrd: ''
    };
    console.log("type: ", type)
    type == "Login" ? apiAuthentication(user) : apiForgetPassword(userForgetPassword)
    console.log(user);
  };

  return (
    <View style={styles.mainTokenBox}>
      <View style={styles.InsertToken}>
        <View style={styles.headerTokenLogin}>
          <Text style={styles.titleSpanToken}>Autenticação</Text>
        </View>
        <View style={styles.TextInsertToken}>
          <Text style={styles.textSpanToken}>Um token de acesso foi enviado para o endereço de e-mail. Por favor, verifique sua caixa de entrada.</Text>
          <Text style={styles.textSpanToken}>Este token expirará após 15 minutos.</Text>
        </View>
        <View style={styles.InputsToken}>
          <TextInput
            ref={char1Ref}
            style={styles.inputToken}
            maxLength={1}
            onChangeText={(text) => handleKeyUp(text, char2Ref, 0)}
          />
          <TextInput
            ref={char2Ref}
            style={styles.inputToken}
            maxLength={1}
            onChangeText={(text) => handleKeyUp(text, char3Ref, 1)}
          />
          <TextInput
            ref={char3Ref}
            style={styles.inputToken}
            maxLength={1}
            onChangeText={(text) => handleKeyUp(text, char4Ref, 2)}
          />
          <TextInput
            ref={char4Ref}
            style={styles.inputToken}
            maxLength={1}
            onChangeText={(text) => handleKeyUp(text, char5Ref, 3)}
          />
          <TextInput
            ref={char5Ref}
            style={styles.inputToken}
            maxLength={1}
            onChangeText={(text) => handleKeyUp(text, char5Ref, 4)}
          />
        </View>
        <Button title="Send" titleStyle={defaultStyles.fontButton} buttonStyle={defaultStyles.button} containerStyle={{height: 40, width: 185}} onPress={concatenateChars} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainTokenBox: {
    height: 400,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: defaultColor.white,
    borderRadius: 10,
    elevation: 5,
    zIndex: 10
  },
  InsertToken: {
    height: "100%",
    padding: 20,
    justifyContent: "space-around",
    alignItems: 'center',
  },
  headerTokenLogin: {
    marginBottom: 8,
  },
  TextInsertToken: {
    marginBottom: 8,
  },
  InputsToken: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  inputToken: {
    fontSize: 24,
    textAlign: 'center',
    height: 48,
    marginHorizontal: 4,
    width: 48,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#999',
    color: defaultColor.primaryColor
  },
  sendToken: {
    backgroundColor: '#007bff',
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
  },
  sendTokenText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  textSpanToken:{
    textAlign: "center",
    fontFamily: font.fontFamily,
    fontSize: 12,
    marginBottom: 10
  },
  titleSpanToken:{
    textAlign: "center",
    fontFamily: font.fontFamily,
    fontWeight: "bold",
    fontSize: 24,
    color: defaultColor.primaryColor
  }
});
