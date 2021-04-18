<template>
  <div id="app" class="main-container">
    <div class="title">
      <h1>{{title}}</h1>
    </div>
    <div class="metronome">
      <Metronome @update:bpm="resetStats"/>
    </div>
    <button class="tempo-button" @mousedown="updateClickTime">
      <div class="tempo-outline"></div>
      <div class="container">
        <div class="user-tempo">{{buttonClickBPM}}</div>
        <div class="tempo-message">{{tempoMessage}}</div>
      </div>
    </button>
    <div class="statistics">
      <AverageStat name="BPM" :numArray="allUserBPMs"/>
      <button class="button reset" @click="resetStats">Reset Average</button>
    </div>
    
  </div>
</template>

<script>
import Metronome from './components/Metronome.vue'
import AverageStat from './components/AverageStat.vue'

export default {
  name: 'App',
  components: {
      Metronome,
      AverageStat
  },
  data() {
    return {
        title: "Follow the beat!",
        tempoMessage: "Click me!",
        buttonClickBPM: (0).toFixed(1), // Without toFixed(1), buttonClickBPM will initialize as 0 and then change to 0.0 at the first button press
        clickTime: 0,  
        allUserBPMs: []
    }
  },
  watch: {
      clickTime: {
          handler(newTime, oldTime){
              this.tempoMessage = "BPM";
              this.buttonClickBPM = this.calculateBPM(newTime, oldTime);
          },
          flush: 'post'
      }
  },
  computed: {

  },
  methods: {
    updateClickTime(){ 
        this.clickTime = new Date().getTime(); 
    },
    calculateBPM(newTime, oldTime){
        let BPM = (60/((newTime-oldTime)/1000));
        if(BPM > 1) this.allUserBPMs.push(BPM); // less than 1 is an outlier that contaminates the array
        return BPM.toFixed(1);
    },
    resetStats(){
      this.allUserBPMs = [];
    }
  }
}
</script>

<style>
*{
  background-color: #2c3035;
}
#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
}

.tempo-button{
  position: absolute;
  top: 50%;
  left: 50%;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  border: none;
  outline: none;
  user-select: none;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  transition: all ease-out .15s;
}

.tempo-button:hover{
  filter: brightness(0.9);
}

.tempo-outline{
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
  background: linear-gradient(to right bottom, #38d18c, #ffffff);
	cursor: pointer;
	border-radius: 50%;
}

.container{
  position: absolute;
  top: 4%;
  left: 4%;
  bottom: 4%;
  right: 4%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 50%;
}

.user-tempo{
  color: white;
  font-size: 4rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.tempo-message{
  color: white;
  font-size: 1rem;
  font-weight: bold;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.statistics{
  position: absolute;
  bottom: 10%;
  left: 5%;
  right: 5%;
}

.button{
  border: 4px solid white;
  border-radius: 4px;
  background-color: white;
  display: inline-block; 
  text-decoration: none;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: none;
}

.reset{
  margin-left: 10px;
}

</style>