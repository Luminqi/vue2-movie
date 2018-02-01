<template>
  <header class="head">
    <Icon name='logo' v-if="headlogo" @click.native="reload"></Icon>
    <Icon name='goback' v-if="headback" @click.native="$router.go(-1)"></Icon>
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
 @import '../../style/mixin';
  .head {
    position: fixed;
    top: 0;
    z-index: 100;
    @include wh(100%, 1.5rem);
    background-color: rgba(0, 0, 0, 0.8);
    -webkit-backdrop-filter: blur(15px);
    backdrop-filter: blur(15px);
  }
  .icon {
    @include wh(2.22rem, 1.25rem);
  }
  .icon_goback {
    fill: white;
  }
</style>
