import React, { Component } from "react";
import Slider from "@react-native-community/slider";
import { Text, Button, View, Dimensions, TouchableHighlight } from "react-native";

import Metronome from "../../modules/Metronome";

export default class Control extends Component {

    constructor(props){
      
      super(props);
      this.metronome = new Metronome((beat) => {this.pulse(beat)});

      this.state = {
          color: 'blue'
      }

    }

    componentWillUnmount(){

        if(this.metronome.getPlaying())
          this.metronome.startStop();

    }

    pulse(beat){

        this.setState( {color: beat ? 'red' : 'blue' });

    }

    render(){

        const { bpm, playing } = this.metronome.state;

        return(
            <View>

                <TouchableHighlight
                    style = {{
                        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                        width: Dimensions.get('window').width * 0.3,
                        height: Dimensions.get('window').width * 0.3,
                        backgroundColor: this.state.color,
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex'
                    }}
                    underlayColor = '#ccc'
                >
                    <></>
                </TouchableHighlight>

                <Text style={styles.bpmTitle}>{bpm} BPM</Text>

                <Slider
                    style={styles.slider}
                    maximumValue={240}
                    minimumValue={60}
                    onValueChange={(bpm) => { this.metronome.handleBpmChange(bpm); this.forceUpdate(); } }
                    step={1}
                    value={bpm}
                />

                <Button
                    style={styles.button}
                    onPress={() => { this.metronome.startStop(); this.forceUpdate(); } }
                    title={ playing ? "Stop" : "Play"}
                />

                <Button
                    style={styles.button_compass}
                    onPress={() => { this.metronome.changeCompass(1); this.forceUpdate(); } }
                    title={'+'}
                />

                <Button
                    style={styles.button_compass}
                    onPress={() => { this.metronome.changeCompass(-1); this.forceUpdate(); } }
                    title={'-'}
                />

            </View>
        )
        
    }

}

const styles = {

    bpmTitle: {
        fontSize: 30,
        marginBottom: 50
    },

    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    slider : {
        height: 20,
        width: 300
    },

    button: {
        fontSize:70
    },

    button_compass: {
        fontSize: 20
    }

}