const configApi = 'https://ouduidui.cn/ouduiduiApi'

export default {
    blog: {
        list: {
            method: 'get',
            url: configApi + '/api/v1/blog'
        },
        category: {
            method: 'get',
            url: configApi + '/api/v1/blog/category'
        },
        detail: {
            method: 'get',
            url: configApi + '/api/v1/blog/{id}'
        },
        like: {
            method: 'put',
            url: configApi + '/api/v1/blog/likes/{id}'
        },
        comment: {
            create: {
                method: 'post',
                url: configApi + '/api/v1/blog/comment'
            },
            list: {
                method: 'get',
                url: configApi + '/api/v1/blog/comment/{id}'
            },
            delete: {
                method: 'delete',
                url: configApi + '/api/v1/blog/comment/{id}'
            }
        },
        subscription:{
            method: 'post',
            url: configApi + '/api/v1/blog/subscription'
        }
    },
    resource:{
        list: {
            method: 'get',
            url: configApi + '/api/v1/resource'
        },
        point:{
            method: 'put',
            url: configApi + '/api/v1/resource/points/{id}'
        }
    }
}
