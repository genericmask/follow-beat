<template>
    <div>
        <div id="metronomeInputs">
            <button class="on-off" @click="metronome.toggleOnOff()">{{buttonDoes}} Metronome</button>
            <h3><input v-model.number="metronome.bpm" class="input-number" type="number" min="20" max="160" 
                size="2"/> BPM
            </h3>
        </div>
        
    </div>
</template>

<script>

const soundFilePath = require("@/assets/drumSticks.mp3");

class Metronome {
    constructor(bpm) {
        this.bpm = bpm; 
        this.beatSound = new Audio(soundFilePath);
        this.keepingBeat = false;
    }
    start(){
        let msBetweenBeats = (60/this.bpm)*1000;
        this.beatSound.play(); // Play an initial beat
        this.intervalID = setInterval(()=>(this.beatSound.play()), msBetweenBeats);
        this.keepingBeat = true;
    }
    stop(){
        this.keepingBeat = false;
        clearInterval(this.intervalID);
    }
    restart(){
        this.stop();
        this.start();
    }
    toggleOnOff(){
        if(this.keepingBeat){
            this.stop();
        } else{
            this.start();
        }
    }
}

export default {
  name: 'Metronome',
  props: {
      initialBPM: {
          type: Number,
          default: 60
      }
  },
  data() {
    return {
        metronome: new Metronome(this.initialBPM)
    }
  },
  watch: {
      'metronome.bpm': {
          handler(){
              if(this.metronome.keepingBeat)
                this.metronome.restart();
          }
      }
  },
  computed: {
      buttonDoes(){
          if(this.metronome.keepingBeat){
              return "Stop";
          } else{
              return "Start";
          }
      }
  }
}
</script>

<style>
#metronomeInputs{
  display: inline-grid;
  grid-auto-flow: column;
  justify-items: center;
  align-items: center;
}
.on-off {
    background: white;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    display: inline-block;
    border: 4px solid white;
    margin-right: 2px;
    text-decoration: none;
    color: #2c3035;
    font-family: inherit;
    font-size: 1rem;
    cursor: pointer;
    text-align: center;
    -webkit-appearance: none;
    -moz-appearance: none;
    outline: none;
}

.input-number{
    font-size: 16px;
    font-family: inherit;
    color: #2c3035;
    background-color: white;
    border: 4px solid white;
    padding-left: 6px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;  
    outline: none;
}
</style>