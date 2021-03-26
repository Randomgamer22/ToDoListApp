import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native';
import Db from '../config';
import firebase from 'firebase';

export default class HomeScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../assets/HomeScreenImage.png')} style={{height: 400, width: 400}} />
                <TouchableOpacity style={styles.calendarButton}>
                    <Text style={styles.calendarButtonText}>
                        Go To Callender
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#569ab3',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    calendarButton: {
        borderWidth: 3,
        marginTop: 30,
        padding: 20,
        borderRadius: 5,
        borderColor: '#8ed4b7',
    },
    calendarButtonText: {
        fontSize: 40,
        color: '#8ed4b7'
    }
})