<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">About</router-link>
      |
      <router-link to="/dashboard">Dashboard</router-link>

    </div>
    <router-view/>
  </div>
</template>

<script>
  import {LOAD_STICKERS} from "./stores/StickerStore/constants";

  export default {
    name: 'App',
    computed: {},
    methods: {},

    mounted() {
      this.$store.dispatch(LOAD_STICKERS);
    }
  }
</script>

<style lang="scss">

  @import "./styles/colors";


  html, body {
    background-color: $secondary-color;
    margin: 0 auto;

    #app {

      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      color: $secondary-color;

      display: flex;
      justify-content: stretch;
      align-content: stretch;
      flex-direction: column;
      align-items: stretch;

      flex-flow: column;
      height: 100%;
    }

    #nav {
      height: 78px;
      flex: 0 1 auto;
      display: flex;
      align-items: center;
      align-content: center;
      color: $link-color;
      background: $primary-color;
      justify-content: center;
      a {
        font-weight: bold;
        color: $cancel-background;
        padding: 6px;
        &.router-link-exact-active {
          color: $link-color;
          border-color: $primary-color !important;
        }

      }
    }
  }
</style>
