import PageNav from '@/components/PageNav/index.vue'
import Modal from '@/components/Modal/index.vue'
import Alert from '@/components/Alert/index.vue'
import apiList from '@/utils/apiList'

export default {
    name: 'about',
    head(){
        return{
            title: "关于OUDUIDUI",
        }
    },
    components: {
        PageNav, Modal,Alert
    },
    data() {
        return {
            platforms: [
                { label: 'GitHub', icon: '/icon/about/github.svg', url: 'https://github.com/OUDUIDUI' },
                {
                    label: '语雀',
                    icon: '/icon/about/yuque.svg',
                    url: 'https://www.yuque.com/books/share/1e1b68a5-fefd-4647-a3db-8266e73072e6?#'
                },
                { label: '掘金', icon: '/icon/about/juejin.svg', url: 'https://juejin.cn/user/4309700183594366' },
                {
                    label: 'CSDN',
                    icon: '/icon/about/csdn.svg',
                    url: 'https://blog.csdn.net/weixin_43803691?spm=1000.2115.3001.5113'
                },
                { label: '微信公众号', icon: '/icon/about/public.svg', qrCode: '/image/nav/subscription.jpg' },
                { label: '微信小程序', icon: '/icon/about/miniprogram.svg', qrCode: '/image/nav/miniProgram.jpg' },
                { label: 'bilibili', icon: '/icon/about/bilibili.svg', url: 'https://space.bilibili.com/73746699' }
            ],
            stacks: [
                {
                    title: '博客网站',
                    stacks: [
                        { label: 'NuxtJS', icon: '/icon/about/nuxt.svg', url: 'https://www.nuxtjs.cn/' },
                        {
                            label: 'BoostrapVue',
                            icon: '/icon/about/bootstrapVue.svg',
                            url: 'https://bootstrap-vue.org/'
                        },
                        {
                            label: 'Google Analytics',
                            icon: '/icon/about/ga.svg',
                            url: 'https://analytics.google.com/analytics/academy/'
                        }
                    ]
                },
                {
                    title: '微信小程序',
                    stacks: [
                        { label: 'UniApp', icon: '/icon/about/uniapp.png', url: 'https://uniapp.dcloud.io/' },
                        { label: 'Google Analytics', icon: '/icon/about/ga.svg', url: 'https://analytics.google.com/' }
                    ]
                },
                {
                    title: '后端服务器',
                    stacks: [
                        { label: 'NodeJS', icon: '/icon/about/node.svg', url: 'https://nodejs.org/zh-cn/' },
                        { label: 'ExpressJS', icon: '/icon/about/express.svg', url: 'https://expressjs.com/zh-cn/' },
                        { label: 'MongoDB', icon: '/icon/about/mongo.svg', url: 'https://www.mongodb.com/' }
                    ]
                }
            ],

            modelContent: {
                imageUrl: '',
                label: ''
            },

            subscriptionInfo:{
                nickName:'',
                email:'',
            },
            alert: {
                message: '',
                isDanger: false
            },
        }
    },
    methods: {
        openUrl({ label, url, qrCode }) {
            if (url) {
                window.open(url, '_blank')
            } else if (qrCode) {
                this.modelContent = {
                    imageUrl: qrCode,
                    label: label
                }
                this.$refs.WXModal.toggleModal()
            }
        },

        openSubscription(){
            this.$refs.subscriptionModal.toggleModal()
        },

        contactMe() {
            location = 'mailto: oushihao97@163.com'
        },

        async commit(){
            const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/

            if(!this.subscriptionInfo.nickName){
                this.toggleAlert('请填写你的昵称', true)
            }else if (!this.subscriptionInfo.email) {
                this.toggleAlert('请填写你的邮箱', true)
            } else if (!reg.test(this.subscriptionInfo.email)) {
                this.toggleAlert('请输入正确的邮箱', true)
            } else {
                const method = apiList.blog.subscription.method;
                const url = apiList.blog.subscription.url;
                const {data} = await this.$axios[method](url,this.subscriptionInfo);
                if(data.success){
                    this.toggleAlert('订阅成功', false)
                    this.$refs.subscriptionModal.toggleModal()
                    this.subscriptionInfo = {
                        email: '',
                        nickName: ''
                    }
                }else {
                    this.toggleAlert(data.message, true)
                }
            }
        },

        // 提醒窗口
        toggleAlert(message, isDanger = false) {
            this.alert.message = message
            this.alert.isDanger = isDanger
            this.$refs.alert.isShow = true
        }
    }
}
