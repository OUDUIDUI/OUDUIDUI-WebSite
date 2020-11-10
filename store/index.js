import {v4 as uuidv4} from 'uuid';

export const state = () =>({
  cid: '',
  email:'',
  nickName:''
})

export const mutations = {
  getCid(state){
    let uuid = uuidv4();
    localStorage.setItem('cid',uuid);
    state.cid = uuid;
  },

  setUserInfo(state,info){
    localStorage.setItem('email',info.email);
    localStorage.setItem('nickName',info.nickName);
    state.email = info.email;
    state.nickName = info.nickName;
  }
}
