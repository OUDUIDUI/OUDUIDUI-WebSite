<template>
    <div class="container user-select-none">
       <nav class="d-flex justify-content-end">
           <!--  search  -->
           <div class="search justify-content-end align-items-center"
                :class="isOpenSearch ? 'active' : ''">
               <img src="~/static/icon/blog/search.svg"
                    alt="search" @click="searchAnimation(true)">
               <input type="text" v-if="isOpenSearch"
                      placeholder="Search..." v-model="searchContent"
                      @keyup.enter="search" />
               <img src="~/static/icon/blog/x.svg"
                    @click="searchAnimation(false)"
                    alt="close"
                    v-if="isOpenSearch">
           </div>
       </nav>

        <!--  List  -->
        <WFList :list="resources" :type="1" />

        <div class="tips" v-if="tip">{{ tip }}</div>
    </div>
</template>

<script>
import apiList from '@/utils/apiList'
import WFList from "@/components/WFList/index.vue"
import qs from 'qs'

export default {
    name: "resource",
    head(){
        return{
            title: "推荐导航",
        }
    },
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

</script>

<style scoped>
.search {
    display: flex;
    margin-right: 30px;
}

.search.active {
    border-bottom: 1px solid var(--color-white);
}

.search img {
    height: 20px;
    width: 20px;
    cursor: pointer;
    margin: 5px;
}

.search input {
    border: none;
    height: 20px;
    width: 100%;
    padding: 5px;
    font-weight: 300;
    background: var(--color-bg);
    color: var(--color-white) !important;
}

.tips {
    color: var(--color-white)!important;
    font-size: 14px;
    font-weight: 200;
    text-align: center;
}

@media screen and (max-width: 576px) {
    .search {
        margin-left: 10px;
        margin-right: 10px;
        width: 100%;
    }
}

</style>

