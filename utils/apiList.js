const configApi = 'http://localhost:3000/ouduiduiApi';

export default {
  blog:{
    list:{
      methods:'get',
      url: configApi + '/api/v1/blog'
    }
  }
}
