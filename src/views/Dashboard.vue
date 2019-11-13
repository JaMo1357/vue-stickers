<template>
  <div class="dashboard" 
    @contextmenu.prevent.self="showContextMenu($event)"
    @click="hideContextMenu">

    <ul class="dashboard--context-menu"
        v-show="contextMenu.show"
        :style="{left: contextMenu.coords.x+'px', top: contextMenu.coords.y+'px'}">
      <li class="dashboard--context-menu__create-sticker-item" @click="createNewEmptySticker()">Create sticker +</li>
    </ul>

    <Sticker v-for="sticker in stickers"
             :key="sticker.id"
             :sticker="sticker"/>
  </div>
</template>

<script>

  import Vue from 'vue'
  import {mapState} from 'vuex'
  import Sticker from '../components/Sticker'

  import {CREATE_STICKER} from "../stores/StickerStore/constants";

  Vue.component('Sticker', Sticker);

  export default {
    name: 'Dashboard',
    data() {
      return {
        contextMenu:{
          show: false,
          coords: {
            x: 0, y: 0
          }
        }
      }
    },
    computed: {
      ...mapState(['stickers'])
    },
    methods: {
      showContextMenu(e) {
        this.contextMenu.coords.x = e.clientX;
        this.contextMenu.coords.y = e.clientY - 79;
        this.contextMenu.show = true;
      },
      hideContextMenu(){
        this.contextMenu.show = false;
      },
      createNewEmptySticker(){
        let x = this.contextMenu.coords.x;
        let y = this.contextMenu.coords.y;
        this.contextMenu.show = false;
        this.$store.commit(CREATE_STICKER, {x, y});
      }
    },
  }
</script>

<style lang="scss">

  @import "./../styles/colors";

  .dashboard {
    position: relative;
    min-height: 800px;
    padding: 0;
    margin: 0;
    flex: 1 1 auto;
    background: url('./../assets/bg.png');
    &--context-menu{
      z-index: 999;
      position:absolute;
      display:inline-block;
      padding: 0;

      margin: 0;
      list-style-type: none;


      &__create-sticker-item{
        cursor:pointer;
        background-color: $primary-color;
        border: 3px solid $primary-color;
        padding: 2px 6px;
        border-radius: 3px;
        transition: 2s;
        &:hover{
          color: $context-btn-hover;      
        }
      }
    }
  }

</style>
