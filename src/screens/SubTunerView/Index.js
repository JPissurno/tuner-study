import React, { Component } from 'react';
import styled from "styled-components/native";
import { Text, PermissionsAndroid } from "react-native";

import Tuner from "../../modules/Tuner"
import NoteButtons from './NoteButtons';

export default class Index extends Component {

    constructor(props){

        super(props);
        this.messages = {lower: 'Aperte mais a corda↑',
                         higher: 'Afrouxe mais a corda↓',
                         tight: 'Afinado!'}

    }

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
            else this._lastNoteName = note.name;

        };

    }

    setTarget(targetFreq){

        this.setState({targetFreq});

    }

    render(){

        let message;
        const currentFreq = this.state.note.frequency;
        const targetFreq = this.state.targetFreq;
        const diff = (targetFreq-currentFreq)/targetFreq;


        if(diff > 0.001) message = this.messages.lower;
        else if(diff < -0.001) message = this.messages.higher;
        else message = this.messages.tight;

        return(
            <Container>
                
                <Text style={{fontSize: 40}}>{message}</Text>
                <NoteButtons teste={(targetFreq) => this.setTarget(targetFreq)}/>

            </Container>
        )

    }

}

const Container = styled.SafeAreaView`

    flex: 1;
    justify-content: center;
    align-items: center;

`;