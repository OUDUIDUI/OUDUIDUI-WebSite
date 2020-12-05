<template>
    <div class="container">
        <!--   导航   -->
        <PageNav @search="search"
                 @checkoutNav="checkoutNav"
                 @closeSearch="initList"
                 ref="blogNav"
                 :navs="navs" :need-search="true" />

        <!--   博客列表   -->
        <div v-if="showNavIndex === 0">
            <WFList :list="blogs" :type="0" />
        </div>

        <div v-if="showNavIndex === 1" class="category">
            <blog-category :category="category.category" />
        </div>

        <div class="tips" v-if="tip">{{ tip }}</div>

        <!--   页码   -->
        <Pagination
            @togglePage="togglePage"
            :pagination="pagination" v-if="pagination.pages > 1" />
    </div>
</template>

<script>
import PageNav from '@/components/PageNav/index.vue'
import WFList from '@/components/WFList/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import BlogCategory from '@/components/BlogCategory/index.vue'
import apiList from '@/utils/apiList'
import qs from 'qs'
import moment from 'moment'

export default {
    name: 'blog',
    head(){
        return{
            title: "博客",
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
            ]
        }
    },
    components: {
        PageNav, WFList, Pagination, BlogCategory
    },
    data() {
        return {
            navs: [
                { id: 0, label: '全部' },
                { id: 1, label: '目录' }
            ],
            showNavIndex: 0,
            category: {},

            tip: ''
        }
    },
    async asyncData({ query, $axios, error }) {
        if (!query) {
            query = { limit: 10, sort: 'updatedAt' }
        } else {
            const keyword = query.keyword
            query = { limit: 10, sort: 'updatedAt', keyword }
        }

        const method = apiList.blog.list.method
        let url = apiList.blog.list.url + '?' + qs.stringify(query)
        const { data } = await $axios[method](url)

        if (data.success) {
            return {
                query,
                pagination: data.pagination,
                blogs: data.data
            }
        } else {
            error({ statusCode: 404, message: 'Post not found' })
        }
    },
    async mounted() {
        if (!this.blogs.length) {
            this.tip = '暂无内容'
        } else {
            this.tip = ''
        }

        this.category = await this.getCategoryList()
    },
    methods: {
        async getAllData() {
            this.query.limit = 10
            this.query.sort = 'updatedAt'
            const method = apiList.blog.list.method
            let url = apiList.blog.list.url + '?' + qs.stringify(this.query)
            const { data } = await this.$axios[method](url)

            if (data.success) {
                this.blogs = data.data
                this.pagination = data.pagination

                if (!this.blogs.length && this.query.keyword) {
                    this.tip = '暂无搜索结果'
                } else if (!this.blogs.length && !this.query.keyword) {
                    this.tip = '暂无内容'
                } else {
                    this.tip = ''
                }
            }
        },
        // 翻页
        async togglePage(page) {
            this.query = { page }
            await this.getAllData()
        },

        // 搜索
        async search(keyword) {
            this.$router.push({
                path: '/blog', query: {
                    keyword
                }
            })
            this.query = { keyword }
            await this.getAllData()
            this.$refs.blogNav.checkoutNav(0)
        },

        // 初始化数据
        async initList() {
            this.query = {}
            await this.getAllData()
        },

        // 切换类型
        checkoutNav(nav) {
            this.showNavIndex = nav.id
            this.query = {}
            if (this.$route.query.keyword) {
                this.$router.push('/blog')
                this.getAllData()
            }
            if (this.showNavIndex === 1) {
                if (!this.category.category.length) {
                    this.tip = '暂无内容'
                } else {
                    this.tip = ''
                }
            }
        },

        // 获取分类目录
        async getCategoryList() {
            const method = apiList.blog.category.method
            let url = apiList.blog.category.url
            const { data } = await this.$axios[method](url)

            if (data.success) {
                this.formatCategory(data.category)
                return { category: data.category, articles: data.articles }
            }
        },

        // 处理分类目录数据
        formatCategory(category) {
            category.forEach(item => {
                item.isDown = true
                if (item.updatedAt) {
                    item.updatedAt = moment(item.updatedAt).format('YYYY-MM-DD')
                }
                if (item.children) {
                    this.formatCategory(item.children)
                }
            })
        }
    }
}

</script>

<style scoped>
.tips {
    color: var(--color-white) !important;
    font-size: 14px;
    font-weight: 200;
    text-align: center;
}

.category {
    padding: 30px;
}

@media screen and (max-width: 768px) {
    .category {
        padding: 20px;
    }
}

</style>
