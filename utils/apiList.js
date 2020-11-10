const configApi = 'http://localhost:3000/ouduiduiApi';

export default {
  blog:{
    list:{
      method:'get',
      url: configApi + '/api/v1/blog'
    },
    category:{
      method: 'get',
      url: configApi + '/api/v1/blog/category/{id}'
    },
    detail:{
      method:'get',
      url: configApi + '/api/v1/blog/{id}'
    },
    comment:{
      create:{
        method:'post',
        url: configApi + '/api/v1/blog/comment'
      },
      list:{
        method:'get',
        url:configApi + '/api/v1/blog/comment/{id}'
      },
      delete:{
        method:'delete',
        url:configApi + '/api/v1/blog/comment/{id}'
      }
    }
  }
}
