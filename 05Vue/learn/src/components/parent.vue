<template>
  <div>
    <h1>parent</h1>
    <p>{{message}}</p>
    <Child :message="message" @changeMessage="message = $event" />
  </div>
</template>

<script>
import Child from "./child";
export default {
  components: {
    Child,
  },
  data() {
    return {
      message: "hello zoulam",
    };
  },
};
</script>

<style>
#app {
  text-align: center;
}
</style>