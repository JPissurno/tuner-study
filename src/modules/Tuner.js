import PitchFinder  from "pitchfinder";
import Recording    from "react-native-recording";

export default class Tuner {

    middleA = 440;
    semitone = 69;
    noteStrings = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];

    constructor(sampleRate = 22050, bufferSize = 2048){

        this.sampleRate = sampleRate;
        this.bufferSize = bufferSize;
        this.pitchFinder = new PitchFinder.YIN({ sampleRate: this.sampleRate });

    }

    start(){

        Recording.init({
            sampleRate: this.sampleRate,
            bufferSize: this.bufferSize,
        });

        Recording.start();

        Recording.addRecordingEventListener((data) => {

            const frequency = this.pitchFinder(data);

            if (frequency && this.onNoteDetected) {

                const note = this.getNote(frequency);
                this.onNoteDetected({

                    name: this.noteStrings[note % 12],
                    value: note,
                    cents: this.getCents(frequency, note),
                    octave: parseInt(note / 12) - 1,
                    frequency: frequency,
                    
                });

            }

        });

    }

    /**
     * @Functionality
     *  Gets musical note from frequency
     *
     * @Parameter
     *  frequency (number)
     *  
     * @Return
     *  number
     * 
     */
    getNote(frequency){

        const note = 12 * (Math.log(frequency / this.middleA) / Math.log(2));
        return Math.round(note) + this.semitone;

    }

    /**
     * @Functionality
     *  Gets the musical note's standard frequency
     *
     * @Parameter
     *  note (number)
     * 
     * @Return
     *  number
     * 
     */
    getStandardFrequency(note){

        return this.middleA * Math.pow(2, (note - this.semitone) / 12);

    }

    /**
     * @Functionality
     *  Gets cents difference between given frequency
     *  and musical note's standard frequency
     *
     * @Parameters
     *  frequency (float)
     *  note (int)
     * 
     * @Return
     *  int
     * 
     */
    getCents(frequency, note){

        return Math.floor((1200 * Math.log(frequency / this.getStandardFrequency(note))) / Math.log(2));

    }

}