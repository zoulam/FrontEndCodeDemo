<template>
  <div class="nav-bar" v-nav-active="{
      className:'nav-item',
      activeClass:'nav-active',
      curIndex
  }">
    <div
      v-for="(item, index) in items"
      :key="index"
      @click="changeIndex(index)"
      class="nav-item"
    >{{item}}</div>
  </div>
</template>

<script>
import NavActive from "../directive/navActive";
export default {
  directives: {
      NavActive
  },
  data() {
    return {
      items: ["one", "two", "three"],
      curIndex: 0,
    };
  },
  methods: {
    changeIndex: function (index) {
      this.curIndex = index;
    },
  },
};
</script>

<style>
.nav-bar {
  width: 400px;
  height: 50px;
  margin: 0 auto;
  border: solid black 1px;
}
.nav-item {
  float: left;
  width: 33.3%;
  height: 100%;
  line-height: 50px;
  text-align: center;
}

.nav-active {
  background-color: black;
  color: white;
}
</style>