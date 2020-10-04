<template>
  <div id="app">
    <h1>children</h1>
    <p>{{message}}</p>
    <button @click="handleClick">按钮</button>
  </div>
</template>

<script>
export default {
    props:['message'],
    methods:{
        handleClick(){
            this.$emit('changeMessage','Bye')
        }
    }
};
</script>

<style>
#app {
  text-align: center;
}
</style>