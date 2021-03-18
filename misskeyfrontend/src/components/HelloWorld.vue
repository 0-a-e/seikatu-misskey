<template>
  <div class="hello">
    <button class="backbtn" @click="back()">
      <img src="@/assets/left-arrow.svg" style="user-select: none;" width="20"/>
    </button>
    <div  style="position: fixed; width: calc(100vw - 40px); height:calc(100vh - 40px);">
    <canvas id="graph"></canvas>
    </div>
  </div>
</template>

<script>
import { Chart } from "chart.js";
import axios from 'axios';

export default {
  name: 'HelloWorld',
   data () {
    return {
    msg: String,
    chart: ""
  }
  },
  methods: {
    back(){
      this.chart.destroy();
      this.$emit("back");
    },
    showgraph(user){
       var date = new Date();
        axios.get( 'https://seppukumisskeyoaeapi-rszvj.run.goorm.io/?user='+ user )
                .then( ( res ) => {
                    console.log(res["data"]);
                    if(res["data"]["error"] == "usernotfound"){
                      this.$emit('error',"ユーザーが存在しません。");
                    } else {
                      this.$emit('success');
                      const ctx = document.getElementById("graph");
                      this.chart = new Chart(ctx, {
                        type: "bubble",
                          data:{
                            datasets:[
               /*  {
            label:"2/11",
            backgroundColor: "rgba(219,39,91,0.5)",
            data:[
                  {x: 1.3,y: 60,r: 35},
                  {x: 1.5,y: 20,r: 30},
                  {x: 4.5,y: 70,r: 25},
                  {x: 7.5,y: 40,r: 30},
                  {x: 3.5,y: 30,r: 40}
                  ]
                }*/
                            res["data"]["d0"],
                            res["data"]["d1"],
                            res["data"]["d2"],
                            res["data"]["d3"],
                            res["data"]["d4"],
                            res["data"]["d5"],
                            res["data"]["d6"],
                                  ]
                            },
                          options: {
      responsive: true,
      maintainAspectRatio: false,
          scales: {
            xAxes: [{
              scaleLabel:{
        display: true,
        labelString: "時間"
      },
      ticks: {
        suggestedMax: 24,
        suggestedMin: 0,
        stepSize: 1,
        callback: function(value){
          return  value +  '時'
        }
      }
    }],
    yAxes: [{
      scaleLabel:{
        display: true,
        labelString: "日付"
      },
      ticks: {
        suggestedMax: date.getDate() - 1,
        suggestedMin: date.getDate() - 6,
        stepSize: 1,
        callback: function(value){
          return  (date.getMonth() + 1).toString() + '/' + value.toString()
        }}}]}}});
        }
      }
      ).catch((res) => {
                    console.error(res);
                });
    }
  },
  mounted() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.backbtn{
    border-radius: 50px;
    width: 40px;
    height: 40px;
    outline: none;
    background:lightseagreen;
    padding: 10px;
    border: none;
    transition: 0.1s;
    position: fixed;
    left: 2vw;
    top: 2vh;
}

.backbtn:active{
   transform: scale(0.9);
}
</style>
