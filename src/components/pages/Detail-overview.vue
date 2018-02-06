<template>
  <div class="overview">
    <section class="overview_summary">
      <span class="title">Plot Summary</span>
      <p class="overview_summary_content">{{ overview }}</p>
    </section>
    <section class="overview_trailers">
      <span class="title">Trailers</span>
      <!-- <Swipe type="trailers"></Swipe> -->
    </section>
    <section class="overview_facts">
      <span class="title">Movie Facts</span>
      <p>Release date: <span class="facts_desc">{{release_date}}</span></p>
      <p>Budget: <span class="facts_desc">${{budget}}</span></p>
      <p>Revenue: <span class="facts_desc">${{revenue}}</span></p>
    </section>
  </div>
</template>

<script>
import Swipe from '../common/Swipe'
import { mapState } from 'vuex'
export default {
  components: {
    Swipe
  },
  computed: {
    ...mapState({
      overview: state => state.detail.moviedetail.overview,
      trailers: state => state.detail.moviedetail.trailers,
      release_date: state => state.detail.moviedetail.release_date,
      budget: state => state.detail.moviedetail.budget,
      revenue: state => state.detail.moviedetail.revenue
    })
  }
}
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
    .title {
      @include sc(0.5rem, #fff);
    }
    section {
      padding: 0.3846rem;
      border-top: 1px solid #5a5656;
    }
    .overview_summary_content {
      @include sc(0.4rem, #fff);
      text-align: justify;
      text-justify: inter-word;
    }
    .overview_facts p {
      @include sc(0.4rem, #fff);
      .facts_desc {
        @include sc(0.3rem, #666);
      }
    }
</style>
