<template>
  <div class="main">
  <div>
  <h1>Misskeyで生活習慣の乱れを確認するやつ</h1>
  </div>
      <div style="position: relative; width: 100%;">
        <div class="lbbox">
<div class="atlabel">@</div>
        </div>
<input v-model="username" placeholder="idを入力" class="minput" />
      </div>
<div class="infobox">
  <p>msk.seppuku.clubのみ対応</p>
<button class="btn"><a href="https://github.com/0-a-e/seikatu-misskey"><img src="https://img.icons8.com/bubbles/50/000000/github.png"/></a></button>
<p>2021 <a href="https://msk.seppuku.club/@oae"> <img style="width: 20px; vertical-align: bottom; border: solid 1px #f5f5f5; border-radius: 50px;" src="https://msk.seppuku.club/files/a6540cc5-de2c-4a5a-a8b9-63b35e46a101"/></a> MIT License.</p>
</div>
<button @click="submitdata" class="mbtn">見る</button>
  </div>
</template>

<script>

export default {
  name: 'top',
 data () {
    return {
      username: ""
    }
    },
  methods: {
   submitdata() {
     const username = this.username;
     if(username){
       if(this.isHanEisu(username)){
     this.$emit('send',username);
     } else{
       this.$swal({icon: 'info',
  text: '半角英数字のみ使用できます。',
  });
     }
     } else {
this.$swal({icon: 'info',
  text: 'IDが入力されていません。',
});
     }
  },
  isHanEisu(str){
  str = (str==null)?"":str;
  if(str.match(/^[A-Za-z0-9]*$/)){
    return true;
  }else{
    return false;
  }
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
.btn{
border: none;
background: transparent;
outline: none;
border-radius: 50px;
}
.btn:active{
   transform: scale(0.9);
}
.infobox{
    position:absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: 55vh;
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

.swal2-container {
    z-index: 1000000;
}
</style>
