<template>
  <div class="sticker"
        :style="{left: sticker.coords.x+'px',
        top: sticker.coords.y+'px', zIndex : sticker.id,
        transform: 'rotate(' + randomTiltDegree + 'deg)' }"
        :class="{'editing-sticker': sticker.isEditing}"
        @dblclick="toggleExpand">

    <div class="sticker__inner-wrapper">

      <div class="sticker__empty-overlay"
          v-show="isEmptySticker && !sticker.isEditing"
          title="Double-tap to add some text in it ...">
        <div class="sticker__empty-overlay--red-text">Empty !</div>
      </div>

      <div class="sticker__inputs-wrapper"
        :style="[sticker.isEditing ? {position: 'relative'} : '']"
        :class="{'pinned': sticker.isEditing === true}" >

        <div class="checkbox-wrapper"
              @click="finishSticker()"
              v-show="!isEmptySticker">
          <label class="checkbox-wrapper__finish-sticker"
                 :for="'checkbox_'+sticker.id">
            <input class="checkbox-wrapper__finish-me"
                   type="checkbox"
                   :id="'checkbox_'+sticker.id"
                   :checked="sticker.finished"/>Finished
          </label>
        </div>
        <button @click="removeSticker(sticker.id)"
                class="sticker__inputs-wrapper remove-sticker-button"
                title="Remove this sticker">x
        </button>

      </div>

      <div class="sticker__content-wrapper"
           :class="{finished : sticker.finished && !sticker.isEditing}"
            title="Double click to edit">

        <h3 class="sticker__content-wrapper--heading-text" v-show="!sticker.isEditing">{{ sticker.label }}</h3>
        <input  placeholder="Add sticker label.."
                :class="{'error': errors.labelError}"
                v-show="sticker.isEditing"
                ref="label"
                class="sticker__content-wrapper--input label-input"
                type="text"
                v-model="inputValues.label"
                maxlength="30">

        <p class="sticker__content-wrapper--sticker-paragraph" v-show="!sticker.isEditing">{{ sticker.description }}</p>
        <textarea placeholder="Add description text.."
                  :class="{'error': errors.descriptionError}"
                  v-show="sticker.isEditing"
                  ref="description"
                  class="sticker__content-wrapper--input description-input"
                  maxlength="300"
                  v-model="inputValues.description">
        </textarea>
      </div>

      <StickerComments
        @expandChanged="changeExpanded"
        :expanded="expanded"
        :isEditing="sticker.isEditing"
        :stickerID="sticker.id"
        :commentsIDs="sticker.comments"/>

      <div class="sticker__inner-wrapper--button-wrapper"
           v-show="sticker.isEditing">
        <button
          @click="updateSticker"
          class="sticker__inner-wrapper--button-wrapper save">
          Save
        </button>
        <button
          @click="cancelStickerEditMode(sticker.id)"
          class="sticker__inner-wrapper--button-wrapper cancel">Close without saving
        </button>
      </div>

    </div>
  </div>
</template>

<script>
  import {
    FINISH_STICKER,
    REMOVE_STICKER,
    UPDATE_STICKER,
  } from '@/stores/StickerStore/constants';

  import StickerComments from '../components/StickerComments';

  import Vue from 'vue';

  Vue.component('StickerComments', StickerComments);

  export default {
    components: {StickerComments},
    data() {
      return {
        //dragging: false,
        overlap: {
          x: 0, y: 0
        },
        errors: {
          labelError: false,
          descriptionError: false,
        },
        expanded: false,
        inputValues: {
          label: this.sticker.label,
          description: this.sticker.description,
        }
      }
    },
    props: {
      sticker: {
        type: Object,
        required: true
      }
    },
    computed: {
      randomTiltDegree() {
        let num = Math.floor(Math.random()*3) + 1; // this will get a number between 1 and 99;
        num *= Math.floor(Math.random()*2) === 1 ? 1 : -1; // this will add minus sign in 50% of cases
        return num;
      },
      isEmptySticker() {
        return this.sticker.label === "" && this.sticker.description === "";
      }
    },
    methods: {
      changeExpanded(value) {
        this.expanded = value;
      },
      toggleExpand() {
        this.sticker.isEditing = !this.sticker.isEditing;
      },
      finishSticker() {
        this.$store.commit(FINISH_STICKER, this.sticker.id);
      },
      removeSticker() {
        this.$store.commit(REMOVE_STICKER, this.sticker.id)
      },
      updateSticker() {

        let labelVal = this.$refs.label.value;
        let descriptionVal = this.$refs.description.value;
        this.errors.labelError = (labelVal.length === 0);
        this.errors.descriptionError = (descriptionVal.length === 0);

        if(this.errors.labelError || this.errors.descriptionError){
          return false;
        }

        let newStickerData = {
          id: this.sticker.id,
          newLabel: labelVal,
          newDescription: descriptionVal,
        };

        this.cancelStickerEditMode();
        this.$store.commit(UPDATE_STICKER, newStickerData);

      },
      cancelStickerEditMode(){
        this.expanded = false;
        this.sticker.isEditing = false;
      },
    },
  }
</script>


<style lang="scss">

  @import url('https://fonts.googleapis.com/css?family=Indie+Flower&display=swap');

  @import "../styles/colors";


  .sticker {
    width: 200px;
    list-style-type: none;
    position: absolute;
    font-family: 'Indie Flower', cursive;
    animation-name: expand-editing;
    transition: 0.3s;
    transform-origin: top;
    &:hover{
      z-index: 1001 !important;
    }

    &.editing-sticker {
      transform: rotate(0deg) !important;
      height: 400px;
      width: 400px;
      z-index: 1000 !important;
      position: relative;
      margin: 0 auto;
      left: 0 !important;
      top: 0 !important;

      .sticker__content-wrapper{
        align-items: center;
      }
    }

    &__empty-overlay{
      pointer-events: none;
      height: 100%;
      width: 100%;
      background: $primary-color;
      position: absolute;
      &--red-text{
        color:darken($warning-background, 20%);
        transform: rotate(-7deg);
        font-size: 33px;
        overflow: hidden;
        text-align: center;
      }
    }

    &__inner-wrapper {
      border:1px solid lighten($secondary-color, 80%);
      position: relative;
      cursor: pointer;
      color: $secondary-color;
      margin: 3px;
      background-color: $primary-color;
      border-radius: 2px;
      display: flex;
      flex-flow: column nowrap;
      align-items: stretch;
      &:hover {
        border:1px solid $borders-color;
        z-index: 999;
        .sticker__inputs-wrapper {
          display: inline-flex;

        }
      }

      .pinned{
        display: flex!important;
      }

      h3 {
        margin: 0;
        padding: 7px;
        font-size: 15px;
        border-bottom: 1px solid $borders-color;
        font-weight: bold;
        background-color: lighten($primary-color, 20%);
      }

      &--button-wrapper{
        display: flex;
        flex-flow: row;
        justify-content: center;
        button{
          cursor: pointer;
          border: none;
          width: 50%;
          text-align: center;
          margin: 1px;
          border-radius: 2px;
          padding: 4px 0;
          &.save{
            background: $save-background;
            color:$save-cancel-color;
            flex: 34;
            &:hover{
              background: darken($save-background, 10%);
            }
          }
          &.cancel{
            background:$cancel-background;
            color: $save-cancel-color;
            flex: 21;
            &:hover{
              background: darken($cancel-background, 10%);
            }
          }
        }
      }
    }

    &__inputs-wrapper {
      display: none;
      justify-content: space-between;
      align-items: stretch;
      position: absolute;
      width: 100%;
      z-index: 999;
      height: 19px;
      .checkbox-wrapper {
        display: inline-flex;
        cursor: pointer;
        height: 20px;
        align-items: flex-start;

        &__finish-sticker {
          height: 19px;
          cursor: crosshair;
          text-align: right;
          margin: 0;
          background: $finish-sticker-label-background;
          padding-right: 5px;
          width: 81px;
          pointer-events: none;
        }

        &__finish-me {
          left: 0;
          position: absolute;
          outline: none;
          z-index: 99;
          cursor: cell;
          pointer-events: none;
        }
      }

      &.remove-sticker-button {
        padding: 0 6px;
        font-size: 17px;
        border: none;
        position: absolute;
        width: 20px;
        right: 0px;
        margin: 0px;
        z-index: 98;
        cursor: pointer;
        border-radius: 2px;
        transition: 0.3s;
        background: darken($warning-background, 10%);
        color: lighten($warning-color, 100%);
        &:hover {
          background: $warning-background;
          color: $warning-color;
        }
      }
    }
    &__content-wrapper{
      text-align: center;
      display: flex;
      align-items: stretch;
      flex-direction: column;
      align-content: center;
      flex-flow: column;
      justify-content: center;
      &.edited{
        align-items: stretch;
      }
      &.finished {
        opacity: 0.3;
        .sticker__content-wrapper--heading-text{
          text-decoration: line-through;
        }
        .sticker__content-wrapper--sticker-paragraph{
          text-decoration: line-through;
        }
      }
      &--sticker-paragraph{
        font-size: 13px;
        padding: 0px;
        margin: 8px 0px;
      }
      &--input{
        width:98%;
        background-color: lighten($primary-color, 20%);
        border:none;
        outline:none;
        &.error::placeholder{
          color: darken($warning-background, 20%);
        }
        &.label-input{
          width: 97%;
          padding: 3px;
          margin: 3px 0;
          font-family: unset;
          font-weight: bold;
          text-align: center;
        }
      }
    }
    .description-input{
      height: 96px;
      resize: vertical;
      font-family: unset;
    }
  }
</style>
