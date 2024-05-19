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

const windowWidth = Dimensions.get('window').width;
const inputWidthScale = 0.8;
const inputWidth = windowWidth * inputWidthScale;

export default () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

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
    const handlePress = (path) => {
        navigation.navigate(path);
    };
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [id_sector, setId_sector] = useState('');
    const [sectorList, setSectorList] = useState([]);
    const [id_status_calibration, setId_status_calibration] = useState('');
    const [statusCalibrationList, setStatusCalibrationList] = useState([]);
    const [image, setImage] = useState(null);
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
            name: name,
            description: description,
            id_sector: id_sector,
            id_status_calibration: id_status_calibration,
            local: location,
            get_equipment: get_equipment,
            return_equipment: return_equipment
        }
    }
    const selectImage = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('A permissão para acessar a galeria foi negada.');
                return;
            }
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.canceled && result.assets.length > 0) {
                const selectedImage = result.assets[0];
                setImage(selectedImage.uri);
            } else {
                alert('Nenhuma imagem selecionada.');
            }
        } catch (error) {
            console.error('Erro ao selecionar a imagem:', error);
            alert('Ocorreu um erro ao selecionar a imagem. Por favor, tente novamente.');
        }
    };
    const apiCreateEquipment = async () => {
        try {
            if(image){
                const response = await api.post("/equipment/create", equiptmentData());
                const data = response.data;
                Keyboard.dismiss();
                showToastWithGravityAndOffset(data.menssage || data.error);
                if(data.status && data.status === "Sucesso"){
                  apiPostImgEquipment(data.data.insertId);
                  handlePress("home")
                }
            }else{
                showToastWithGravityAndOffset("Necessario inserir uma imagem.");
            }
         

        } catch (error) {
            console.log("error: ", error)
            showToastWithGravityAndOffset("Ocorreu um erro desconhecido.");
        }
    }

    const apiPostImgEquipment = async (idEquipment) => {
        try {
            const formData = new FormData();
            const newDate = new Date();
            const formattedDate = `${('0' + newDate.getDate()).slice(-2)}${('0' + (newDate.getMonth() + 1)).slice(-2)}${newDate.getFullYear()}`;
            
            const uriParts = image.split('/');
            const fileName = uriParts[uriParts.length - 1];

            // Adiciona o nome do arquivo ao FormData com o ID do equipamento e a data
            formData.append('file', {
                uri: image,
                type: 'image/*',
                name: `${idEquipment}-${formattedDate}-${fileName}`, // Aqui você ajusta a composição do nome do arquivo conforme necessário
            });
            const response = await apiFile.post(`/file/equipment/postfile?equipment=${idEquipment}`, formData);
        } catch (error) {
            console.error('Erro ao fazer upload da imagem:', error);
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

      useEffect(() => {
        equiptmentData();
        apiGetSectors();
        apiGetStatusCalibration();
      }, []);

  return (
    <ScrollView >
      <View style={styles.container}>
        <Header />
        <View style={styles.body}>
            <View>
                <View>
                    <TouchableOpacity style={styles.inputImage} onPress={selectImage}>
                        {image 
                        ? <Image source={{ uri: image }} style={styles.inputImage}/> 
                        : <Image source={defaultImage} style={styles.inputImage} />}
                    </TouchableOpacity>
                </View>
                <View style={styles.input}>
                    <MaterialIcons name="all-inbox"  size={20} color="#989898" style={{ marginRight: 10 }} />
                    <TextInput style={styles.inputBox} value={name} onChangeText={setName} placeholder={'Nome do equipamento'} autoCapitalize="none" />
                </View>
                <View style={styles.input}>
                    <MaterialIcons name="short-text"  size={20} color="#989898" style={{ marginRight: 10 }}/>
                    <TextInput style={styles.inputBox} value={description} onChangeText={setDescription} placeholder={'Descrição do equipamento'} autoCapitalize="none" />
                </View>
                
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
                <Button title={"Salvar"} titleStyle={defaultStyles.fontButton} buttonStyle={defaultStyles.button} onPress={() => apiCreateEquipment()} />
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
        width: "90%",
        color: defaultColor.grey,
    },
    inputImage: {
        height: 200,
        width: "100%",
        borderRadius: 15,
    }
});