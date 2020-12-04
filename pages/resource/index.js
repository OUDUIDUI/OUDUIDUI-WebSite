import apiList from '@/utils/apiList'
import WFList from "@/components/WFList/index.vue"
import qs from 'qs'

export default {
    name: "index",
    components:{
        WFList
    },
    data(){
        return{
            searchContent: '',
            isOpenSearch: false,

            tip:'',
        }
    },
    async asyncData({$axios,error}){
        const method = apiList.resource.list.method;
        const url = apiList.resource.list.url + '?' + qs.stringify({sort:'points'}) ;
        const {data} = await $axios[method](url)

        if (data.success) {
            return {
                resources: data.data
            }
        } else {
            error({ statusCode: 404, message: 'Post not found' })
        }
    },
    mounted() {
        if(!this.resources.length){
            this.tip = '暂无内容'
        }else {
            this.tip = ''
        }
    },
    methods:{
        async searchAnimation(isOpenSearch) {
            this.isOpenSearch = isOpenSearch
            if (this.isSearch && this.searchContent) {
                this.isSearch = false
                await this.getData();
            }

            if (!isOpenSearch) {
                this.searchContent = ''
            }
        },
        async search() {
            this.isSearch = true
            await this.getData(this.searchContent)
        },

        async getData(keyword){
            const query = {sort: 'points'};
            if(keyword){
                query.keyword = keyword;
            }

            const method = apiList.resource.list.method;
            const url = apiList.resource.list.url + '?' + qs.stringify(query) ;
            const { data } = await this.$axios[method](url);
            if (data.success) {
                this.resources = data.data;

                if(!this.resources.length && this.searchContent){
                    this.tip = '暂无搜索结果'
                }else if(!this.resources.length && !this.searchContent){
                    this.tip = '暂无搜索内容'
                }else {
                    this.tip = ''
                }
            }
        }
    }
}
