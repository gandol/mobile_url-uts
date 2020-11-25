import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ToastAndroid,
    ActivityIndicator,
} from "react-native";
import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import RNRestart from 'react-native-restart';

class LoginComponet extends Component {
    constructor(props) {
        super();
        this.state = {
            username: '',
            password: '',
            loading: false
        };
    }

    handleLogin = async () => {
        this.setState({
            loading: true
        })
        let datatoPost = new FormData();
        datatoPost.append('username', this.state.username)
        datatoPost.append('password', this.state.password)

        Axios.post(global.url + "masuk", datatoPost)
            .then(async (resp) => {
                let dataRespo = resp.data
                console.log(dataRespo)
                if (dataRespo.status == 'sukses') {
                    await AsyncStorage.setItem('Username', this.state.username)
                    await AsyncStorage.setItem('image', dataRespo.data.image)
                    RNRestart.Restart()
                } else {
                    ToastAndroid.show("Login Gaqal", ToastAndroid.SHORT)
                }
                this.setState({
                    loading: false
                })
            }).catch((err) => {
                this.setState({
                    loading: false
                })
                ToastAndroid.show("Login Gaqal", ToastAndroid.SHORT)
                console.log(err)
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={{ width: '80%', borderColor: 'black', borderWidth: 1, marginBottom: 10, paddingLeft: 20 }}
                    placeholder="Username"
                    onChangeText={(text) => {
                        this.setState({
                            username: text
                        })
                    }}
                />
                <TextInput
                    style={{ width: '80%', borderColor: 'black', borderWidth: 1, marginBottom: 10, paddingLeft: 20 }}
                    placeholder="Password"
                    onChangeText={(text) => {
                        this.setState({
                            password: text
                        })
                    }}
                    secureTextEntry={true}
                />

                <TouchableOpacity
                    style={{ width: '40%', height: 45, borderWidth: 1, borderRadius: 12, justifyContent: 'center', alignItems: 'center',marginBottom:10 }}
                    onPress={() => { this.handleLogin() }}
                >
                    <Text>Login</Text>
                </TouchableOpacity>
                {this.state.loading
                    ?
                    <ActivityIndicator color="blue" />
                    :
                    null
                }

            </View>
        );
    }
}
export default LoginComponet;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});