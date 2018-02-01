<template>
  <section>
    <span>Similar Movies</span>
    <Progress :percentage="30" :width='50' :stroke-width="10"/>
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
