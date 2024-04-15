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

  console.log(type)
  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        {type == "login" 
        ? <AntDesign name="back" size={24} color="white" onPress={handleGoBack} />
        : <Image style={styles.logo} source={Logo} />}
      </View>
        {type == "startPage" 
        ?   <View  style={styles.rightContainer}>
                <Button title="Login" titleStyle={defaultStyles.fontButton} buttonStyle={defaultStyles.button} containerStyle={{height: 35, width: 85}} onPress={() => handlePress("login")} />
                <Button title="Sign up" titleStyle={defaultStyles.fontButton} buttonStyle={defaultStyles.button} containerStyle={{height: 35, width: 85}} onPress={() => handlePress("signUp")} /> 
            </View>
        : type == "login" 
        ? <></> 
        : <></> 
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
    paddingLeft: 10},
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
  }
});
