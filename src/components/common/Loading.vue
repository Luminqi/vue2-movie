<template>
  <div class="load_container">
    <div class="load_bar" :class="{ loading: isLoading }"></div>
  </div>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  .load_container {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.8);
    @include wh(100%, 4px);
  }
  .load_bar {
    position: absolute;
    @include wh(3.8462rem, 100%);
  }
  @keyframes loading {
    0% {
      left: 0;
      background-color: rgba(255, 136, 0, 0.8);
    }
    100% {
      left: 15.8462rem;
      background-color: rgba(0, 0, 0, 0.8);
    }
  }
  // @keyframes complete {
  //   0% {
  //     background-color: rgba(255, 136, 0, 0.8);
  //   }
  //   100% {
  //     background-color: rgba(0, 0, 0, 0.8);
  //   }
  // }
  .load_bar.loading {
    animation: loading 2s linear infinite;
  }
  // .load-enter-leave {
  //   animation: complete 2s ease-out;
  // }
</style>
