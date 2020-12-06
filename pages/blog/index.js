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
            title: "博客"
        }
    },
    components: {
        PageNav, WFList, Pagination, BlogCategory
    },
    data() {
        return {
            query:{},
            navs: [
                { id: 0, label: '全部' },
                { id: 1, label: '目录' }
            ],
            blogs:[],
            pagination: {},

            showNavIndex: 0,
            category: {},

            tip: ''
        }
    },
    async mounted() {
        await this.initList();
        this.category = await this.getCategoryList()
    },
    methods: {
        async initList(){
            this.query = this.$route.query || {};
            await this.getAllData();
        },

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

        // 切换类型
        checkoutNav(index) {
            const nav = this.navs[index];
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
