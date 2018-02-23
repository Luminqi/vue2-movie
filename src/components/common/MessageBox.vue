<template>
  <div class="box_container">
    <div class="msg_container">
      <slot name="title">
        <span class="msg_title">themoviedb.org</span>
      </slot>
      <slot name='content'>
        <p class="msg_content">
          Please login to themoviedb.org to manage your favorites, watchlists and ratings straight from within the app. It's completely free to register.
        </p>
      </slot>
      <slot name='customBtn'>
        <div class="msg_button_container">
          <div @click="cancel" class="msg_button_cancel button">Cancel</div>
          <div @click="login($route.path)" class="msg_button_login button">Login</div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions({
      login: 'changeRequestToken'
    }),
    cancel () {
      this.$emit('closeMsg')
    }
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
    @include wh(11.5385rem, 7.6923rem);
    padding: 20px 20px 0;
    box-sizing: border-box;
    @include center;
    background-color: rgba(255,255,255,1);
    border-radius: 0.25rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .msg_title {
      @include sc(0.7rem, #000);
      font-weight: bold;
    }
    .msg_content {
      @include sc(0.5rem, #000);
      text-align: justify;
    }
    .msg_button_container {
      width: 11.5385rem;
      border-top: 1px solid black;
      display: flex;
      .button {
        font-size: 0.6rem;
        font-weight: bold;
        height: 1.1538rem;
        flex-grow: 1;
        text-align: center;
        line-height: 1.1538rem;
      }
      .msg_button_cancel {
        border-right: 1px solid black;
      }
    }
  }
</style>
