<template>
  <div class="people">
    <Head :headback="true" :load="loading"></Head>
    <section class="people_brief">
      <img :src="people.profile" v-if="people.profile" class="people_profile" />
      <div class="default_pic_container" v-else>
        <Icon name="picture" class="default_pic"></Icon>
      </div>
      <div class="info_container">
        <span class="people_name">{{people.name}}</span>
        <span class="people_birth">{{people.birth}}</span>
        <span class="people_place">{{people.place}}</span>
      </div>
    </section>
    <section class="people_biography">
      <p class="biography_title">Biography</p>
      <p class="biography_content">{{people.biography}}</p>
    </section>
    <section class="people_knownfor">
      <p class="knownfor_title">Known For</p>
      <p class="people_cast" v-if="people.knownforcast.length">Cast</p>
      <Swipe type="knownforcast"></Swipe>
      <p class="people_crew" v-if="people.knownforcrew.length">Crew</p>
      <Swipe type="knownforcrew"></Swipe>
    </section>
    <Foot></Foot>
  </div>
</template>

<script>
import Head from '../header/Head'
import Foot from '../footer/Foot'
import Icon from '../common/Icon'
import Swipe from '../common/Swipe'
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      loading: false
    }
  },
  computed: {
    ...mapState({
      people: state => state.people.peopledetail
    })
  },
  components: {
    Head,
    Foot,
    Icon,
    Swipe
  },
  methods: {
    ...mapActions([
      'getPeopleInfo'
    ])
  },
  created () {
    this.loading = true
    this.getPeopleInfo(this.$route.params.id).then(() => {
      this.loading = false
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
.people {
  color: white;
  background-color: rgb(12, 12, 12);
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  .people_brief{
    padding: 1.1538rem 0.7692rem 2.3077rem;
    display: flex;
    .people_profile, .default_pic_container {
      @include wh(3.4615rem, 5.1923rem);
    }
    .default_pic_container {
      position: relative;
      background-color: #443d3d;
    }
    .default_pic {
      @include wh(1rem, 1rem);
      @include center;
      fill: rgb(170, 170, 170);
    }
    .info_container {
      margin-left: 1.5rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .people_name {
        @include sc(0.6rem, #fff);
      }
      .people_birth {
        @include sc(0.3rem, #666);
      }
      .people_place {
        @include sc(0.3rem, #666);
      }
    }
  }
  .people_biography {
    padding: 0.3846rem;
    border-top: 1px solid #5a5656;
    .biography_title {
      @include sc(0.6rem, #fff);
    }
    .biography_content {
      @include sc(0.4rem, #fff);
      text-align: justify;
      text-justify: inter-word;
    }
  }
  .people_knownfor {
    padding: 0.3846rem;
    border-top: 1px solid #5a5656;
    .knownfor_title {
      @include sc(0.6rem, #fff);
    }
    .people_cast, .people_crew {
      @include sc(0.4rem, #fff);
    }
  }
}
</style>
