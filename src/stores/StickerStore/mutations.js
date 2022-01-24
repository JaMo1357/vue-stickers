import {
  ADD_COMMENT,
  REMOVE_STICKER,
  FINISH_STICKER,
  UPDATE_STICKER,
  SHOW_NOTIFICATION,
  CREATE_STICKER,
  ADD_STICKERS,
  ADD_COMMENTS,
  GET_NEW_STICKER_ID
} from './constants';

import Vue from 'vue';

export default {
  [ADD_STICKERS](state, stickers) {
    Vue.set(state, 'stickers', stickers);
  },
  [ADD_COMMENTS](state, comments) {
    Vue.set(state, 'comments', comments);
  },
  [ADD_COMMENT](state, data) {
    let allCommentIDs = state.stickers[data.stickerID].comments;
    let nextCommentID = (typeof allCommentIDs !== "undefined")? Math.max(...allCommentIDs) + 1 : 0;

    let newComment = {
      "id"  : nextCommentID,
      "name": data.commentData.name,
      "text": data.commentData.text,
    };

    Vue.set(state.comments, nextCommentID, newComment);
    let hasComments = state.stickers[data.stickerID].comments !== undefined;

    if (hasComments) {
      var index = state.stickers[data.stickerID].comments.length;
      Vue.set(state.stickers[data.stickerID].comments, index, nextCommentID);
    } else {
      Vue.set(state.stickers[data.stickerID], 'comments', [nextCommentID]);
    }
  },
  [REMOVE_STICKER](state, stickerID) {
    Vue.delete(state.stickers, stickerID);
  },
  [FINISH_STICKER](state, stickerID) {
    let isFinished = !state.stickers[stickerID].finished;
    Vue.set(state.stickers[stickerID], 'finished', isFinished);
  },
  [UPDATE_STICKER](state, newStickerData) {
    Vue.set(state.stickers[newStickerData.id], 'label', newStickerData.newLabel);
    Vue.set(state.stickers[newStickerData.id], 'description', newStickerData.newDescription);
    Vue.set(state.stickers[newStickerData.id], 'isEditing', false);
  },
  [CREATE_STICKER](state, coords) {
    let nextStickerID = this.getters[GET_NEW_STICKER_ID];
    let newStickerData = {
      id: nextStickerID,
      label: '',
      description: '',
      coords: coords,
      isEditing: true
    };
    Vue.set(state.stickers, nextStickerID, newStickerData);
  },
  [SHOW_NOTIFICATION](state, msg) {
    alert(msg);
  }
};
