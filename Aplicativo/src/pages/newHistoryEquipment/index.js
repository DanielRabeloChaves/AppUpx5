import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, TextInput, Linking, KeyboardAvoidingView, Keyboard, ToastAndroid, Dimensions, Platform, TouchableOpacity    } from 'react-native';
import Constants from 'expo-constants';
import Header from '../../components/header';
import { Button } from '@rneui/themed';
import { defaultStyles, font, defaultColor } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import api from '../../config/api'
import apiFile from '../../config/apiFile'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { SelectList } from 'react-native-dropdown-select-list'
import * as Location from 'expo-location';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import defaultImage from '../../Img/defaultImage.png';
import Footer from '../../components/footer';
import baseUrl from '../../config/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const inputWidthScale = 0.8;
const inputWidth = windowWidth * inputWidthScale;

export default (equipmentId) => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [equipementInfo, setEquipementInfo] = useState();
    const [token, setToken] = useState('');

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permissão para acessar a localização foi negada');
            return;
          }
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        })();
      }, []);
    
    const navigation = useNavigation();
    const handlePress = (path, data) => {
        navigation.navigate(path, data);
    };
    const [id_sector, setId_sector] = useState('');
    const [sectorList, setSectorList] = useState([]);
    const [id_status_calibration, setId_status_calibration] = useState('');
    const [statusCalibrationList, setStatusCalibrationList] = useState([]);
    const [get_equipment, setGet_equipment] = useState(new Date());
    const [showGetEquipment, setShowGetEquipment] = useState(false);
    const [return_equipment, setReturn_equipment] = useState(new Date());
    const [showDateReturnEquipment, setShowDateReturnEquipment] = useState(false);
    const handleDateChangeGetEquipment = (event, newDate) => {
        if (newDate !== undefined) {
            setGet_equipment(newDate);
            setShowGetEquipment(Platform.OS === 'ios'); // Fecha o seletor de data no iOS automaticamente após a seleção
        }
      };
      const handleDateChangeReturnEquipment = (event, newDate) => {
        if (newDate !== undefined) {
            setReturn_equipment(newDate);
            setShowDateReturnEquipment(Platform.OS === 'ios'); // Fecha o seletor de data no iOS automaticamente após a seleção
        }
      };
      const showDatePickerComponentGetEquipment = () => {
        setShowGetEquipment(true);
      };
      const showDatePickerComponentReturnEquipment = () => {
        setShowDateReturnEquipment(true);
      };
    const showToastWithGravityAndOffset = (text) => { ToastAndroid.showWithGravityAndOffset( text, ToastAndroid.LONG, ToastAndroid.TOP, 25, 50);};
    const equiptmentData = () => {
        return data = {
            id_sector: id_sector,
            id_status_calibration: id_status_calibration,
            local: location,
            get_equipment: get_equipment,
            return_equipment: return_equipment
        }
    }
   
    const apiCreateNewHistoryEquipment = async () => {
        try {
          const response = await api.post(`/equipment/history/create?id=${equipmentId.route.params}`, equiptmentData());
          const data = response.data;
          Keyboard.dismiss();
          showToastWithGravityAndOffset(data.menssage || data.error);
          if(data.status && data.status === "Sucesso"){
            handlePress("detailEquipment", equipmentId.route.params)
          }
        } catch (error) {
            console.log("error: ", error)
            showToastWithGravityAndOffset("Ocorreu um erro desconhecido.");
        }
    }

    const apiGetSectors = async () => {
        try {
          const response = await api.get("/sector/all");
          let data = [];
          response.data.map(item => {
            let tempData = {};
            tempData.key = item.id
            tempData.value = item.name
            data.push(tempData)
          })
          setSectorList(data)
        } catch (error) {
            showToastWithGravityAndOffset("Ocorreu um erro desconhecido.");
            console.log("error: ", error)
        }
      }

      const apiGetStatusCalibration = async () => {
        try {
          const response = await api.get("/calibration/status/all");
          let data = [];
          response.data.map(item => {
            let tempData = {};
            tempData.key = item.id
            tempData.value = item.name
            data.push(tempData)
          })
          setStatusCalibrationList(data)
        } catch (error) {
            showToastWithGravityAndOffset("Ocorreu um erro desconhecido.");
            console.log("error: ", error)
        }
      }

      const apiGetEquipmentById = async () => {
        try {
          const response = await api.get(`/equipment?id=${equipmentId.route.params}`);
          const tempToken = await AsyncStorage.getItem('token');
          setEquipementInfo(response.data)
          setToken(tempToken);
        } catch (error) {
            showToastWithGravityAndOffset("Ocorreu um erro desconhecido.");
            console.log("error: ", error)
        }
    }

      useEffect(() => {
        equiptmentData();
        apiGetSectors();
        apiGetStatusCalibration();
        apiGetEquipmentById();
      }, []);

  return (
    <ScrollView style={{marginTop: Constants.statusBarHeight,}}>
      <View style={styles.container}>
        <Header />
        <Image
                style={styles.image}
                source={{ uri: `${baseUrl}/file/equipment?equipment=${equipmentId.route.params}&token=${token}` }}
                resizeMode="cover"
        />
        
        <View style={styles.body}>
            <View style={styles.titleBox}>
                <Text ellipsizeMode="tail" style={styles.title}>Nome do equipamento:</Text>
                <Text style={styles.text}>{equipementInfo?.name}</Text>
              </View>
              <View style={styles.textBox}>
                <Text ellipsizeMode="tail" style={styles.title}>Descrição:</Text>
                <Text ellipsizeMode="tail" style={styles.text}>{equipementInfo?.description}</Text>
            </View>
            <View>
                <SelectList 
                    boxStyles={styles.input}
                    inputStyles={{ color: defaultColor.grey}}
                    setSelected={(val) => setId_sector(val)} 
                    data={sectorList} 
                    save="name"
                    placeholder={
                        <>
                            <MaterialIcons name="filter-list" size={20} color="#989898"/>
                            <Text>   Setor</Text>
                        </>
                    }
                />
                <SelectList 
                    boxStyles={styles.input}
                    inputStyles={{ color: defaultColor.grey}}
                    setSelected={(val) => setId_status_calibration(val)} 
                    data={statusCalibrationList} 
                    save="name"
                    placeholder={
                        <>
                            <MaterialIcons name="filter-list" size={20} color="#989898"/>
                            <Text>   Status da calibragem</Text>
                        </>
                    }
                />
                <TouchableOpacity style={styles.input} onPress={showDatePickerComponentGetEquipment} >
                    <MaterialIcons name="date-range" size={20} color="#989898" style={{ marginRight: 10 }}/>
                    <Text style={{ color: defaultColor.grey}}>Agendamento: {get_equipment.toLocaleDateString()}</Text>
                </TouchableOpacity>
                {showGetEquipment && (
                    <DateTimePicker
                    value={get_equipment}
                    mode="date"
                    display="default"
                    onChange={handleDateChangeGetEquipment}
                    />
                )}
                <TouchableOpacity style={styles.input} onPress={showDatePickerComponentReturnEquipment}>
                    <MaterialIcons name="date-range" size={20} color="#989898" style={{ marginRight: 10 }}/>
                    <Text style={{ color: defaultColor.grey}}>Retorno: {return_equipment.toLocaleDateString()}</Text>
                </TouchableOpacity>
                {showDateReturnEquipment && (
                    <DateTimePicker
                    value={return_equipment}
                    mode="date"
                    display="default"
                    onChange={handleDateChangeReturnEquipment}
                    />
                )}
            </View>
            <View style={styles.boxButtons}>
                <Button title={"Salvar"} titleStyle={defaultStyles.fontButton} buttonStyle={defaultStyles.button} onPress={() => apiCreateNewHistoryEquipment()} />
            </View>
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
    },
    boxButtons: {
        marginVertical: 30
    },
    input: {
        backgroundColor: '#FFFFFF',
        flexDirection: "row",
        alignItems: "center",
        height: 47,
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 30,
        elevation: 5,
        borderWidth: 0
    },
    inputBox: {
        height: 40,
        width: "100%",
        color: defaultColor.grey,
    },
    inputImage: {
        height: 200,
        width: "100%",
        borderRadius: 15,
    },
  image: {
    width: "100%",
    height: 200,
  },
  titleBox: {
    marginBottom: 20,
  },
  title: {
    fontFamily: font.fontFamily,
    fontWeight: "bold",
    fontSize: 20,
  },
  text: {
    fontFamily: font.fontFamily,
    fontSize: 14,
  },
  textBox: {
    justifyContent: 'flex-end',
    flex: 1,
  },
});