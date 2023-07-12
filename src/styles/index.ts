import { StyleSheet } from "react-native";
import { black, theme, white } from "../assets/colors";

export const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: white.main
    },
    h1: {
        textAlign: 'left',
        fontSize: 25,
        fontFamily: 'Montserrat-Bold',
        color: black.main,
        width: '75%',
    },
    h4: {
        width: '100%',
        fontSize: 17,
        fontFamily: 'Montserrat-Medium',
        marginTop: 5,
        textAlign: 'center',
        color: black.main
    },
    h1container: {
        width: '90%', 
        justifyContent: 'center', 
        alignItems: 'flex-start',
        marginBottom: 15,
    },
    inputfield: {
        width: '85%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        color: black.main,
        fontSize: 17,
        fontFamily: 'Montserrat-Medium',
        paddingLeft: 0
    },
    joinasfield: {
        width: '78%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        color: black.main,
        fontSize: 17,
        fontFamily: 'Montserrat-Medium',
        paddingLeft: 5
    },
    joinastext: {
        color: black.main,
        fontSize: 17,
        fontFamily: 'Montserrat-Regular',
    },
    inputcontainer: {
        width: '90%',
        height: 60,
        backgroundColor: white.main,
        marginVertical: 10,
        borderWidth: 1.5,
        borderColor: black.B005,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    createaccount: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '85%',
        height: 55,
        borderRadius: 15,
    },
    stepscontainer: {
        width: '70%',
        height: 75,
        borderRadius: 15,
        borderColor: black.main,
        borderWIdth: 1,

      },
      stepIndicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 15,
        borderColor: black.main,
        borderWIdth: 1,
      },
      currentStep: {
        backgroundColor: theme.secondary,
        borderRadius: 100,
        borderColor: black.main,
        justifyContent: 'center',
        alignContent: 'center',
        borderWIdth: 1,
        width: 30,
        height: 30,
      },
      stepLabel: {
        color: '#000000',
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: 5,
      },
      currentStepLabel: {
        color: '#ffffff',
      },
      separator: {
        height: 2,
        backgroundColor: black.main,
        width: 30,
      },
      separatorFinished: {
        backgroundColor: '#acef9d',
      },
      scrollview: {
        width: '100%',
        height: '100%',
      }
})
