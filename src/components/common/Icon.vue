<template>
  <svg class="icon" :class="iconclass">
    <use :xlink:href="'#' + name"></use>
  </svg>
</template>

<script>
export default {
  data () {
    return {
      iconclass: 'icon_' + this.name
    }
  },
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>
