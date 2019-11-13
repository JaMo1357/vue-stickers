import {
  ADD_COMMENTS,
  ADD_STICKERS,
  LOAD_STICKERS,
} from './constants';

import {fetchStickersData} from "./../../services/serviceHttp";


export default {

  [LOAD_STICKERS]({commit}) {
    fetchStickersData().then(normalized => {
      commit(ADD_STICKERS, normalized.stickers );
      commit(ADD_COMMENTS, normalized.comments );
    });
  }

};
