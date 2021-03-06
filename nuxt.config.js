export default {
    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: 'OUDUIDUI',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'May You Live The Way You Want' },
            { name: 'keywords',content:'OUDUIDUI 欧怼怼 博客 个人网站 前端 程序员 IT 设计 UI'}
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: [
        '@/assets/markdown.css'
    ],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [
        '@/plugins/axios',
        { src: '~/plugins/vuex-persist', ssr: false },
        '~/plugins/gtm'
    ],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        // https://go.nuxtjs.dev/bootstrap
        'bootstrap-vue/nuxt',
        '@nuxtjs/axios',
        '@nuxtjs/proxy',
        '@nuxtjs/gtm'
    ],

    gtm: {
        enabled: true,
        debug: false,

        pageTracking: true,
        pageViewEventName: 'nuxtRoute',

        autoInit: true,
        respectDoNotTrack: true
    },

    axios: {
        proxy: true,
        prefix: '/ouduiduiApi', // baseURL
        credentials: true
    },

    proxy: {
        '/ouduiduiApi': {
            target: 'http://127.0.0.1:5000',
            pathRewrite: {
                '^/ouduiduiApi': '/'
            }
        }
    },

    env: {
        PATH_TYPE: process.env.PATH_TYPE
    },

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {}
}
