<template>
  <header class="head">
    <Icon name='logo' v-if="headlogo" @click.native="reload"></Icon>
    <Icon name='back' v-if="headback" @click.native="$router.go(-1)"></Icon>
    <slot name='title'></slot>
    <slot name='rightside'></slot>
  </header>
</template>

<script>
import Icon from '../common/Icon'
export default {
  components: {
    Icon
  },
  props: {
    headlogo: {
      type: Boolean,
      default: false
    },
    headback: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    reload () {
      window.location.reload()
    }
  }
}
</script>

<style lang='scss' scoped>
  .head {
    // z-index: 100;
    // position: fixed;
    height: 12.5rem;
    background-color: black;
  }
  .icon {
    width: 2.22rem;
    height: 1.25rem;
  }
</style>
