<template>
  <div class="progress">
    <div class="progress_container" :style="{ width: width + 'px', height: width + 'px', borderRadius: '50%', backgroundColor: backcolor}">
      <div class="progress_score">{{ percentage }}</div>
      <svg viewBox="0 0 100 100" class="progress_circle">
        <circle cx="50" cy="50" :r="radius" stroke="#e5e9f2" :stroke-width="relativeStrokeWidth" fill="none" />
        <circle ref="circle" class="progress_circle_path" cx="50" cy="50" :r="radius" :stroke="strokecolor" :stroke-width="relativeStrokeWidth" stroke-linecap="round" :stroke-dasharray="perimeter" :stroke-dashoffset="degree" fill="none" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      completion: 0
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
      default: ':rgb(3, 1, 14)'
    },
    strokecolor: {
      type: String,
      default: '#13ce66'
    }
  },
  computed: {
    relativeStrokeWidth () {
      return (this.strokeWidth / this.width * 100).toFixed(1)
    },
    radius () {
      // return 50 - this.relativeStrokeWidth
      return 50 - this.relativeStrokeWidth / 2
    },
    perimeter () {
      return 2 * Math.PI * this.radius
    },
    degree () {
      return (1 - this.completion / 100) * this.perimeter
    }
  },
  mounted () {
    this.$nextTick(function () {
      setTimeout(() => { this.completion = this.percentage }, 1000)
    })
  }
}
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  .progress_container {
    position: relative;
    .progress_circle {
      transform: rotate(-90deg);
    }
    .progress_score {
      @include center;
    }
  }
  .progress_circle_path {
    transition: stroke-dashoffset 2s ease;
    -webkit-transition: stroke-dashoffset 2s ease;
    -moz-transition: stroke-dashoffset 2s ease;
    -o-transition: stroke-dashoffset 2s ease;
    -ms-transition: stroke-dashoffset 2s ease;
  }
</style>
