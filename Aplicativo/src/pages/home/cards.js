import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, Linking, ToastAndroid, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { Button } from '@rneui/themed';
import { defaultStyles, defaultColor, font } from '../../theme';
import baseUrl from '../../config/baseUrl'
import api from '../../config/api'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const inputWidthScale = 0.8;
const inputWidth = windowWidth * inputWidthScale;

export default () => {
    const [equipmentList, setEquipmentList] = useState([]);
    const [token, setToken] = useState('');
    const [searchText, setSearchText] = useState('');
    const [filteredEquipmentList, setFilteredEquipmentList] = useState([]);
    const handleSearch = (text) => {
      setSearchText(text);
      const filteredList = equipmentList.filter(item => {
        return item.name.toLowerCase().includes(text.toLowerCase());
        // Você pode adicionar mais condições de filtro conforme necessário
      });
      setFilteredEquipmentList(filteredList);
    };
    

    const navigation = useNavigation();
    const handlePress = (path, data) => {
        navigation.navigate(path, data);
    };

    const showToastWithGravityAndOffset = (text) => { ToastAndroid.showWithGravityAndOffset( text, ToastAndroid.LONG, ToastAndroid.TOP, 25, 50);};
    const apiGetEquipments = async () => {
        try {
          const response = await api.get("/equipment/all");
          const tempToken = await AsyncStorage.getItem('token');
          setToken(tempToken);
          setEquipmentList(response.data)
        } catch (error) {
            showToastWithGravityAndOffset("Ocorreu um erro desconhecido.");
            console.log("error: ", error)
        }
    }

    useEffect(() => {
        apiGetEquipments();
      }, []);

      useFocusEffect(
        React.useCallback(() => {
            // Atualiza os equipamentos sempre que a tela estiver em foco
            apiGetEquipments();
        }, [])
    );

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <View style={styles.input}>
            <FontAwesome5 name="search" size={20} color="#989898" style={{ marginRight: 10 }}  />
            <TextInput style={styles.inputBox}  
              placeholder={'Pesquisa'} 
              onChangeText={handleSearch}
              value={searchText}
            />
        </View>
        <TouchableOpacity style={styles.buttonQrCode}  onPress={() => handlePress("qrCode")}>
              <MaterialIcons name="qr-code-scanner" size={26} color="white" />
        </TouchableOpacity>
      </View>
      {(searchText === '' ? equipmentList : filteredEquipmentList).map((item, index) => {
        return (
          <TouchableOpacity style={styles.cards} key={index} onPress={() => handlePress("detailEquipment", item.id)}>
             <Image
                style={styles.image}
                source={{ uri: `${baseUrl}/file/equipment?equipment=${item.id}&token=${token}` }}
                resizeMode="cover"
            />
            <View style={styles.infoBox}>
              <View style={styles.titleBox}>
                <Text numberOfLines={1} style={styles.title}>{item.name}</Text>
              </View>
              <View style={styles.textBox}>
                <Text numberOfLines={3} ellipsizeMode="tail" style={styles.text}>{item.description}</Text>
              </View>
            </View>
            <MaterialIcons style={styles.nextButton} name="navigate-next" size={35} color={defaultColor.primaryColor} />
          </TouchableOpacity>
        )
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  cards: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    justifyContent: "space-between",
    position: "relative",
    flexDirection: "row",
    elevation: 5,
    marginTop: 30,
  },
  image: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  text: {
    fontFamily: font.fontFamily,
    fontSize: 12,
  },
  title: {
    fontFamily: font.fontFamily,
    fontWeight: "bold",
    fontSize: 14,
  },
  infoBox: {
    width: "60%",
    padding: 10,
    paddingVertical: 10,
    justifyContent: "center",
    marginRight: 20
  },
  titleBox: {
    marginBottom: 20,
  },
  textBox: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  nextButton: {
    position: "absolute",
    zIndex: 999,
    right: 5,
    top: 30
  },
  buttonQrCode:{
    marginTop: 30,
    height: 47,
    width: 47,
    backgroundColor: defaultColor.buttonColor,
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    borderRadius: 30
  },
  input: {
    backgroundColor: '#FFFFFF',
    flexDirection: "row",
    alignItems: "center",
    height: 47,
    width: "80%",
    elevation: 5,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 30,
},
inputBox: {
    height: 40,
    width: "90%",
    color: defaultColor.grey
},
searchBox:{
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
}
});
