import { StyleSheet } from 'react-native';

const defaultColor = {
  buttonColor: "#007DB3",
  fontButtonColor: "#FFFFFF",
  primaryColor: "#014681",
  white: "#FFFFFF",
  grey: "#5E5E5E",
  profile: "#40576B",
}

const font = {
  fontFamily: 'Roboto',
}

const defaultStyles = StyleSheet.create({
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: defaultColor.buttonColor,
      borderRadius: 15,
      marginHorizontal: 5,
      color: defaultColor.fontButtonColor,
    },
    fontButton: {
      fontFamily: font.fontFamily,
      fontWeight: 'bold', 
      fontSize: 12,
    },
    styleLineView: {
      height: 100,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#406",
    },
})

module.exports = {
    defaultStyles,
    defaultColor, 
    font
};