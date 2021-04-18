<template>
  <div class="stat">
    <h3>Your Average{{formattedName}}: {{arrayAverage}}</h3>
  </div>
</template>

<script>
export default {
  name: "Statistic",
  props:{
      name:{
          type: String,
          default: ""
      },
      numArray: {
          type: Array
      }
  },
  computed:{
      arrayAverage(){
        let sum = 0;
        let average = 0;
        if(this.numArray.length > 1){
            this.numArray.forEach(function(item){
            sum += item;
            })
            average = (sum/(this.numArray.length))
        }
        return average.toFixed(1);
      },
      formattedName(){
          return " " + this.name;
      }
  }
};
</script>

<style>
.stat{
  display: inline-grid;
  grid-auto-flow: column;
  justify-items: center;
  align-items: center;
}

</style>