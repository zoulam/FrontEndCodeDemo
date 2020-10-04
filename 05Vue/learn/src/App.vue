<template>
  <div id="app">
    <h1>父子组件通信</h1>
    <ParentComponent />
  </div>
</template>

<script>
import ParentComponent from "./ChildWithParent/parent1";
export default {
  name:'#app',
  components:{
    ParentComponent,
  }
};
</script>

<style>
#app {
  text-align: center;
}
</style>