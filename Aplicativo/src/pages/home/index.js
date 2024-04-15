import React from 'react';
import { View, StyleSheet, Text, ScrollView, Image  } from 'react-native';
import Constants from 'expo-constants';


export default () => {
  return (
    <ScrollView style={{marginTop: Constants.statusBarHeight,}}>
      <View style={styles.container}>
        <Text>Home</Text>
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
});