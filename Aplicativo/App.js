import React, { useEffect, useRef } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import startPage from './src/pages/startPage/startPage'

const Stack = createNativeStackNavigator();
export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="start" // Coloque aqui a pagina que voce deseja que apareca primeiro
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="start" component={startPage} />
        {/* <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="candidato" component={PerfilCandidato} />
        <Stack.Screen name="UsuarioContratante" component={PerfilContratante} />
        <Stack.Screen name="UsuarioCandidato" component={PerfilCandidato} />
        <Stack.Screen name="AtualizarUsuarioContratante" component={AtualizarUsuarioContratante} />
        <Stack.Screen name="pesquisar" component={PesquisarVaga} />
        <Stack.Screen name="candidatar" component={CandidatarVaga} />
        <Stack.Screen name="notification" component={Notification} />
        <Stack.Screen name="chat" component={Chat} />
        <Stack.Screen name="cardvaga" component={CardVaga} />
        <Stack.Screen name="AtualizarCandidato" component={AtualizarCandidato} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
