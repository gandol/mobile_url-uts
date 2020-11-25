import React, { Component } from "react";
import {
    Image,
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import RNRestart from 'react-native-restart';

class Logo extends Component {
    render() {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: '80%', flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        style={{ width: 50, height: 50, borderRadius: 30, marginRight: 20 }}
                        source={{ uri: this.props.image }}
                    />
                    <Text style={{ fontSize: 18, color: 'black' }} >{this.props.username}</Text>
                </View>
                <View style={{ width: '90%' }}>
                    <TouchableOpacity
                        onPress={async () => {
                            await AsyncStorage.clear();
                            RNRestart.Restart()
                        }}
                    >
                        <Text>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
export default Logo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});