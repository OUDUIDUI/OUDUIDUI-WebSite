import moment from 'moment'
import env from '@/utils/env'
import qs from 'qs'

export default {
    name: 'index',
    props: {
        blog: {
            type: Object,
            required: true
        }
    },
    computed: {
        updatedAt() {
            const dataNow = new Date()
            const updatedAt = new Date(this.blog.updatedAt)
            const timeDifference = dataNow.getTime() - updatedAt.getTime()
            const days = timeDifference / (24 * 3600 * 1000)
            if (days >= 1 && days <= 7) {
                return Math.floor(days) + '天前'
            } else if (days < 1) {
                const time = Math.floor(timeDifference / (3600 * 1000))
                if (time) {
                    return Math.floor(timeDifference / (3600 * 1000)) + '小时前'
                } else {
                    return '刚刚'
                }
            } else {
                return moment(updatedAt).format('YYYY-MM-DD')
            }
        }
    },
    methods: {
        toBlogDetail() {
            window.location.href= env.WEB_URL + '/blog/detail?' + qs.stringify({blogId: this.blog._id})
        }
    }
}
