<template>
  <div class="box_container">
    <div class="msg_container">
      <span class="msg_title">{{ title }}</span>
      <p class="msg_content">{{ message }}</p>
      <button @click="cancel" class="msg_button_cancel">Cancel</button>
      <button @click="login($route.path)" class="msg_button_login">Login</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    title: {
      type: String,
      default: 'themoviedb.org'
    },
    message: {
      type: String,
      default: 'Please login to themoviedb.org to manage your favorites, watchlists and ratings straight from within the app. It\'s completely free to register.'
    }
  },
  methods: {
    cancel () {
      this.$emit('closeMsg')
    },
    ...mapActions({
      login: 'changeRequestToken'
    })
  }
}
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  .box_container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200;
  }
  .msg_container {
    @include center;
    background-color: rgba(255,255,255,1);
    border-radius: 0.25rem;
  }
</style>
