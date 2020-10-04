<template>
  <div id="app">
    {{msg}}
    <div>
      <input type="text" v-model="info" />
      <button @click="handleClick">add</button>
    </div>
    <ul>
    </ul>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      msg: "hello world1",
      info: "",
      list: [],
    };
  },
  methods: {
    handleClick() {
      this.list.push(this.info);
      this.info = "";
    },
  },
  components: {
    TodoItem,
  },
};
</script>

<style>
</style>
