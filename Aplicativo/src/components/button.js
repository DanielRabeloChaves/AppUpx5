import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Button = ({ textButton, navigateTo }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.button} onPress={navigation.navigate(navigateTo)}>
      <Text style={styles.text}>{textButton}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
   button: {
    width: 90,
    height: 27,
    backgroundColor: '#284755',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12
  },
  text: {
    color: '#FFFFFF',
    fontFamily: 'Roboto',
    fontSize: 12
  },
});

export default Button;
