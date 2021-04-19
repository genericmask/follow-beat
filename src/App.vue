<template>
  <div id="app" class="main-container">
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-C91048HF81"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-C91048HF81');
    </script>
    <div class="title">
      <h1>{{title}}</h1>
    </div>
    <div class="metronome">
      <Metronome @update:bpm="handleMetronomeBPMUpdate"/>
    </div>
    <button class="tempo-button" @mousedown="updateClickTime">
      <div class="tempo-outline"></div>
      <div class="tempo-line"></div>
      <div class="tempo-line user-line" :style="{transform: userLineRotation}"></div>
      <div class="container">
        <div class="user-tempo">{{buttonClickBPM.toFixed(1)}}</div>
        <div class="tempo-message">{{tempoMessage}}</div>
      </div>
      
    </button>
    <div class="statistics">
      <AverageStat name="BPM" :numArray="allUserBPMs"/>
      <button class="button reset" @click="resetAverage">Reset Average</button>
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
        buttonClickBPM: 0,
        clickTime: 0,  
        clickTimeDiff: 0,
        allUserBPMs: [],
        metronomeBPM: 60,
    }
  },
  watch: {
      clickTime: {
        handler(newTime, oldTime){
          this.buttonClickBPM = this.calcBPM(newTime, oldTime);
          this.clickTimeDiff = this.calcClickTimeDiff(newTime, oldTime);
        },
        flush: 'post'
      },
      buttonClickBPM: {
        handler(newBPM){
          // less than 1 is an outlier that contaminates the array
          if(newBPM > 1) this.allUserBPMs.push(newBPM); 
        }
      }
  },
  computed: {
    buttonClickBPMAccurate(){ 
      // BPM < 0.05 are not accurate. They initially occur because buttonClickBPM is initialized to 0
      // and this helps detect when the user has clicked the button enough times (twice)
      // to get a BPM.
      return this.buttonClickBPM > 0.05;
    },
    msBetweenBeats(){
      return (60/this.metronomeBPM)*1000;
    },
    userLineRotation(){
      let rotationDegrees = 0;
      if (this.buttonClickBPMAccurate) rotationDegrees = this.calcRotationDegrees();
      return "rotate(" + rotationDegrees + "deg)";
    },
    tempoMessage(){ // Once we have an accurate BPM, change the message to "BPM".
      return this.buttonClickBPMAccurate ? "BPM" : "Click me!"; 
    }
  },
  methods: {
    handleMetronomeBPMUpdate(newBPM){
      this.resetAverage();
      this.metronomeBPM = newBPM;
    },
    resetAverage(){
      this.allUserBPMs = [];
    },
    updateClickTime(){ 
      this.clickTime = new Date().getTime(); 
    },
    calcBPM(newTime, oldTime){
      let BPM = (60/((newTime-oldTime)/1000));
      return BPM
    },
    calcClickTimeDiff(newTime, oldTime){
      return (newTime - oldTime) % this.msBetweenBeats;
    },
    calcRotationDegrees(){
      return ((this.clickTimeDiff/this.msBetweenBeats)*360).toFixed(1);
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

.tempo-line{
	position: absolute;
	top: -4%;
	left: -4%;
	bottom: -4%;
	right: -4%;
	cursor: pointer;
	border-radius: 50%;
  background: linear-gradient(#fff, transparent) no-repeat center/5px 100%;
}

.user-line{
  background: linear-gradient(#d13838, transparent) no-repeat center/5px 100%;
  transform: rotate(280deg);
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