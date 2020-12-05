<template>
    <div class="container">
        <!--  Title  -->
        <h1 class="title user-select-none">{{ blog.title }}</h1>
        <!--  Author  -->
        <div class="author user-select-none">{{ blog.author }}</div>
        <!--  Tag  -->
        <div class="d-flex align-items-center justify-content-center user-select-none"
             v-if="blog.tag.length">
            <div class="tag-title">Tags：</div>
            <div
                class="d-flex align-items-center">
                <div v-for="(tag,index) in blog.tag" :key="index" class="tag"
                     @click="tagBlogList(tag)">
                    {{ tag }}
                </div>
            </div>
        </div>

        <!--  Content  -->
        <div v-html="blogHtml" class="content markdown"></div>

        <!--  Info  -->
        <div class="d-flex align-items-center user-select-none justify-content-end">
            <div class="reading d-flex align-items-center">
                <img src="~/static/icon/blog/eye.svg" alt="reading">
                <div>{{ blog.reading }}</div>
            </div>
            <div class="likes d-flex align-items-center"
                 @click="likes">
                <img src="~/static/icon/blog/like.svg" alt="likes">
                <div>{{ blog.likes.length }}</div>
            </div>
        </div>

        <!--  Comment  -->
        <div class="comments user-select-none">
            <div class="comment-area d-flex">
        <textarea name="comments" placeholder="说点什么叭……"
                  v-model="commentContent"
                  rows="3" autocomplete="off" />
                <button @click="toggleCommentModal">评论</button>
            </div>

            <!--  Comments List  -->
            <div class="comment-list">
                <div v-for="comment in comments" :key="comment._id" class="comment-item">
                    <div class="comment-main">
                        <div class="comment-name">{{ comment.nickName }}：</div>
                        <div class="comment-content">{{ comment.content }}</div>
                        <div class="d-flex justify-content-between">
                            <div class="comment-btn"
                                 @click="toggleDeleteCommentModal(comment._id)">
                                删除
                            </div>
                            <div class="comment-createdAt">{{ comment.createdAt }}</div>
                        </div>
                    </div>
                    <div v-for="reply in comment.replyComments" :key="reply._id"
                         class="reply">
                        <div class="reply-name">{{ reply.nickName }}回复{{ comment.nickName }}：</div>
                        <div class="reply-content">{{ reply.content }}</div>
                        <div class="reply-createdAt">{{ reply.createdAt }}</div>
                    </div>
                </div>
            </div>
        </div>

        <Modal ref="commentModal">
            <div class="check-userinfo">
                <div class="modal-title">个人信息</div>
                <input class="modal-input" type="text"
                       v-model="userInfo.nickName" placeholder="请输入你的昵称">
                <input class="modal-input" type="email"
                       v-model="userInfo.email" placeholder="请输入你的邮箱">
                <button class="modal-btn" @click="commitUserInfo">提交</button>
            </div>
        </Modal>

        <Modal ref="deleteCommentModal">
            <div class="check-userinfo">
                <div class="modal-title">个人信息</div>
                <input class="modal-input" type="email"
                       v-model="deleteCommentInfo.email" placeholder="请输入你评论时留下的邮箱">
                <button class="modal-btn" @click="checkDeleteCommentInfo">提交</button>
            </div>
        </Modal>

        <Alert :message="alert.message" :is-danger="alert.isDanger" ref="alert" />
    </div>
</template>

<script>
import apiList from '@/utils/apiList'
import marked from 'marked'
import hljs from 'highlight.js'
import moment from 'moment'
import Modal from '@/components/Modal/index.vue'
import { mapState } from 'vuex'
import Alert from '@/components/Alert/index.vue'
import qs from 'qs'

export default {
    name: 'detail',
    head(){
        return{
            title: "OUDUIDUI - " + this.blog.title,
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { hid: 'description', name: 'description', content: this.blog.title },
                { name: 'keywords',content:this.keywords}
            ],
            script: [
                {
                    src: 'http://cdn.bootcss.com/highlight.js/8.0/highlight.min.js'
                }
            ],
            link: [
                {
                    rel: 'stylesheet',
                    href: 'http://cdn.bootcss.com/highlight.js/8.0/styles/monokai_sublime.min.css'
                },
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
            ]
        }
    },
    components: {
        Modal, Alert
    },
    async asyncData({ query, $axios, error }) {
        const method = apiList.blog.detail.method
        let url = apiList.blog.detail.url.replace('{id}', query.blogId)
        const { data } = await $axios[method](url)

        if (data.success) {
            const rendererMD = new marked.Renderer()
            marked.setOptions({
                renderer: rendererMD,
                gfm: true,   // 允许github标准的markdown
                tables: true,   // 允许支持表格语法，该选项要求gfm为true
                breaks: true,   // 允许回车换行，该选项要求gfm为true
                pedantic: false,  // 尽可能地兼容 markdown.pl的晦涩部分。不纠正原始模型任何的不良行为和错误。
                sanitize: false,  // 对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
                smartLists: true,  // 使用比原生markdown更时髦的列表。 旧的列表将可能被作为pedantic的处理内容过滤掉.
                smartypants: false  // 使用更为时髦的标点，比如在引用语法中加入破折号。
            })

            // 代码高亮
            marked.setOptions({
                highlight: function(code) {
                    return hljs.highlightAuto(code).value
                }
            })
            let blogHtml = marked(data.blog.content)
            blogHtml = blogHtml.replace(/<br>/g, '</p><p>')

            // 评论时间格式化
            data.comments.forEach(comment => {
                comment.createdAt = moment(comment.createdAt)
                    .format('YYYY-MM-DD HH:mm:ss')
                comment.replyComments.forEach(reply => {
                    reply.createdAt = moment(reply.createdAt)
                        .format('YYYY-MM-DD HH:mm:ss')
                })
            })

            return {
                blogHtml,
                blog: data.blog,
                comments: data.comments
            }
        } else {
            error({ statusCode: 404, message: 'Post not found' })
        }
    },
    computed: {
        ...mapState(['email', 'nickName', 'cid']),
        keywords() {
            let keywords = '';
            this.blog.tag.forEach(key =>{
                keywords += key;
            })
            return keywords
        }
    },
    data() {
        return {
            commentContent: '',
            userInfo: {
                email: '',
                nickName: ''
            },
            alert: {
                message: '',
                isDanger: false
            },

            deleteCommentInfo: {
                id: '',
                email: ''
            }
        }
    },
    mounted() {
        this.userInfo = {
            email: this.email ? this.email : '',
            nickName: this.nickName ? this.nickName : ''
        }
    },
    methods: {
        // 评论
        async comment() {
            const method = apiList.blog.comment.create.method
            let url = apiList.blog.comment.create.url
            const { data } = await this.$axios[method](url, {
                'blogId': this.blog._id,
                'content': this.commentContent,
                'nickName': this.userInfo.nickName,
                'email': this.userInfo.email,
                'cid': this.cid
            })
            if (data.success) {
                console.log('评论成功')
                this.commentContent = ''
                this.toggleAlert('评论成功', false)
                this.getComment()
            } else {
                console.log(data.message)
                this.toggleAlert('评论失败', false)
            }
        },

        // 获取评论列表
        async getComment() {
            const method = apiList.blog.comment.list.method
            let url = apiList.blog.comment.list.url.replace('{id}', this.blog._id)
            const { data } = await this.$axios[method](url)
            if (data.success) {
                // 评论时间格式化
                data.comments.forEach(comment => {
                    comment.createdAt = moment(comment.createdAt)
                        .format('YYYY-MM-DD HH:mm:ss')
                    comment.replyComments.forEach(reply => {
                        reply.createdAt = moment(reply.createdAt)
                            .format('YYYY-MM-DD HH:mm:ss')
                    })
                })

                this.comments = data.comments
            }
        },

        // 打开评论弹窗
        toggleCommentModal() {
            if (!this.commentContent) {
                this.toggleAlert('请输入评论内容', true)
                return
            }
            this.$refs.commentModal.toggleModal()
        },

        // 更新用户信息
        commitUserInfo() {
            const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/

            if (!this.userInfo.email && !this.userInfo.nickName) {
                this.toggleAlert('请完整填写昵称和邮箱', true)
            } else if (!reg.test(this.userInfo.email)) {
                this.toggleAlert('请输入正确的邮箱', true)
            } else {
                this.$refs.commentModal.toggleModal()
                this.$store.commit('setUserInfo', this.userInfo)
                this.comment()
            }
        },

        // 打开删除评论弹窗
        toggleDeleteCommentModal(id) {
            this.deleteCommentInfo.id = id
            // 先用本地存储的用户信息尝试删除
            if (this.email || this.cid) {
                const query = qs.stringify({
                    email: this.email || '',
                    cid: this.cid || ''
                })
                this.deleteComment(id, query, false)
            } else {
                this.$refs.deleteCommentModal.toggleModal()
            }
        },

        checkDeleteCommentInfo() {
            const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/

            if (!this.deleteCommentInfo.email) {
                this.toggleAlert('请填写评论时留下的邮箱', true)
            } else if (!reg.test(this.deleteCommentInfo.email)) {
                this.toggleAlert('请输入正确的邮箱', true)
            } else {
                this.$refs.deleteCommentModal.toggleModal()
                const query = qs.stringify({
                    email: this.deleteCommentInfo.email
                })
                this.deleteComment(this.deleteCommentInfo.id, query, true)
            }
        },

        // 删除评论
        async deleteComment(id, query, isToggleModal) {
            const method = apiList.blog.comment.delete.method

            let url = apiList.blog.comment.delete.url
                .replace('{id}', id) + `?${query}`
            const { data } = await this.$axios[method](url)
            if (data.success) {
                this.toggleAlert('删除成功')
                this.deleteCommentInfo.email = ''
                this.getComment()
            } else {
                if (!isToggleModal) {
                    this.$refs.deleteCommentModal.toggleModal()
                } else {
                    this.toggleAlert('删除失败', true)
                    this.deleteCommentInfo.email = ''
                }
            }
        },

        // 点赞
        async likes() {
            if (!this.cid) {
                this.$store.commit('getCid')
            }

            if (this.blog.likes.includes(this.cid)) {
                this.toggleAlert('你已经点赞过啦，感谢！')
            } else {
                const method = apiList.blog.like.method

                let url = apiList.blog.like.url
                    .replace('{id}', this.blog._id)
                const { data } = await this.$axios[method](url, {
                    cid: this.cid
                })
                if (data.success) {
                    this.toggleAlert('感谢你的点赞！')
                    this.blog.likes.push(this.cid)
                } else {
                    this.toggleAlert(data.message, true)
                }
            }
        },

        // 搜索标签相应的博客
        tagBlogList(tag) {
            this.$router.push({
                path: '/blog',
                query: { keyword: tag }
            })
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
.title {
    font-size: 50px;
    font-weight: 200;
    text-align: center;
    color: var(--color-white) !important;
}

.author {
    font-size: 18px;
    font-weight: 300;
    text-align: center;
    margin-bottom: 10px;
    color: var(--color-white) !important;
}

.tag-title {
    color: var(--color-white) !important;
    font-size: 16px;
    line-height: 25px;
    font-weight: 300;
}

.tag {
    font-weight: 200;
    font-size: 16px;
    border: 1px solid var(--color-white);
    color: var(--color-white) !important;
    line-height: 25px;
    padding: 0 15px;
    border-radius: 13px;
    margin-right: 5px;
    cursor: pointer;
}

.content {
    margin: 50px 0;
}

.reading {
    margin-right: 25px;
}

.reading, .likes {
    color: var(--color-white);
}

.reading img, .likes img {
    width: 22px;
    height: 22px;
    margin-right: 10px;
}

.reading div, .likes div {
    font-size: 20px;
    font-weight: 200;
}

.comments {
    margin-top: 20px;
}

.comment-area {
    border: 1px solid var(--color-white);
}

.comment-area textarea {
    flex: 1;
    font-size: 16px;
    font-weight: 200;
    padding: 10px;
    border: none;
    border-radius: 0;
    resize: none;
}

.comment-area button {
    width: 80px;
    background: var(--color-bg);
    color: var(--color-white);
    border: none;
    border-left: 1px solid var(--color-white);
    font-size: 16px;
    font-weight: 200;
}

.comment-area textarea:focus,
.comment-area button:focus {
    outline: none;
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

.comment-list {
    margin-top: 30px;
    color: var(--color-white);
}

.comment-item {
    border: 1px solid var(--color-white);
    margin-bottom: 10px;
    padding: 15px;
}

.comment-main {
    padding: 0 10px;
}

.comment-name, .reply-name {
    font-size: 16px;
    font-weight: 200;
}

.comment-content, .reply-content {
    padding: 5px 0;
    font-size: 18px;
    font-weight: 200;
    text-indent: 40px;
}

.comment-btn {
    cursor: pointer;
}

.comment-btn, .comment-createdAt {
    padding-top: 10px;
}

.comment-btn, .comment-createdAt, .reply-createdAt {
    text-align: right;
    font-size: 14px;
    font-weight: 100;
}

.reply {
    border-top: 1px solid rgba(255, 255, 255, .8);
    padding: 14px 10px 0;
    margin-top: 14px;
}

@media screen and (max-width: 576px) {
    .title {
        font-size: 30px;
    }

    .author {
        font-weight: 100;
        font-size: 14px;
    }

    .tag-title {
        font-size: 14px;
        line-height: 20px;
    }

    .tag {
        font-size: 12px;
        line-height: 20px;
        padding: 0 10px;
        border-radius: 10px;
    }

    .content {
        margin: 30px 0;
    }

    .reading {
        margin-right: 16px;
    }

    .reading img, .likes img {
        width: 14px;
        height: 14px;
    }

    .reading div, .likes div {
        font-size: 14px;
    }

    .check-userinfo {
        width: 250px;
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

    .comment-area textarea {
        font-size: 14px;
    }

    .comment-area button {
        font-size: 12px;
    }

    .comment-list {
        margin-top: 30px;
    }

    .comment-item {
        border: 1px solid var(--color-white);
        margin-bottom: 10px;
        padding: 15px;
    }

    .comment-name, .reply-name {
        font-size: 14px;
    }

    .comment-content, .reply-content {
        font-size: 14px;
        text-indent: 28px;
    }

    .comment-btn, .comment-createdAt {
        padding-top: 6px;
    }

    .comment-btn, .comment-createdAt, .reply-createdAt {
        font-size: 12px;
        font-weight: 100;
    }

    .reply {
        padding: 10px 10px 0;
        margin-top: 10px;
    }
}

</style>
