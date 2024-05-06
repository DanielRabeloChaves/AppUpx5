import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, Linking, ToastAndroid, TouchableOpacity } from 'react-native';
import { Button } from '@rneui/themed';
import { defaultStyles, defaultColor, font } from '../../theme';
import baseUrl from '../../config/baseUrl'
import api from '../../config/api'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

export default () => {
    const [equipmentList, setEquipmentList] = useState([]);
    const [token, setToken] = useState('');

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
      {equipmentList?.map((item, index) => {
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
  }
});
