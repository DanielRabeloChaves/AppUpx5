import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Logo from '../Img/logoWhite.png';
import { Button } from '@rneui/themed';
import { defaultStyles, defaultColor, font } from '../theme';
import { useNavigation } from '@react-navigation/native'; 
import { AntDesign } from '@expo/vector-icons';

export default ({type}) => {
  const navigation = useNavigation();
  const handlePress = (path) => {
    navigation.navigate(path);
  };
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        {type == "login" 
        ? <AntDesign name="back" size={24} color="white" onPress={handleGoBack} />
        : <Image style={styles.logo} source={Logo} />}
      </View>
        {type == "startPage" 
        ?   <View  style={styles.rightContainer}>
                <Button title="Logar" titleStyle={defaultStyles.fontButton} buttonStyle={defaultStyles.button} containerStyle={{height: 35, width: 85}} onPress={() => handlePress("login")} />
                <Button title="Cadastrar" titleStyle={defaultStyles.fontButton} buttonStyle={defaultStyles.button} containerStyle={{height: 35, width: 85}} onPress={() => handlePress("signUp")} /> 
            </View>
        : type == "login" 
        ? <></> 
        : <>
          <View style={styles.profileUser}></View>
        </> 
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
    backgroundColor: "grey",
  }
});
