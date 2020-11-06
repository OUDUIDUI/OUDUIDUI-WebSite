import BlogNav from '@/components/BlogNav/index.vue'
import BlogList from '@/components/BlogList/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import apiList from '@/utils/apiList'
import qs from 'qs'

export default {
  name: "index",
  components:{
    BlogNav,BlogList,Pagination
  },
  computed:{
    tip(){
      if(!this.blogs.length && this.query.keyword){
        return '暂无搜索结果。'
      }
    }
  },
  data(){
    return{
      navs:[
        {id:0,label:'全部'},
        {id:1,label:'编程'},
        {id:2,label:'设计剪辑'}
      ],
    }
  },
  async asyncData({$axios}){
    const query = {limit:10};
    const method = apiList.blog.list.method;
    let url = apiList.blog.list.url + '?' + qs.stringify(query);
    const {data} = await $axios[method](url);

    if(data.success){
      return {
        query,
        pagination:data.pagination,
        blogs:data.data
      }
    }
  },
  methods:{
    async getAllData(){
      this.query.limit = 10;
      const method = apiList.blog.list.method;
      let url = apiList.blog.list.url + '?' + qs.stringify(this.query);
      const {data} = await this.$axios[method](url);

      if(data.success){
        this.blogs = data.data;
        this.pagination = data.pagination
      }
    },
    // 翻页
    async togglePage(page){
      this.query = {page};
      await this.getAllData();
    },

    // 搜索
    async search(keyword){
      this.query = {keyword};
      await this.getAllData();
    },

    // 切换类型
    checkoutNav(nav){
      console.log(nav);
    }
  }
}
