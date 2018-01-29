<template>
  <footer class="foot">
    <section class="foot_item">
      <router-link to="/" tag="div">
        <Icon name='movie'></Icon>
        <span>Movie</span>
      </router-link>
    </section>
    <section class="foot_item">
      <Icon name='tv'></Icon>
      <span>TV</span>
    </section>
    <section class="foot_item">
      <router-link to="/search" tag="div">
        <Icon name='search'></Icon>
        <span>Search</span>
      </router-link>
    </section>
    <section class="foot_item">
      <Icon name='user'></Icon>
      <span>My TMDb</span>
    </section>
  </footer>
</template>

<script>
import Icon from '../common/Icon'
export default {
  components: {
    Icon
  }
}
</script>

<style lang='scss' scoped>
  @import '../../style/mixin';
  .foot {
    background-color: black;
    position: fixed;
    bottom: 0;
    z-index: 100;
    @include wh(100%, 1.5rem);
    padding: 0.25rem 0 0.1875rem;
    display: flex;
  }
  .foot_item {
    text-align: center;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .icon {
      @include wh(.8rem, .8rem);
      fill: white;
    }
    .icon_user {
      @include wh(0.95rem, 0.95rem);
    }
    span{
      @include sc(.45rem, #666);
    }
  }
</style>
