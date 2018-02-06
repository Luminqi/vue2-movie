<template>
  <header class="head">
    <Icon name='logo' v-if="headlogo" @click.native="reload"></Icon>
    <Icon name='goback' v-if="headback" @click.native="goback"></Icon>
    <slot name='title'></slot>
    <slot name='rightside'></slot>
  </header>
</template>

<script>
import Icon from '../common/Icon'
import { CHANGE_START_PATH } from '../../store/mutation-Types'
import { mapState, mapMutations } from 'vuex'
export default {
  components: {
    Icon
  },
  computed: {
    ...mapState({
      startPath: state => state.account.startpath
    })
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
    ...mapMutations({
      changeStartPath: CHANGE_START_PATH
    }),
    reload () {
      window.location.reload()
    },
    goback () {
      if (this.startPath) {
        this.$router.push(this.startPath)
        this.changeStartPath({ startpath: '' })
      } else {
        this.$router.go(-1)
      }
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
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    @include wh(2.5rem, 1.3rem);
  }
  .icon_goback {
    fill: white;
    @include wh(1rem, 1rem);
  }
</style>
