import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, ToastAndroid } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import queryString from 'query-string';
import { defaultStyles, defaultColor, font } from '../../theme';
import Constants from 'expo-constants';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 

export default function App() {
  const showToastWithGravityAndOffset = (text) => { ToastAndroid.showWithGravityAndOffset( text, ToastAndroid.LONG, ToastAndroid.TOP, 25, 50);};
  const navigation = useNavigation();
  const handlePress = (path) => {
    navigation.navigate(path);
  };

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    const parsed = queryString.parseUrl(data);
    const equipmentId = parsed.query.equipmentid;
    if(equipmentId && type == 256){
        showToastWithGravityAndOffset(`QR Code com ID equipamento ${equipmentId}`);
        navigation.navigate("detailEquipment", equipmentId);
    }else{
        showToastWithGravityAndOffset("QR Code invalido.");
        navigation.navigate("home");
    }
  };

  if (hasPermission === null) {
    return <Text>Solicitando permissão de câmera</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sem acesso à câmera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.labelQrCode}>
        <Text style={styles.textBox}>QR Code do Equipamento</Text>  
      </View>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <View>
      </View>

      <TouchableOpacity style={styles.buttonExit} onPress={() => handlePress("home")}>
        <MaterialIcons name="close" size={30} color="white" />
      </TouchableOpacity>
      <View style={styles.focoBox}>
        <View style={styles.topLeftCorner}></View>
        <View style={styles.topRightCorner}></View>
        <View style={styles.BottonLeftCorner}></View>
        <View style={styles.BottonRightCorner}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "black",
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  labelQrCode: {
    position: 'absolute',
    height: 50,
    width: 250,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    zIndex: 999,
    top: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    borderRadius: 25
  },
  textBox:{
    fontFamily: font.fontFamily,
    fontWeight: "bold",
    fontSize: 14,
    color: "#ffffff"
  },
  buttonExit:{
    position: 'absolute',
    height: 60,
    width: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    zIndex: 999,
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    borderRadius: 50
  },
  focoBox: {
    position: 'absolute',
    height: '35%',
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topLeftCorner: {
    position: 'absolute',
    top: 0,
    width: "25%", // Largura da borda
    height: '25%',
    borderTopLeftRadius: 20, // Raio do canto superior esquerdo
    borderTopWidth: 6, // Largura da borda em pixels
    borderLeftWidth: 6, // Largura da borda em pixels
    borderColor: '#ffffff', // Cor da borda
  },
  topRightCorner: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: "25%", // Largura da borda
    height: '25%',
    borderTopRightRadius: 20, // Raio do canto superior esquerdo
    borderEndWidth: 6, // Largura da borda em pixels
    borderTopWidth: 6, // Largura da borda em pixels
    borderColor: '#ffffff', // Cor da borda
  },
  BottonLeftCorner: {
    position: 'absolute',
    bottom: 0,
    width: "25%", // Largura da borda
    height: '25%',
    borderBottomLeftRadius: 20, // Raio do canto superior esquerdo
    borderBottomWidth: 6, // Largura da borda em pixels
    borderLeftWidth: 6, // Largura da borda em pixels
    borderColor: '#ffffff', // Cor da borda
  },
  BottonRightCorner: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: "25%", // Largura da borda
    height: '25%',
    borderBottomRightRadius: 20, // Raio do canto superior esquerdo
    borderEndWidth: 6, // Largura da borda em pixels
    borderBottomWidth: 6, // Largura da borda em pixels
    borderColor: '#ffffff', // Cor da borda
  },
});
