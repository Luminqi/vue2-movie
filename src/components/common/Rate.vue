<template>
  <div class="rate">
    <Icon name="rate-star" v-for="num in max" :key="num" @click.native="setValue(num)" :style="getIconStyle(num)" />
  </div>
</template>

<script>
import Icon from './Icon'
export default {
  data () {
    return {
      currentValue: this.rating
    }
  },
  components: {
    Icon
  },
  props: {
    max: {
      type: Number,
      required: true
    },
    rating: {
      type: Number,
      default: 0
    }
  },
  methods: {
    setValue (num) {
      this.currentValue = num
    },
    getIconStyle (num) {
      return num <= this.currentValue ? { fill: '#FAEF3A' } : { fill: '#AAAAAA' }
    },
    initialValue () {
      this.currentValue = 0
    },
    getCurValue () {
      return this.currentValue
    }
  }
}
</script>

<style lang="scss" scoped>
  .rate {
    display: flex;
    width: 200px;
  }
</style>
