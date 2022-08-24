import React, { Component } from "react";
import { View, Button } from "react-native";
import getNativeComponentAttributes from "react-native/Libraries/ReactNative/getNativeComponentAttributes";

import Tones from "../../modules/Tones";

export default class NoteButtons extends Component {

    constructor(props){

        super(props);
        this.setTarget = props.teste;
        this.tones = new Tones(global.webref);

        this.presets = {

            standard: ["E2", "A2", "D3", "G3", "B3", "E4"],
            openG: ["D2", "G2", "D3", "G3", "B3", "D4"],
            openD: ["D2", "A2", "D3", "F#3", "A3", "D4"]

        }

    }

    state = {

        tones: ["E2", "A2", "D3", "G3", "B3", "E4"]

    };

    changeTones(tones){

        this.setState({tones});

    }

    playTone(tone){

        this.tones.playTone(tone, "sine", 3);
        this.setTarget(this.tones.getTones()[tone]);

    }

    render(){

        const noteButtons = this.state.tones.map(
                            (tone, index) => <Button key={tone+index}
                                                style={{fontSize: 20}}
                                                onPress={() => this.playTone(tone)}
                                                title={tone}
                                            />);

        const presets = Object.keys(this.presets).map(
                        (preset) => <Button key={preset}
                                        style={{fontSize: 20}}
                                        onPress={() => this.changeTones(this.presets[preset])}
                                        title={preset}
                                    />);

        return(
            <View>

                {noteButtons}
                {presets}

            </View>
        )

    }

}