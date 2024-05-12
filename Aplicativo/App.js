import React, { useEffect, useRef, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { BarCodeScanner } from 'expo-barcode-scanner';

import startPage from './src/pages/startPage/index'
import signUp from './src/pages/signUp/index'
import login from './src/pages/login/index'
import home from './src/pages/home/index'
import createEquipment from './src/pages/createEquipment/index'
import detailEquipment from './src/pages/detailEquipment/index'
import newHistoryEquipment from './src/pages/newHistoryEquipment/index'
import qrCode from './src/pages/qrCode/index'
import profileUser from './src/pages/profileUser'

const Stack = createNativeStackNavigator();
export default () => {
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão para acessar a localização foi negada');
        return;
      }
    })();

    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('A permissão para acessar a galeria foi negada.');
        return;
      }
    })();

    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="start" // Coloque aqui a pagina que voce deseja que apareca primeiro
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="start" component={startPage} />
        <Stack.Screen name="signUp" component={signUp} />
        <Stack.Screen name="login" component={login} />
        <Stack.Screen name="home" component={home} />
        <Stack.Screen name="createEquip" component={createEquipment} />
        <Stack.Screen name="detailEquipment" component={detailEquipment} />
        <Stack.Screen name="newHistoryEquipment" component={newHistoryEquipment} />
        <Stack.Screen name="qrCode" component={qrCode} />
        <Stack.Screen name="profileUser" component={profileUser} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
