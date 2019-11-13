<template>

  <div class="add-comment" :class="{'shrinked-layout' : !isEditing}">
    
    <input type="text"
           ref="commentName"
           class="comment-name"
           :class="{'error': errors.nameError}"
           placeholder="Type your name...">

    <input type="text"
           ref="commentText"
           class="comment-message"
           :class="{'error': errors.textError}"
           placeholder="Type your message...">

    <button @click="submitComment">{{ isEditing ? 'Add comment' : 'Add' }}</button>

  </div>
</template>

<script>

  import {ADD_COMMENT} from "../stores/StickerStore/constants";

  export default {
    name: 'CommentForm',
    data() {
      return {
        errors: {
          nameError: false,
          textError: false
        }
      }
    },
    props: {
      isEditing: {
        type: Boolean,
        required: true
      },
      stickerID:{
        type: Number,
        required: true
      }
    },
    computed: {},
    methods: {
      submitComment: function(){
        let name = this.$refs.commentName.value;
        let text = this.$refs.commentText.value;
        this.errors.nameError = this.$refs.commentName.value === "";
        this.errors.textError = this.$refs.commentText.value === "";

        if(this.errors.textError || this.errors.nameError){
          return false
        }

        this.errors.nameError = false;
        this.errors.textError = false;
        let commentData = {  "name": name, "text": text };
        this.closeForm();
        this.$store.commit(ADD_COMMENT, {stickerID: this.stickerID, commentData});
      },
      closeForm() {
        this.$emit('toggleCommentForm');
      },
    },
    mounted() {},
  }
</script>

<style lang="scss">

  @import "./../styles/colors";

  .add-comment{
    display: flex;
    flex-flow: row wrap;
    background: $primary-color;

    & * {
      flex: 1 100%;
    }

    &.shrinked-layout{
      .comment-name{
        order: 1;
      }
      .comment-message{
        order: 2;
      }
      button{
        order: 3;
      }
    }

    input{
      margin: 2px;
      background-color: $inputs-background;
      border: none;
      outline: none;
      padding: 4px 3px;
      &.comment-name{
        order: 1;
        flex: 3 auto;
      }
      &.comment-message{
        order: 3;
      }
    }

    button{
      order: 2;
      flex: 1 auto;
      margin: 3px;
      border: none;
      background-color: $add-comment-background;
      color: $save-cancel-color;
      cursor: pointer;
      border-radius: 3px;
      &:hover{
        background-color: lighten($add-comment-background, 10%);
      }
    }

    .error::placeholder{
      color: darken($warning-background, 20%);
    }
  }

</style>
