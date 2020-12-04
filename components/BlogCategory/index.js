import BlogCategory from './index.vue'

export default {
    name: 'BlogCategory',
    props: {
        category: {
            type: Array,
            default: []
        }
    },
    components: { BlogCategory },
    methods: {
        downList(node) {
            node.isDown = !node.isDown
        },
        toBlogDetail(id) {
            this.$router.push({
                path: '/blog/test',
                query: {
                    blogId: id
                }
            })
        }
    }
}
