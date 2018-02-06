<template>
  <section>
    <span>Similar Movies</span>
    <Swipe type="similar"></Swipe>
  </section>
</template>

<script>
import Swipe from '../common/Swipe'
import Progress from '../common/Progress'
export default {
  components: {
    Swipe,
    Progress
  }
}
</script>
