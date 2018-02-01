<template>
  <div class="detail_people">
    <section>
      <span>Cast</span>
      <Swipe type="cast"></Swipe>
    </section>
    <section>
      <span>Crew</span>
      <Swipe type="crew"></Swipe>
    </section>
  </div>
</template>

<script>
import Swipe from '../common/Swipe'
export default {
  components: {
    Swipe
  }
}
</script>

<style lang="scss" scoped>
</style>
