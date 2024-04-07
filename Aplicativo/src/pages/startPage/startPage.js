import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import Constants from 'expo-constants';
import Header from './components/header';
import Footer from '../../components/footer';
import CustomCarousel from '../../components/carousel';

import banner1 from '../../Img/banner1.jpeg';
import banner2 from '../../Img/banner2.jpeg';
import banner3 from '../../Img/banner3.jpeg';

const images = [
  { image: banner1, text: `Up and running again
  A Boston Scientific therapy helped Esther overcome cancer pain.` },
  { image: banner2, text: `Rekindling the flame
  See how Boston Scientific is helping couples like Andy and his wife to get their intimacy back.` },
  { image: banner3, text: `From chronic pain to a new purpose
  After a dance injury, Carmela’s back on her feet.` },
];
  
export default () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Header style={styles.header}/>
        <View style={styles.body}>
            <CustomCarousel data={images} />
        </View>
        <Footer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
  },
  body: {
    height: "700",
    width: "100%",
    padding: 10,
    flex: 1,
  },
});