import moment from 'moment'
import apiList from '@/utils/apiList'

export default {
    name: 'index',
    props: {
        resource: {
            type: Object,
            required: true
        }
    },
    methods: {
        async toResource() {
            window.open(this.resource.link, '_blank');
            // 上报点击率
            const method = apiList.resource.point.method
            let url = apiList.resource.point.url
                .replace("{id}",this.resource._id)
            const { data } = await this.$axios[method](url);
        }
    }
}
