<template>
  <div>
    <section>
      <span>Plot Summary</span>
      <p>{{ overview }}</p>
    </section>
    <section>
      <span>Trailers</span>
      <video v-for="item in trailers" :src="item.path" :key="item.id" controls="controls" />
    </section>
    <section>
      <span>Movie Facts</span>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      overview: state => state.detail.moviedetail.overview,
      trailers: state => state.detail.moviedetail.trailers
    })
  }
}
</script>
