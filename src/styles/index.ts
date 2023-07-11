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
        fontSize: 17,
        fontFamily: 'Montserrat-Medium',
        marginTop: 5
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
        borderWidth: 2,
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
    }
})
