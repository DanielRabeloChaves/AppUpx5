import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid, Keyboard, Dimensions, Modal  } from 'react-native';
import { defaultStyles, font, defaultColor } from '../theme';
import { Button } from '@rneui/themed';
import api from '../config/api'
import { useNavigation } from '@react-navigation/native'; 
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const inputWidthScale = 0.8;
const inputWidth = windowWidth * inputWidthScale;

export default ({data, type}) => {
  const navigation = useNavigation();
  const handlePress = (path) => {
    navigation.navigate(path);
  };
  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => {setModalVisible(false);};

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userForgetPassword, setUserForgetPassword] = useState({});
  const [inputValues, setInputValues] = useState(['', '', '', '', '']);
  const [visibleModalToken, setVisibleModalToken] = useState(true);

  const char1Ref = useRef(null);
  const char2Ref = useRef(null);
  const char3Ref = useRef(null);
  const char4Ref = useRef(null);
  const char5Ref = useRef(null);

  const resetFields = () => {
    setPassword('');
    setConfirmPassword('');
    setInputValues(['', '', '', '', '']);
    char1Ref.current.clear();
    char2Ref.current.clear();
    char3Ref.current.clear();
    char4Ref.current.clear();
    char5Ref.current.clear();
  };

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
        const response = await api.post("/user/login", dataUser);
        const data = response.data;
        Keyboard.dismiss();
        showToastWithGravityAndOffset(data.menssage || data.error);
        if(data.status == "Sucesso"){
          await AsyncStorage.setItem('token', data.token);
          const userToken = await AsyncStorage.getItem('token');
          setVisibleModalToken(false);
          handlePress("home")
        }
      } catch (error) {
          showToastWithGravityAndOffset("Ocorreu um erro desconhecido.");
          console.log(error)
      }finally{
        resetFields();
      }
  }

  const apiForgetPassword = async (dataUser) => {
    try {
      if(dataUser || userForgetPassword){
        if(password && confirmPassword){
          dataUser.password = password
          dataUser.confirm_passowrd = confirmPassword
        }
        const response = await api.post("/user/forgetpassword", dataUser);
        const data = response.data;
        if(data.status === "Preencher Campos"){
          setModalVisible(true)
        }
        if(data.status === "Sucesso"){
          setModalVisible(false)
          
        }
        showToastWithGravityAndOffset(data.menssage || data.error);
      }
    } catch (error) {
        showToastWithGravityAndOffset("Ocorreu um erro desconhecido.");
        console.log(error)
    }finally{
      resetFields();
    }
  }

  const concatenateChars = async () => {
    const tokenLogin = await inputValues.join('');
    const user = await {
      login: data.login,
      password: data.password,
      loginToken: tokenLogin
    };

    const dataResquestUser = await {
      login: data.login,
      loginToken: tokenLogin,
      password: '',
      confirm_passowrd: ''
    }
    await setUserForgetPassword(dataResquestUser)
    await type == "Login" ? apiAuthentication(user) : apiForgetPassword(dataResquestUser)
  };

  return (
    <>
      {visibleModalToken 
      ? <View style={styles.mainTokenBox}>
          <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={closeModal}
          >
              <View style={styles.modalStyle}>
                <View style={styles.headerTokenLogin}>
                  <Text style={styles.titleSpanToken}>Recuperação de Senha</Text>
                </View>
                <View style={styles.TextInsertToken}>
                  <Text style={styles.textSpanToken}>Favor preencher sua nova senha.</Text>
                </View>
                <View style={styles.input}>
                    <MaterialIcons name="lock-outline" size={20} color="#989898" style={{ marginRight: 10 }} />
                    <TextInput style={styles.inputBox} value={password} onChangeText={setPassword} placeholder={'Senha'} placeholderTextColor="#989898" autoCapitalize="none" secureTextEntry={true} />
                </View>
                <View style={styles.input}>
                    <MaterialIcons name="lock-outline" size={20} color="#989898" style={{ marginRight: 10 }} />
                    <TextInput style={styles.inputBox} value={confirmPassword} onChangeText={setConfirmPassword} placeholder={'Confirmar Senha'} autoCapitalize="none" secureTextEntry={true} />
                </View>
                <View style={styles.boxButtons}>
                    <View style={styles.buttonContainer}>
                        <Button title="Atualziar" titleStyle={defaultStyles.fontButton} buttonStyle={defaultStyles.button} containerStyle={{ height: 40, width: 230 }}  onPress={() => apiForgetPassword(userForgetPassword)} />
                    </View>
                </View>
              </View>
              
              <TouchableOpacity style={styles.CloseModal} onPress={closeModal}></TouchableOpacity>
          </Modal>
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
            <Button title="Enviar" titleStyle={defaultStyles.fontButton} buttonStyle={defaultStyles.button} containerStyle={{height: 40, width: 185}}  onPress={concatenateChars} />
          </View>
        </View> 
      : ''}
    </>
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
  },
  input: {
    backgroundColor: '#FFFFFF',
    flexDirection: "row",
    alignItems: "center",
    height: 47,
    width: inputWidth,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 30,
    borderColor: '#999',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
  },
  CloseModal: {
    height: "100%",
    width: "100%",
    position: "absolute",
    backgroundColor: 'rgba(0, 0, 0, 0.5)' 
  },
  modalStyle:{ 
    justifyContent: 'center', 
    alignItems: 'center', 
    zIndex: 9999,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    margin: 20, 
    padding: 10,
    elevation: 5,
  },
  boxButtons: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  buttonContainer: {
    marginVertical: 10,
  },
});
