import React, { Component } from "react";
import styled from "styled-components/native";
import { Text, Button, PermissionsAndroid } from "react-native";

import Note from './Note';
import Meter from './Meter';
import Tuner from "../../modules/Tuner"

export default class Index extends Component {

    state = {

        note: {
            name: "A",
            octave: 4,
            frequency: 440,
        }

    };

    async componentDidMount(){

        if (Platform.OS === "android") {

            await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            ]);

        }

        const tuner = new Tuner();
        tuner.start();
        tuner.onNoteDetected = (note) => {

            if (this._lastNoteName === note.name)
                this.setState({note})
            else
                this._lastNoteName = note.name;

        };

    }

    render(){

        return (
            <Container>

                <Meter cents={this.state.note.cents} />
                <Note {...this.state.note} />
                <Text style={ { fontSize: 28, color: "black" } }>
                    {this.state.note.frequency.toFixed(1)} Hz
                </Text>
                <Button
                    style={ { fontSize: 20 } }
                    onPress={ () => this.props.navigation.navigate('SubTunerView') }
                    title={'6 Cordas'}
                />
                <Button
                    style={ { fontSize: 20 } }
                    onPress={ () => this.props.navigation.navigate('MetronomeView') }
                    title={'Metrônomo'}
                />

            </Container>
        )

    }

}

const Container = styled.SafeAreaView`

    flex: 1;
    justify-content: center;
    align-items: center;

`;