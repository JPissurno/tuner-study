export default class Metronome {

    constructor(pulseCallback){

        this.pulseCallback = pulseCallback;
        this.state = {

            bpm: 100,
            playing: false,
            count: 0,
            beatsPerMeasure: 4

        };

        var Sound = require('react-native-sound');
        Sound.setCategory('Playback');

        this.tick = new Sound('tick.mp3', Sound.MAIN_BUNDLE);
        this.tack = new Sound('tack.mp3', Sound.MAIN_BUNDLE);

    }

    getBPM(){
        return this.state.bpm;
    }

    getPlaying(){
        return this.state.playing;
    }

    startStop(){
        
        if (this.state.playing) {

            clearInterval(this.timer);
            this.state.playing = false;

        } else {

            this.timer = setInterval(
                () => this.playClick(),
                (60/this.state.bpm)*1000
            );

            this.state.count = 0;
            this.state.playing = true;
            this.playClick();

        }

    }

    playClick(){

        const { count, beatsPerMeasure } = this.state;

        if (count % beatsPerMeasure === 0){
            
            this.tack.play();
            this.pulseCallback(0);

        } else {
            
            this.tick.play();
            this.pulseCallback(1);

        }

        this.state.count = (this.state.count + 1) % this.state.beatsPerMeasure;

    }

    handleBpmChange(bpm){

        if (this.state.playing) {

            clearInterval(this.timer);
            this.timer = setInterval(() => this.playClick(), (60 / bpm) * 1000);

            this.state.count = 0;
            this.state.bpm = bpm;

        } else
            this.state.bpm = bpm;

    }

    changeCompass(change){
        
        if (this.state.beatsPerMeasure+change <= 0) return;

        if (this.state.playing) {

            clearInterval(this.timer);
            this.timer = setInterval(() => this.playClick(), (60 / this.state.bpm) * 1000);

            this.state.count = 0;
            this.state.beatsPerMeasure = this.state.beatsPerMeasure+change;

        } else
            this.state.beatsPerMeasure = this.state.beatsPerMeasure+change;

    }

}