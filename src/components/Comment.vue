<template>
  <div class="comment">
    <div class="comment__name">{{ comment.name }} :</div>
    <div class="comment__text">{{ comment.text }}</div>
  </div>
</template>

<script>

  export default {
    name: 'StickerComments',
    data() {
      return {

      }
    },
    props: {
      comment: {
        type: Object,
        required: true
      }
    },
    computed: {},
    methods: {

    },
  }
</script>

<style lang="scss">

  @import "./../styles/colors";

  .comment{
    display: flex;
    justify-content: left;
    flex-flow: column;
    padding: 3px;
    &:nth-child(2n+0) {
      background: lighten($primary-color, 15%);
    }
    &__name{
      font-weight: bold;
      font-size: 12px;
    }
    &__text{

    }
  }

</style>
