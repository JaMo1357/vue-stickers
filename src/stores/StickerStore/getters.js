import {
  GET_NEW_STICKER_ID
} from './constants';

export default {
  [GET_NEW_STICKER_ID](state) {
    if(typeof state.stickers !== "undefined"){
      let stickersIDs = Object.keys(state.stickers).map(indexValue => {
        return indexValue;
      });
      return Math.max(...stickersIDs) + 1;
    }else{
      return 0;
    }
  },
};
