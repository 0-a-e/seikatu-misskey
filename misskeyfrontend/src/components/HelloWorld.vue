<template>
  <div class="hello">
    <canvas id="graph" style="position: absolute; width: 100%; height:100%;"></canvas>
  </div>
</template>

<script>
import { Chart } from "chart.js";
import axios from 'axios';

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  methods: {
    showgraph(user){
      console.log(user);
    const ctx = document.getElementById("graph");
       var date = new Date();
        axios.get( 'http://localhost?user='+ user )
                .then( ( res ) => {
                    console.log(res["data"]);
      new Chart(ctx, {
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
        stepSize: 1
,
        callback: function(value){
          return  (date.getMonth() + 1).toString() + '/' + value.toString()
        }
      }
    }]}
        }
      });
                      } )
                .catch( ( res ) => {
                    console.error( res );
                } );
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
</style>
