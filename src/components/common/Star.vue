<template>
  <div class="star">
    <section class="star_container">
      <Icon name="star" v-for="num in 5" :key="num" class="grey_fill"></Icon>
    </section>
    <div :style="'width:' + rating/5 + 'rem'" class="star_cover">
      <section class="star_container" >
        <Icon name="star" v-for="num in 5" :key="num" class="orange_fill"></Icon>
      </section>
    </div>
  </div>
</template>

<script>
import Icon from './Icon'
export default {
  props: {
    rating: {
      type: Number,
      required: true
    }
  },
  // props: ['rating'],
  components: {
    Icon
  }
}
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  .star{
    position: relative;
    // top: .2rem;
    @include wh(2rem, .4rem);
    .star_cover{
      overflow: hidden;
      position: relative;
      height: 100%;
    }
    .star_container{
      position: absolute;
      display: flex;
      width: 2rem;
      height: 0.4rem;
      top: 0;
      left: 0;
        .grey_fill{
          fill: #d1d1d1;
        }
        .orange_fill{
          fill: #ff9a0d;
        }
      }
  }
</style>
