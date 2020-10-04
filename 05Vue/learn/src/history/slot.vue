<template>
  <div id="app">
    <h1>slot</h1>
    <my-button btnStyle='btn-success'>
      cli
    </my-button>
  </div>
</template>

<script>
import Button from "./components/slot";
export default {
  components: {
    MyButton: Button,
  },
};
</script>

<style>
#app {
  text-align: center;
}
</style>