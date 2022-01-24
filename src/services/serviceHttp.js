
import axios from 'axios';
import { normalize, schema } from 'normalizr';


export function fetchStickersData() {

  return axios.get('http://localhost:3000/stickers')
    .then(response => {
      let normalized = normalizeStickersData(response.data);
      return normalized.entities;
    })
    .catch(error => {
      alert('Server unreachable, please try again later...');
      throw error;
    });

}

export function normalizeStickersData(stickersData) {


  const commentSchema = new schema.Entity('comments');

  const sticker = new schema.Entity('stickers', {
    comments: [commentSchema]
  });

  const normalizedData = normalize(stickersData, [sticker]);

  return normalizedData;
}
