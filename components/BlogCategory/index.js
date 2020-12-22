import BlogCategory from './index.vue'
import env from '@/utils/env'
import qs from 'qs'

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
            window.open(
                env.WEB_URL + '/blog/detail?' + qs.stringify({blogId: id}),
                '_blank')
        }
    }
}
