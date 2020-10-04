<template>
  <div id="app">
    <h1>自定义指令和动态绑定类名</h1>
    <navBar />
  </div>
</template>

<script>
import navBar from './components/navBar'
export default {
  components:{
    navBar,
  },
};
</script>

<style>
#app{
  text-align: center;
}
</style>