<template>
  <div class="progress">
    <div class="progress_container" :style="{ width: width + 'px', height: width + 'px', borderRadius: '50%', backgroundColor: backcolor}">
      <div class="progress_score" v-if="percentage">{{ percentage }}</div>
      <div class="progress_score" v-else>NR</div>
      <svg viewBox="0 0 100 100" class="progress_circle">
        <circle cx="50" cy="50" :r="radius" :stroke="undercolor" :stroke-width="relativeStrokeWidth" fill="none" />
        <circle ref="circle" class="progress_circle_path" cx="50" cy="50" :r="radius" :stroke="strokecolor" :stroke-width="relativeStrokeWidth" stroke-linecap="round" :stroke-dasharray="perimeter" :stroke-dashoffset="offset" fill="none" />
      </svg>
    </div>
  </div>
</template>

<script>
import { autoPlay, Easing, Tween } from 'es6-tween'
export default {
  data () {
    return {
      offset: 2 * Math.PI * (50 - (this.strokeWidth / this.width * 100).toFixed(1) / 2)
    }
  },
  props: {
    width: {
      type: Number,
      default: 100
    },
    strokeWidth: {
      type: Number,
      default: 10
    },
    percentage: {
      type: Number,
      default: 0,
      required: true,
      validator: val => val >= 0 && val <= 100
    },
    backcolor: {
      type: String,
      default: '#081C22'
    }
  },
  computed: {
    relativeStrokeWidth () {
      return (this.strokeWidth / this.width * 100).toFixed(1)
    },
    radius () {
      return 50 - this.relativeStrokeWidth / 2
    },
    perimeter () {
      return 2 * Math.PI * this.radius
    },
    degree () {
      return (1 - this.percentage / 100) * this.perimeter
    },
    strokecolor () {
      switch (true) {
        case this.percentage < 50 : return '#DB2360'
        case this.percentage >= 50 && this.percentage < 70: return '#D2D531'
        case this.perimeter >= 70: return '#21D07A'
      }
    },
    undercolor () {
      switch (true) {
        case this.percentage < 50: return '#571435'
        case this.percentage >= 50 && this.percentage < 70: return '#423D0F'
        case this.perimeter >= 70: return '#204529'
      }
    }
  },
  watch: {
    degree (newValue, oldValue) {
      let vm = this
      autoPlay(true)
      new Tween({ tweenOffset: vm.perimeter })
        .to({ tweenOffset: newValue })
        .easing(Easing.Quadratic.InOut)
        .on('update', ({ tweenOffset }) => {
          vm.offset = tweenOffset
        })
        .start()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  .progress_container {
    padding: 5px;
    position: relative;
    .progress_circle {
      transform: rotate(-90deg);
    }
    .progress_score {
      @include sc(25px, #fff);
      font-weight: bold;
      @include center;
    }
  }
</style>
