import {v4 as uuidv4} from 'uuid';

// const cid = localStorage.getItem('cid');

export const state = () =>({
  cid: ''
})

export const mutations = {
  getCid(state){
    let uuid = uuidv4();
    localStorage.setItem('cid',uuid);
    state.cid = uuid;
  }
}
