<template>
  <div class="comments">
    <div class="comments__nav-wrapper">
      <span class="comments__nav-wrapper--link">
        <template v-if="commentsIDs.length > 0">
          <span @click="emitExpanded">
            {{ expanded ? hasCommentsText.hide : hasCommentsText.show }}
          </span>
        </template>
        <template v-else>
          <span @click="toggleCommentForm">
            {{ showCommentForm ? 'Hide form ...' : 'Add comment ...' }}
          </span>
        </template>
      </span>
      <span @click="toggleCommentForm"
        v-show="commentsIDs.length > 0"
        title="Add comment"
        class="comments__nav-wrapper--add-comment">
        {{ showCommentForm ? '-' : '+' }}
      </span>
    </div>

    <transition name="expandForm">
      <CommentForm v-show="showCommentForm"
        @toggleCommentForm="toggleCommentForm"
        :isEditing="isEditing"
        :stickerID="stickerID"
      />
    </transition>
    <transition name="expand">
      <div class="comments__wrapper" v-show="expanded">
        <Comment v-for="(commentsID, i) in commentsIDs"
           :key="i" :comment="$store.state.comments[commentsID]"
        />
      </div>
    </transition>

  </div>
</template>

<script>
  import Comment from '../components/Comment';
  import CommentForm from './CommentForm';
  import Vue from 'vue';

  Vue.component('Comment', Comment);
  Vue.component('CommentForm', CommentForm);

  export default {
    components: {
      Comment,
      CommentForm,
    },
    name: 'StickerComments',
    data() {
      return {
        showCommentForm: false,
        showEditedForm: false,
        hasCommentsText:{
          show: 'Show comments',
          hide: 'Hide comments',
        },
      };
    },
    props: {
      stickerID:{
        type: Number,
        required: true
      },
      expanded:{
        type: Boolean,
        required: false,
        default: false,
      },
      isEditing:{
        type: Boolean,
        required: true
      },
      commentsIDs:{
        type: Array,
        required: false,
        default: () => [],
      }
    },
    methods: {
      toggleCommentForm(){
        this.showCommentForm = !this.showCommentForm;
      },
      emitExpanded() {
        this.$emit('expandChanged', !this.expanded);
        this.showCommentForm = false;
      },
    },
  }
</script>

<style lang="scss">

  @import "./../styles/colors";

  .comments{
    padding: 3px;
    background-color: lighten($primary-color, 20%);
    border-top: 1px solid $borders-color;
    display: flex;
    flex-flow: column nowrap;
    &__nav-wrapper{
      padding: 0 4px;
      justify-content: space-between;
      display: inline-flex;
      flex-flow: row nowrap;
      &--link{
        font-size: 12px;
        color: $sticker-show-add-comments;
        text-transform: uppercase;
        cursor: pointer;
        &:hover{
          text-decoration: underline;
        }
      }
      &--add-comment{
        text-align: center;
        border:1px solid $borders-color;
        border-radius: 50%;
        width: 15px;
        height: 15px;
        line-height: 14px;
      }
    }
    .expandForm-enter, .expandForm-leave-to{
      height: 0;
      overflow: hidden;
    }

    .expandForm-enter-to, .expandForm-leave {
      height: auto;
    }

    .expand-enter, .expand-leave-to{
      height: 0;
      overflow: hidden;
    }

    .expand-enter-to, .expand-leave {
      height: auto;
    }

    &__wrapper{
      max-height: 150px;
      overflow-y: scroll;
      background: lighten($primary-color, 30%);
      font-size: 13px;
      cursor: default;
      display: flex;
      flex-direction: column;
    }
  }
</style>
