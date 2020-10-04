<template>
  <button :class="['my-btn',btnStyle]">
      <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    btnStyle: String,
    btnText: String,
  },
};
</script>

<style>
.my-btn {
  height: 50px;
  padding: 0 15px;
  border-radius: 5px;
  border: none;
  outline: none;
  background-color: #000;
  color: #fff;
}

.btn-primary {
  color: #fff;
  background-color: #337ab7;
}

.btn-success {
  color: #fff;
  background-color: #5cb85c;
}

.btn-warning {
  color: #fff;
  background-color: red;
}
</style>