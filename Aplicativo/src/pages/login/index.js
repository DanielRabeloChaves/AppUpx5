import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, Image, TextInput, Dimensions, KeyboardAvoidingView, ScrollView, Platform, Modal, TouchableOpacity, ToastAndroid } from 'react-native';
import Constants from 'expo-constants';
import { defaultStyles, font, defaultColor } from '../../theme';
import Logo from '../../Img/logoWhite.png';
import Header from '../../components/header';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import ModalToken from '../../components/token'
import api from '../../config/api'

const windowWidth = Dimensions.get('window').width;
const inputWidthScale = 0.8;
const inputWidth = windowWidth * inputWidthScale;

export default () => {
    const navigation = useNavigation();
    const handlePress = (path) => {navigation.navigate(path);};
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [responseLogin, setResponseLogin] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [typeAccess, setTypeAccess] = useState('');
    const openModal = () => { setModalVisible(true);};
    const closeModal = () => {setModalVisible(false);};
   
    const userData = () => {
        return data = {
            login: user,
            password: password,
        }
    }
    const showToastWithGravityAndOffset = (text) => { ToastAndroid.showWithGravityAndOffset( text, ToastAndroid.LONG, ToastAndroid.TOP, 25, 50);};
    const apiAuthentication = async () => {
        try {
          const response = await api.post("/user/login", userData());
          const data = response.data;
          if(data.menssage && data.status === "Email Enviado"){
            setTypeAccess("Login")
            setModalVisible(true)
          }
          showToastWithGravityAndOffset(data.menssage || data.error);
        } catch (error) {
            showToastWithGravityAndOffset("Ocorreu um erro desconhecido.");
            console.log(error)
        }
      }

      const apiForgetPassword = async (type) => {
        try {
          const response = await api.post("/user/forgetpassword", userData());
          const data = response.data;
          if(data.menssage && data.status === "Email Enviado"){
            setTypeAccess("ForgetPassword")
            setModalVisible(true)

          }
          showToastWithGravityAndOffset(data.menssage || data.error);
        } catch (error) {
            showToastWithGravityAndOffset("Ocorreu um erro desconhecido.");
            console.log(error)
        }
      }

      useEffect(() => {
        userData();
      }, []);
   

    return (
        <KeyboardAvoidingView style={{ flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Constants.statusBarHeight} >
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" >
                <View style={{ flex: 1 }}>
                    <Header type={"login"} />
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={closeModal}
                    >
                         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ModalToken data={userData()} type={typeAccess} /> 
                         </View>
                         <TouchableOpacity style={styles.CloseModal} onPress={closeModal}></TouchableOpacity>
                    </Modal>
                    <ScrollView style={{ flex: 1 }}>
                        <View style={styles.mainBox}>
                            <View style={styles.boxContainer}>
                                <View><Image style={styles.logo} source={Logo} /></View>
                                <View>
                                    <View style={styles.input}>
                                        <FontAwesome5 name="user" size={20} color="#989898" style={{ marginRight: 10 }} />
                                        <TextInput style={styles.inputBox} value={user} onChangeText={setUser} placeholder={'Usuario'} autoCapitalize="none" />
                                    </View>
                                    <View style={styles.input}>
                                        <MaterialIcons name="lock-outline" size={20} color="#989898" style={{ marginRight: 10 }} />
                                        <TextInput style={styles.inputBox} value={password} onChangeText={setPassword} placeholder={'Senha'} autoCapitalize="none" secureTextEntry={true} />
                                    </View>
                                    <View style={styles.forgetPassword}>
                                        <TouchableOpacity onPress={apiForgetPassword}>
                                            <Text style={styles.text}>Esqueceu sua senha? Clique aqui.</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.boxButtons}>
                                    <View style={styles.buttonContainer}>
                                        <Button 
                                            title="Logar" 
                                            titleStyle={defaultStyles.fontButton} 
                                            buttonStyle={defaultStyles.button} 
                                            containerStyle={{ height: 40, width: 230 }}  
                                            onPress={() => apiAuthentication()}
                                        />
                                    </View>
                                    <View style={styles.orContainer}>
                                        <Text style={styles.text}>Ou</Text>
                                    </View>
                                    <View style={styles.buttonContainer}>
                                        <Button 
                                            title="Cadastrar" 
                                            titleStyle={defaultStyles.fontButton} 
                                            buttonStyle={defaultStyles.button} 
                                            containerStyle={{ height: 40, width: 130 }} 
                                            onPress={() => handlePress("signUp")}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    mainBox: {
        height: 610,
        justifyContent: "center",
        alignItems: "center",
    },
    boxContainer: {
        height: "90%",
        width: "90%",
        backgroundColor: defaultColor.primaryColor,
        justifyContent: "space-around",
        alignItems: "center",
        borderRadius: 10
    },
    logo: {
        height: 120,
        width: 120,
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
    },
    inputBox: {
        height: 40,
        width: "90%",
        color: defaultColor.grey
    },
    boxButtons: {
        justifyContent: "center",
        alignItems: "center"
    },
    buttonContainer: {
        marginVertical: 10,
    },
    orContainer: {
        marginBottom: 10
    },
    text: {
        fontFamily: font.fontFamily,
        fontSize: 12,
        color: defaultColor.white,
        textAlign: "right"
    },
    forgetPassword: {
        padding: 10
    },
    CloseModal: {
        height: "100%",
        width: "100%",
        position: "absolute",
        backgroundColor: 'rgba(0, 0, 0, 0.5)' 
    }
});