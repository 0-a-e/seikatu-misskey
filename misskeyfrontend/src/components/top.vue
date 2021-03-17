<template>
  <div class="main">
  <div>
  <h1>Misskeyで生活習慣の乱れを確認するやつ</h1>
  </div>
      <div style="position: relative; width: 100%;">
        <div class="lbbox">
<div class="atlabel">@</div>
        </div>
<input class="minput" />
      </div>

<button @click="submitdata" class="mbtn">見る</button>
  </div>
</template>

<script>

export default {
  name: 'top',
  props: {
  username: String,
  },
  methods: {
   submitdata() {
     this.username="fdededrg";
     this.$emit('send',this.username);
  }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*,
*:before,
*:after {
  box-sizing: inherit;
}
html{
    box-sizing: border-box;
}
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
.winbtn {
    border-radius: 0px;
    background: #e1e1e1;
    border: solid 1px #b7b7b7;
    outline: none;
    padding: 0px 1.5em;
    transition: 0.2s;

}
.winbtn:hover {
    background: #e5f1fb;
    border: solid 1.2px #0e7fd9;
}
.winbtn:focus{
    border: solid 2.3px #3793dc;
    /*padding: calc 0.4px 1.5em;*/
}

.winbtn:active{
    background: #cce4f7;
}
.minput{
  position:absolute;
    border-radius: 50px;
    width: calc(80% - 60px);
    height: 60px;
    top: 0;
    font-size: 24px;
    outline: none;
    padding: 4px 30px 4px 90px;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 3;
        background:#fff;
    color: #606060;
    border: none;
    box-shadow: 0px 0px 0px 8px lightseagreen;
    transition: 0.3s;
}
.minput:focus{
    box-shadow: 0px 6px 28px 8px #96c7c5;
}
.mbtn{
    border-radius: 50px;
    position:absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: 80vh;
    width: 80%;
    height: 60px;
    font-size: 24px;
    outline: none;
    background:#fff;
    color: #606060;
    padding: 4px 30px;
    border: none;
    box-shadow: 0px 0px 0px 8px lightseagreen inset;
    transition: 0.1s;
}
.mbtn:active{
    height: 60px;
    padding-top:10px;

    box-shadow: 0px 6px 0px 8px #96c7c5 inset;
}
.atlabel{
  position:relative;
font-size: 24px;
background: lightseagreen;
height: 60px;
box-shadow: 0px 0px 0px 8px lightseagreen;
left: 0;
width: 60px;
z-index: 4;
text-align: center;
line-height: 58px;
vertical-align: middle;
padding: 4px;
border-radius: 50px;
color: #fff;
}
.lbbox {
    position:absolute;
    height: 68px;
    width: calc(80% + 60px);
    left: 0;
    right: 0;
    margin: auto;
}
</style>
