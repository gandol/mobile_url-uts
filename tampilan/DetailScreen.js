import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image
} from "react-native";
import Axios from 'axios'

class Detail extends Component {
    constructor(props) {
        super();
        this.state = {
            data: [],
            slesai: false
        }
    }

    getData = async () => {
        Axios.get(global.url + 'postingan/' + this.props.route.params.id)
            .then((resp) => {
                let respondata = resp.data
                if (respondata.status == 'sukses') {
                    this.setState({
                        data: respondata.data,
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
                console.log(err)
            })
    }
    componentDidMount() {
        this.getData()
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.slesai
                    ?
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        <Image source={{ uri: this.state.data.postingan.image }} style={{ width: '100%', height: 200 }} />
                        <View style={{ position: 'absolute', right: 10, top: 150, flexDirection: 'row',alignItems:'center' }}>
                            <Image source={{ uri: "https://i.imgur.com/VlCxXB5.png" }} style={{ width: 30, height: 30,marginRight:9 }} />
                            <Text>{this.state.data.komentar}</Text>
                        </View>

                        <View style={{ width: '100%', paddingLeft: 10, paddingRight: 10, marginTop: 10 }}>
                            <Text style={{ color: 'black', fontSize: 18 }} >{this.state.data.postingan.judul}</Text>

                            <Text style={{ color: 'black', fontSize: 12, marginTop: 20 }}>
                                {this.state.data.postingan.isi_post}
                            </Text>
                            <View style={{ height: 50 }}></View>
                        </View>
                    </ScrollView>
                    :
                    null
                }
            </View>
        );
    }
}
export default Detail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});