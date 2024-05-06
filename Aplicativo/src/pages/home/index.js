import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, Linking  } from 'react-native';
import Constants from 'expo-constants';
import Header from '../../components/header';
import { Button } from '@rneui/themed';
import { defaultStyles, font } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import api from '../../config/api'
import baseUrl from '../../config/baseUrl';
import Cards from './cards'
import Footer from '../../components/footer';

export default () => {
  const navigation = useNavigation();
    const handlePress = (path) => {
      navigation.navigate(path);
  };

  return (
    <ScrollView style={{marginTop: Constants.statusBarHeight,}}>
      <View style={styles.container}>
        <Header />
        <View style={styles.body}>
          <Button title={"Cadastrar novo equipamanto"} titleStyle={defaultStyles.fontButton} buttonStyle={defaultStyles.button} onPress={() => handlePress("createEquip")} />
          <Cards />
        </View>
      </View>
      < Footer/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  body: {
    padding: 20
  }
});