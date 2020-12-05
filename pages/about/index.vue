<template>
    <div class="container main user-select-none">
        <!--    About    -->
        <div class="about">
            <!--    Platform    -->
            <div class="platform">
                <div class="title">平台</div>
                <div class="content">
                    <div v-for="(platform,index) in platforms" :key="index"
                         class="item d-flex mr-5 mt-3 mb-3"
                         @click="openUrl(platform)">
                        <img :src="platform.icon" :alt="platform.label">
                        <span class="pl-3">{{ platform.label }}</span>
                    </div>
                </div>
            </div>

            <!--    Technology stack    -->
            <div class="stack">
                <div class="title">技术栈</div>
                <div class="content">
                    <div v-for="stack in stacks" :key="stack.title">
                        <div class="stack-title">{{ stack.title }}：</div>
                        <div v-for="item in stack.stacks"
                             class="item d-flex mr-5 mt-3 mb-3"
                             @click="openUrl(item)">
                            <img :src="item.icon" :alt="item.label">
                            <span class="pl-3">{{ item.label }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!--    Contact    -->
            <div class="contact">
                <div class="title">联系我</div>
                <div class="content" @click="contactMe">oushihao97@163.com</div>
            </div>

            <!--    Subscription    -->
            <div class="subscription">
                <div class="title">订阅</div>
                <div class="content">
                    <div class="btn" @click="openSubscription">当有新的博客时请通知我</div>
                </div>
            </div>
        </div>

        <Modal ref="WXModal">
            <div class="d-flex flex-column align-items-center justify-content-center">
                <img :src="modelContent.imageUrl"
                     class="qr-code"
                     :alt="modelContent.label">
                <div class="modal-text">扫描关注{{ modelContent.label }}</div>
            </div>
        </Modal>

        <Modal ref="subscriptionModal">
            <div class="check-userinfo">
                <div class="modal-title">个人信息</div>
                <input class="modal-input" type="text"
                       v-model="subscriptionInfo.nickName"
                       placeholder="请输入你的昵称">
                <input class="modal-input" type="email"
                       v-model="subscriptionInfo.email"
                        placeholder="请输入你的邮箱">
                <button class="modal-btn" @click="commit">提交</button>
            </div>
        </Modal>

        <Alert :message="alert.message" :is-danger="alert.isDanger" ref="alert" />
    </div>
</template>

<script>
import PageNav from '@/components/PageNav/index.vue'
import Modal from '@/components/Modal/index.vue'
import qs from 'qs'
import Alert from '@/components/Alert/index.vue'
import apiList from '@/utils/apiList'

export default {
    name: 'about',
    head(){
        return{
            title: "关于OUDUIDUI",
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
            ]
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

</script>

<style scoped>
.main {
    padding-left: 30px;
    padding-right: 30px;
    color: var(--color-white) !important;
}

.platform, .stack, .contact {
    margin-bottom: 30px;
    clear: both;
}

.title {
    font-size: 24px;
    padding-bottom: 18px;
}

.content {
    font-size: 20px;
    font-weight: 200;
}

.platform .content .item, .stack .content .item {
    display: inline-block !important;
    cursor: pointer;
}

.platform .content .item img, .stack .content .item img {
    display: inline-block !important;
    width: auto;
    height: 35px;
}

.stack .content .stack-title {
    font-weight: 200;
    display: inline-block !important;
}

.stack .content .stack-main {
    margin-left: 2em;
    display: inline-block !important;
}

.contact .content {
    cursor: pointer;
}

.qr-code {
    width: 250px;
}

.subscription .btn{
    font-size: 20px;
    font-weight: 200;
    color: var(--color-white);
    background: var(--color-bg);
    border: 1px solid var(--color-white);
    border-radius: 0;
    padding: 8px 25px;
}

.subscription .btn:hover{
    box-shadow: var(--color-shadow);
}

.modal-text {
    padding-top: 10px;
    color: var(--color-white);
    font-size: 21px;
    font-weight: 200;
}

.check-userinfo {
    width: 300px;
}

.modal-title {
    color: var(--color-white);
    font-size: 20px;
    text-align: center;
    margin-bottom: 30px;
}

.modal-input {
    width: 100%;
    font-size: 18px;
    font-weight: 200;
    margin-bottom: 20px;
    padding: 5px;
}

.modal-btn {
    width: 100%;
    font-size: 16px;
    background: var(--color-bg);
    color: var(--color-white);
    border: 1px solid var(--color-white);
    padding: 10px;
}

@media screen and (max-width: 576px) {
    .main {
        padding-left: 20px;
        padding-right: 20px;
    }

    .platform, .stack {
        margin-bottom: 18px;
        clear: both;
    }

    .title {
        font-size: 18px;
        padding-bottom: 10px;
    }

    .stack .content .stack-title {
        display: block !important;
        margin-top: 10px;
    }

    .content {
        font-size: 14px;
    }

    .platform .content .item img, .stack .content .item img {
        display: inline-block !important;
        width: auto;
        height: 25px;
    }

    .subscription .btn{
        font-size: 14px;
        padding: 4px 14px;
    }

    .qr-code {
        width: 150px;
    }

    .modal-text {
        font-size: 14px;
        font-weight: 200;
    }

    .check-userinfo {
        width: 220px;
    }

    .modal-title {
        font-size: 20px;
    }

    .modal-input {
        font-size: 16px;
    }

    .modal-btn {
        font-size: 14px;
        padding: 8px;
    }
}

</style>
