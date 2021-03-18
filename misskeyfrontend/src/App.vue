<template>
<div>
  <vue-loaders-pacman v-show="loader" class="loader" color="lightseagreen"/>
  <top v-show="!gmode && !loader" @send="getdata" />
 <hello-world @success="success" @error="error" @back="backpage" v-show="gmode && !loader" ref="graph"/>
</div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import top from './components/top.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    top
  },
  data(){
return{
  gmode: false,
  loader: false
}
  },
  methods: {
    error(msg){
      this.backpage();
      this.$swal({icon: 'info',
      text: msg,
});
    },
    getdata(user){
    this.loader = true;
    this.$refs.graph.showgraph(user);
    },
    backpage() {
     this.gmode = false;
     this.loader = false;
   },
    success(){
  this.gmode = true;
  this.loader = false;
    },

   },
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.loader {

}
</style>
