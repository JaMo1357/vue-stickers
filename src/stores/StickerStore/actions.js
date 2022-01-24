import {
  ADD_COMMENT,
  ADD_COMMENTS,
  ADD_STICKERS,
  LOAD_STICKERS,
} from './constants';

import { fetchStickersData } from "@/services/serviceHttp";

export default {
  [LOAD_STICKERS]({commit}) {
    fetchStickersData().then(({ stickers, comments}) => {
      commit(ADD_STICKERS, stickers);
      commit(ADD_COMMENTS, comments);
    });
  },
  [ADD_COMMENT]({ commit }, data) {
    commit(ADD_COMMENT, data);
  },
};
