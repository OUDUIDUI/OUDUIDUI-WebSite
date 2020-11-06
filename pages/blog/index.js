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
      const method = apiList.blog.list.method;
      let url = apiList.blog.list.url + '?' + qs.stringify(this.query);
      const {data} = await this.$axios[method](url);

      if(data.success){
        this.blogs = data.data;
        this.pagination = data.pagination
      }
    },
    async togglePage(page){
      this.query.page = page;
      await this.getAllData();
    }
  }
}
