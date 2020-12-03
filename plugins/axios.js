export default function({ $axios, error }) {
    $axios.setHeader('Content-Type', 'application/json')

    $axios.onRequest(config => {
        console.log('Making request to ' + config.url)
    })

    $axios.onResponse(response => {
        console.log('onResponse', response.status)
    })

    $axios.onError(err => {
        const code = parseInt(err.response && err.response.status)
        console.log('onError', code)
        // 处理http状态码与自定义错误码
        const errCodeReg = /^[4|5][0-9](?!1)\d/g
        if (errCodeReg.test(code + '')) {
            error({ statusCode: 404, message: 'Post not found' })
        }
        return err.response
    })
}
