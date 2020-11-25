import React, { Component } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    Image
} from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Login from './tampilan/Login'
import Logo from './komponen/Logo'
import HomeScreen from './tampilan/HomeScreen'
import Detail from './tampilan/DetailScreen'

const Stack = createStackNavigator();

class LoginComponet extends Component {
    constructor(props) {
        super();
        this.state = {
            login: false,
            loading: true,
            username: '',
            image: ''
        };
    }
    cekLogin = async () => {
        let username = await AsyncStorage.getItem('Username')
        let image = await AsyncStorage.getItem('image')
        if (username) {
            // await AsyncStorage.clear()
            this.setState({ login: true, loading: false, username: username, image: image })
        } else {
            this.setState({ login: false, loading: false })
        }
    }

    componentDidMount() {
        global.url = "https://api-uts-mobile.sinau.me/"
        this.cekLogin()
    }
    render() {
        return (
            this.state.loading ?
                <ActivityIndicator color="blue" />
                :
                this.state.login
                    ?
                    <Stack.Navigator>
                        <Stack.Screen
                            name={this.state.username}
                            component={HomeScreen}
                            options={{ headerTitle: props => <Logo image={this.state.image} username={this.state.username} /> }}
                        />
                        <Stack.Screen
                            name="detail"
                            component={Detail}
                            options={({ route }) => ({
                                headerShown: true,
                                title: route.params.title ? route.params.title : ""
                            })}
                        />
                    </Stack.Navigator>
                    :
                    <Stack.Navigator>
                        <Stack.Screen
                            name="Login"
                            component={Login}
                            options={{
                                headerShown: false,
                            }}
                        />
                    </Stack.Navigator>
        );
    }
}
export default LoginComponet;