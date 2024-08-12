import { StyleSheet } from 'react-native';

const defaultColor = {
  buttonColor: "#306A9F",
  fontButtonColor: "#FFFFFF",
  primaryColor: "#1D2633",
  white: "#FFFFFF",
  grey: "#5E5E5E",
  profile: "#DEB038",
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