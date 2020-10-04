<template>
  <div id="app">
    <h1>render()</h1>
    <render  tag="ul"/>
  </div>
</template>

<script>
import render from './components/render'
export default {
  components:{
    render,
  },
};
</script>

<style>
#app{
  text-align: center;
}
</style>