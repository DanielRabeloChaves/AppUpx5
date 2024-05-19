import React from 'react';
import { View, StyleSheet, Text, ScrollView, Image  } from 'react-native';
import Constants from 'expo-constants';
import Header from '../../components/header';
import Footer from '../../components/footer';
import CustomCarousel from '../../components/carousel';
import { imagesFeaturedHome } from '../../util/objects'
import Cards from './cards'
import { defaultStyles, font } from '../../theme';
import groupImg from '../../Img/group.jpeg';

export default () => {
  return (
    <ScrollView >
      <View style={styles.container}>
        <View style={styles.content}>
          <Header type={"startPage"} />
          <View style={styles.body}>
              <View style={styles.MainGroup}>
                <Image style={styles.image} source={groupImg} />
                <View style={styles.boxGroup}>
                  <View><Text style={styles.title}>Sparking social change through volunteering</Text></View>
                  <View><Text style={styles.text}>A new program allows our employees to make a sustainable global impact while building skills.</Text></View>
                </View>
              </View>
              <CustomCarousel />
              <View style={defaultStyles.styleLineView}><Text style={styles.titleBox}>Featured Stories</Text></View>
              <Cards data={imagesFeaturedHome}/>
          </View>
          < Footer/>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
  },
  body: {
    width: "100%",
    paddingBottom: 20,
    flex: 1,
  },
  titleBox:{
    fontFamily: font.fontFamily,
    fontWeight: "bold",
    fontSize: 25,
    color: "#ffffff"
  },
  image: {
    width: "100%",
    height: 200,
  },
  MainGroup:{
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
    height: 300,
  },
  boxGroup:{
    width: "90%",
    height: 140,
    elevation: 5,
    padding: 10,
    backgroundColor: "#FFFFFF",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 15,
    position: "absolute",
    bottom: 0,
  },
  text: {
    fontFamily: font.fontFamily,
    fontSize: 12,
    marginBottom: 10,
    textAlign: "center"
  },
  title: {
    fontFamily: font.fontFamily,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center"
  },
});