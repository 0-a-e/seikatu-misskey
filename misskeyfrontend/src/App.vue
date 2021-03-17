<!--<template>
<div>
  <vue-loaders-pacman color="lightseagreen"/>
  <top @send="getdata(user)" />
 <hello-world ref="graph"/>
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
  methods: {
    getdata (user){
    this.$refs.graph.showgraph(user);
    console.log(this.gmode);
    },
   },
  }
</script>

-->

<template>
<top/>
</template>

<script>
import top from './components/top.vue'

export default {
  name: 'App',
  components: {
    top
  }
}
</script>