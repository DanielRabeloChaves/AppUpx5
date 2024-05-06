import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, Linking, ToastAndroid, TouchableOpacity, Modal } from 'react-native';
import { Button } from '@rneui/themed';
import { defaultStyles, defaultColor, font } from '../../theme';
import baseUrl from '../../config/baseUrl'
import api from '../../config/api'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import MapView, { Marker } from 'react-native-maps';

export default ({equipmentDataHistory}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [userName, setUserName] = useState('');
    const [editDate, setEditDate] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const closeModal = () => {setModalVisible(false);};

    const navigation = useNavigation();
    const handlePress = (path, data) => {
        navigation.navigate(path, data);
    };
    const showToastWithGravityAndOffset = (text) => { ToastAndroid.showWithGravityAndOffset( text, ToastAndroid.LONG, ToastAndroid.TOP, 25, 50);};
    const statusColors = {
        1: 'green',
        2: 'red',
        3: 'yellow',
      };

      const openInfoDetailEquipment = (itemEquipment) =>{
        const coordinates = itemEquipment?.local.coords;
        setUserName(itemEquipment?.name_user);
        setEditDate(itemEquipment?.edit_date);
        setLatitude(coordinates.latitude);
        setLongitude(coordinates.longitude);
        setModalVisible(true)
      }
     
  return (
    <View style={{padding: 20}}>
    <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
       >
          <View style={styles.modalStyle}>
            <View style={[defaultStyles.styleLineView, {borderTopRightRadius: 15, borderTopLeftRadius: 15}]}><Text style={styles.titleTopicBox}>Historico detalhado</Text></View>
            <View style={styles.infoModelBoxEquipment}>
                <View>
                    <Text ellipsizeMode="tail" style={styles.title}>Ultimo usuario:</Text>
                    <Text ellipsizeMode="tail" style={styles.text}>{userName}</Text>
                </View>
                <View>
                    <Text ellipsizeMode="tail" style={styles.title}>Data de edição:</Text>
                    <Text ellipsizeMode="tail" style={styles.text}>{moment(editDate).format('DD/MM/YYYY')}</Text>
                </View>
                <View><Text ellipsizeMode="tail" style={styles.title}>Local:</Text></View>
                <View style={styles.ViewBoxMap}>
                    <MapView
                    style={styles.boxMap}
                        initialRegion={{
                            latitude: latitude,
                            longitude: longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <Marker
                        coordinate={{
                            latitude: latitude,
                            longitude: longitude,
                        }}
                        title="Localização"
                        />
                    </MapView>
                </View>
            </View>
          </View>
          <TouchableOpacity style={styles.CloseModal} onPress={closeModal}></TouchableOpacity>
      </Modal>
      {equipmentDataHistory?.map((item, index) => {
        return (
            <TouchableOpacity key={index} style={styles.container} onPress={() => openInfoDetailEquipment(item)}>
                <View style={styles.body}>
                    <View style={styles.boxBodyLeft}>
                        <MaterialIcons name="navigate-next" size={30} color="white" />
                    </View>
                    <View style={styles.infoBox}>
                        <View style={styles.infoBoxHeader}>
                            <View >
                                <Text style={styles.title}>Setor: {item?.name_sector}</Text>
                            </View>
                            <View >
                                <Text ellipsizeMode="tail" style={[styles.text, {fontWeight: "bold", color: statusColors[item?.id_status_calibration] }]}>
                                    {item?.name_status_calibration}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.infoBoxBody}>
                            <View>
                                <Text ellipsizeMode="tail" style={styles.title}>Calibragem:</Text>
                                <Text ellipsizeMode="tail" style={styles.text}>{moment(item?.get_equipment).format('DD/MM/YYYY')}</Text>
                            </View>
                            <View>
                                <Text ellipsizeMode="tail" style={styles.title}>Retorno:</Text>
                                <Text ellipsizeMode="tail" style={styles.text}>{moment(item?.return_equipment).format('DD/MM/YYYY')}</Text>
                            </View>
                            <View>
                                <MaterialIcons name="history" size={30} color={defaultColor.primaryColor} />
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
      })}
    </View>
  );
};

const styles = StyleSheet.create({
    body:{
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        position: "relative",
        flexDirection: "row",
        elevation: 5,
        marginBottom: 30,
    },
    boxBodyLeft:{
        height: "100%",
        width: 30,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        backgroundColor: defaultColor.primaryColor,
        flexDirection: "row",
        alignItems: "center",
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
        padding: 10,
        paddingVertical: 10,
        flex: 1,
        height: 100,
        justifyContent: "center",
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
    },
    infoBoxHeader: {
        marginBottom: 20,
        justifyContent: "space-between",
        flexDirection: "row",
    },
    infoBoxBody: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    modalStyle:{ 
        justifyContent: 'center', 
        alignItems: 'center', 
        zIndex: 9999,
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        margin: 20, 
        elevation: 5,
      },
      infoModelBoxEquipment:{
        height: 480,
        width: "100%",
        padding: 20,
        justifyContent: "space-between",
      },
      boxButtons: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
        
      },
    CloseModal: {
        height: "100%",
        width: "100%",
        position: "absolute",
        backgroundColor: 'rgba(0, 0, 0, 0.5)' 
    },
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    boxMap:{
        marginTop: 10,
        width: "100%", 
        height: 300,
        borderRadius: 15,
    },
    ViewBoxMap: {
        borderRadius: 10,
    },
    titleTopicBox:{
        fontFamily: font.fontFamily,
        fontWeight: "bold",
        fontSize: 25,
        color: "#ffffff"
      },
});
