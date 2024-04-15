import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TextInput, Dimensions, KeyboardAvoidingView, ScrollView, Platform, Keyboard, ToastAndroid } from 'react-native';
import Constants from 'expo-constants';
import { defaultStyles, font, defaultColor } from '../../theme';
import Logo from '../../Img/logoWhite.png';
import Header from '../../components/header';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import api from '../../config/api'

const windowWidth = Dimensions.get('window').width;
const inputWidthScale = 0.8;
const inputWidth = windowWidth * inputWidthScale;

export default () => {
    const navigation = useNavigation();
    const handlePress = (path) => {
        navigation.navigate(path);
    };

    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const userData = () => {
        return data = {
            name: name,
            cpf: cpf,
            login: user,
            password: password,
            confirm_passowrd: confirmPassword,
            email: email,
            phone: phone
        }
    }
    const showToastWithGravityAndOffset = (text) => { ToastAndroid.showWithGravityAndOffset( text, ToastAndroid.LONG, ToastAndroid.TOP, 25, 50);};
    const apiAuthentication = async () => {
        try {
          const response = await api.post("/user/cadastro", userData());
          console.log("Chegou aqui")
          const data = response.data;
          console.log(data)
          Keyboard.dismiss();
          showToastWithGravityAndOffset(data.menssage || data.error);
          if(data.status && data.status === "Sucesso"){
            handlePress("login")
          }
        } catch (error) {
            showToastWithGravityAndOffset("Ocorreu um erro desconhecido.");
            console.log(error)
        }
      }

      useEffect(() => {
        userData();
      }, []);

    return (
        <KeyboardAvoidingView style={{ flex: 1, marginTop: Constants.statusBarHeight }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Constants.statusBarHeight}>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                <View style={{ flex: 1 }}>
                    <Header type={"login"} />
                    <ScrollView>
                        <View style={styles.mainBox}>
                            <View style={styles.boxContainer}>
                                <View><Image style={styles.logo} source={Logo} /></View>
                                <View>
                                    <View style={styles.input}>
                                        <FontAwesome5 name="user-alt" size={20} color="#989898" style={{ marginRight: 10 }} />
                                        <TextInput style={styles.inputBox} value={name} onChangeText={setName} placeholder={'Name'} autoCapitalize="none" />
                                    </View>
                                    <View style={styles.input}>
                                        <FontAwesome5 name="user-edit" size={20} color="#989898" style={{ marginRight: 10 }} />
                                        <TextInput style={styles.inputBox} value={cpf} onChangeText={setCpf} placeholder={'CPF'} autoCapitalize="none" />
                                    </View>
                                    <View style={styles.input}>
                                        <MaterialIcons name="email" size={20} color="#989898" style={{ marginRight: 10 }} />
                                        <TextInput style={styles.inputBox} value={email} onChangeText={setEmail} placeholder={'E-mail'} autoCapitalize="none" keyboardType="email-address" />
                                    </View>
                                    <View style={styles.input}>
                                        <FontAwesome5 name="phone-alt" size={20} color="#989898" style={{ marginRight: 10 }} />
                                        <TextInput style={styles.inputBox} value={phone} onChangeText={setPhone} placeholder={'Phone'} autoCapitalize="none" keyboardType="phone-pad" />
                                    </View>
                                    <View style={styles.input}>
                                        <FontAwesome5 name="user" size={20} color="#989898" style={{ marginRight: 10 }} />
                                        <TextInput style={styles.inputBox} value={user} onChangeText={setUser} placeholder={'User'} autoCapitalize="none" />
                                    </View>
                                    <View style={styles.input}>
                                        <MaterialIcons name="lock-outline" size={20} color="#989898" style={{ marginRight: 10 }} />
                                        <TextInput style={styles.inputBox} value={password} onChangeText={setPassword} placeholder={'Password'} placeholderTextColor="#989898" autoCapitalize="none" secureTextEntry={true} />
                                    </View>
                                    <View style={styles.input}>
                                        <MaterialIcons name="lock-outline" size={20} color="#989898" style={{ marginRight: 10 }} />
                                        <TextInput style={styles.inputBox} value={confirmPassword} onChangeText={setConfirmPassword} placeholder={'Confirm Passowrd'} autoCapitalize="none" secureTextEntry={true} />
                                    </View>
                                </View>
                                <View style={styles.boxButtons}>
                                    <View style={styles.buttonContainer}>
                                        <Button title="SignUp" titleStyle={defaultStyles.fontButton} buttonStyle={defaultStyles.button} containerStyle={{ height: 40, width: 230 }}  onPress={apiAuthentication} />
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
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20
    },
    boxContainer: {
        width: "90%",
        backgroundColor: defaultColor.primaryColor,
        justifyContent: "space-around",
        alignItems: "center",
        borderRadius: 10,
        padding: 10
    },
    logo: {
        height: 60,
        width: 122,
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
        width: "95%",
        color: defaultColor.grey
    },
    boxButtons: {
        justifyContent: "center",
        alignItems: "center"
    },
    buttonContainer: {
        marginVertical: 40,
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
    }
});