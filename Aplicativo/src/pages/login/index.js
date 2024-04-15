import React, {useState} from 'react';
import { View, StyleSheet, Text, Image, TextInput, Dimensions, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import Constants from 'expo-constants';
import { defaultStyles, font, defaultColor } from '../../theme';
import Logo from '../../Img/logoWhite.png';
import Header from '../../components/header';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const inputWidthScale = 0.8;
const inputWidth = windowWidth * inputWidthScale;

export default () => {
    const navigation = useNavigation();
    const handlePress = (path) => {
        navigation.navigate(path);
    };
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    return (
        <KeyboardAvoidingView style={{ flex: 1, marginTop: Constants.statusBarHeight }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Constants.statusBarHeight} >
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" >
                <View style={{ flex: 1 }}>
                    <Header type={"login"} />
                    <ScrollView style={{ flex: 1 }}>
                        <View style={styles.mainBox}>
                            <View style={styles.boxContainer}>
                                <View><Image style={styles.logo} source={Logo} /></View>
                                <View>
                                    <View style={styles.input}>
                                        <FontAwesome5 name="user" size={20} color="#989898" style={{ marginRight: 10 }} />
                                        <TextInput style={styles.inputBox} value={user} onChangeText={setUser} placeholder={'User'} autoCapitalize="none" />
                                    </View>
                                    <View style={styles.input}>
                                        <MaterialIcons name="lock-outline" size={20} color="#989898" style={{ marginRight: 10 }} />
                                        <TextInput style={styles.inputBox} value={password} onChangeText={setPassword} placeholder={'Password'} autoCapitalize="none" secureTextEntry={true} />
                                    </View>
                                    <View style={styles.forgetPassword}>
                                        <Text style={styles.text}>Forgot your password? Click here</Text>
                                    </View>
                                </View>
                                <View style={styles.boxButtons}>
                                    <View style={styles.buttonContainer}>
                                        <Button title="Login" titleStyle={defaultStyles.fontButton} buttonStyle={defaultStyles.button} containerStyle={{ height: 40, width: 230 }} onPress={() => handlePress("login")} />
                                    </View>
                                    <View style={styles.orContainer}>
                                        <Text style={styles.text}>Or</Text>
                                    </View>
                                    <View style={styles.buttonContainer}>
                                        <Button title="SignUp" titleStyle={defaultStyles.fontButton} buttonStyle={defaultStyles.button} containerStyle={{ height: 40, width: 130 }} onPress={() => handlePress("login")} />
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
    }
});