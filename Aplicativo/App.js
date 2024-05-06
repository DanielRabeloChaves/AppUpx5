import React, { useEffect, useRef } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import startPage from './src/pages/startPage/index'
import signUp from './src/pages/signUp/index'
import login from './src/pages/login/index'
import home from './src/pages/home/index'
import createEquipment from './src/pages/createEquipment/index'
import detailEquipment from './src/pages/detailEquipment/index'
import newHistoryEquipment from './src/pages/newHistoryEquipment'

const Stack = createNativeStackNavigator();
export default () => {
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};
