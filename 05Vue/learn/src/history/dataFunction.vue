<template>
  <div id="app">
    <h1>为什么组件中的data是一个函数</h1>
    <Counter />
    <br>
    <Counter />
  </div>
</template>

<script>
import Counter from "./components/dataFunction";
export default {
  name:'#app',
  components:{
    Counter,
  }
};
</script>

<style>
#app {
  text-align: center;
}
</style>