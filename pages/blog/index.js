import BlogNav from '@/components/BlogNav/BlogNav.vue'
import apiList from '@/utils/apiList'

export default {
  name: "index",
  components:{
    BlogNav
  },
  async asyncData({$axios}){
    const api = apiList.blog.list;
    const {data} = await $axios[api.methods](api.url);
    return data;
  }
}
