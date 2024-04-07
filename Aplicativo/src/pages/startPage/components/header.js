import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Logo from '../../../Img/logoWhite.png';
import Button from '../../../components/button';

export default () => {
  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        <Image style={styles.logo} source={Logo} />
      </View>
      <View style={styles.rightContainer}>
        <Button textButton="Entrar" navigateTo="start" />
        <View style={{ marginRight: 10 }} />
        <Button style={styles.buttonStyle} textButton="Cadastrar" navigateTo="start" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 70,
    width: '100%',
    alignItems: 'center',
    backgroundColor: "#007DB3",
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 10
  },
  logo: {
    height: 30,
    width: 80,
  },
  leftContainer: {
    flex: 1, // Ocupa o espaço restante no lado esquerdo
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});
