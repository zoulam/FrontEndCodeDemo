<template>
  <div>
    <button @click="count++">+</button>
    <span>Count:{{count}}</span>
    <button @click="count--">+</button>
  </div>
</template>

<script>
const data = { count: 0 };
export default {
  data() {
    return data;
  },
};
// export default {
//   data() {
//     return {
//       count: 0,
//     };
//   },
// };
</script>

<style>
</style>