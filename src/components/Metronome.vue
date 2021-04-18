<template>
    <div>
        <div id="metronomeInputs">
            <button class="toggle" :class="{'on': !metronome.keepingBeat, 'off': metronome.keepingBeat}" @click="metronome.toggleOnOff()">{{buttonDoes}} Metronome</button>
            <h3><input v-model.number="metronome.bpm" class="input-number" type="number" min="20" max="160" 
                size="2"/> BPM
            </h3>
        </div>
        
    </div>
</template>

<script>

const soundFilePath = require("@/assets/tick.mp3");

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
.toggle {
    
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    display: inline-block;
    
    text-decoration: none;
    font-family: inherit;
    font-size: 1rem;
    font-weight: 600;
    color: white;
    cursor: pointer;
    text-align: center;
    -webkit-appearance: none;
    -moz-appearance: none;
    outline: none;
}
.on{
  background: #38d18c;
  border: 4px solid #38d18c;
}
.off{
  background: #d13838;
  border: 4px solid #d13838;
}
.input-number{
    font-size: 16px;
    font-family: inherit;
    background-color: white;
    border: 4px solid white;
    padding-left: 6px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;  
    outline: none;
}
</style>