import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";
import Axios from 'axios';
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { FlatGrid } from 'react-native-super-grid';
// import { useNavigation } from '@react-navigation/native';
// const navigation = useNavigation();

class HomeScreen extends Component {
    constructor(props) {
        super();
        this.state = {
            dataPostingan: [],
            slesai: false
        }
    }

    handleGetData = async () => {
        Axios.get(global.url + "postingan")
            .then((resp) => {
                let dataRespon = resp.data
                if (dataRespon.status == 'sukses') {
                    let tempData = [];
                    dataRespon.data.map((dataku) => {
                        let dt = {
                            id: dataku.id,
                            judul: this.hapusJudul(dataku.judul),
                            image: dataku.image
                        }
                        tempData.push(dt);
                    })
                    this.setState({
                        dataPostingan: tempData,
                        slesai: true
                    })
                } else {
                    this.setState({
                        slesai: true
                    })
                }
            }).catch((err) => {
                this.setState({
                    slesai: true
                })
            })
    }

    componentDidMount() {
        this.handleGetData();
    }

    hapusJudul = (judul = "") => {
        let maks = 40;
        return judul.substring(0, maks) + "..."
    }

    renderItem(item, navigation) {
        console.log(item.image)
        return (
            <TouchableOpacity
                style={{ width: '94%', marginBottom: 10, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginLeft: '3%' }}
                onPress={() => {
                    navigation.navigate("Detail", {
                        title: item.judul
                    })
                }}
            >
                <Image source={{ uri: item.image }} style={{ width: '100%', height: 100, borderRadius: 8 }} />
                <Text style={{ position: 'absolute', marginLeft: 10, marginRight: 10, bottom: 10, color: 'white' }}>{item.judul}</Text>
            </TouchableOpacity>
        );
    }


    render() {
        let { navigation } = this.props;
        return (
            <View style={styles.container}>
                <FlatGrid
                    itemDimension={250}
                    data={this.state.dataPostingan}
                    showsVerticalScrollIndicator={false}
                    spacing={5}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={{ width: '94%', marginBottom: 10, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginLeft: '3%' }}
                            onPress={() => {
                                navigation.navigate("detail", {
                                    title: item.judul,
                                    id: item.id
                                })
                            }}
                        >
                            <Image source={{ uri: item.image }} style={{ width: '100%', height: 100, borderRadius: 8 }} />
                            <Text style={{ position: 'absolute', marginLeft: 10, marginRight: 10, bottom: 10, color: 'white' }}>{item.judul}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        );
    }
}
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});