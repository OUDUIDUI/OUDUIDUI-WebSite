import BlogNav from '@/components/BlogNav/index.vue'
import BlogList from '@/components/BlogList/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import BlogCategory from '@/components/BlogCategory/index.vue'
import apiList from '@/utils/apiList'
import qs from 'qs'
import moment from 'moment'
import env from '@/utils/env'

export default {
  name: "index",
  components:{
    BlogNav,BlogList,Pagination,BlogCategory
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
      showNavIndex:0,
      ITCategory:'',
      UICategory:''
    }
  },
  async asyncData({query,$axios,error}){
    if(!query){
      query = {limit:10,sort:'updatedAt'};
    }else {
      query.limit = 10;
      query.sort = 'updatedAt'
    }

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
    else{
      error({ statusCode: 404, message: 'Post not found' })
    }
  },
  async mounted() {
    this.ITCategory = await this.getCategoryList(env.BLOG_IT_ID);
    this.UICategory = await this.getCategoryList(env.BLOG_UI_ID);
  },
  methods:{
    async getAllData(){
      this.query.limit = 10;
      this.query.sort = 'updatedAt';
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
      this.$refs.blogNav.checkoutNav(0);
    },

    // 初始化数据
    async initList(){
      this.query = {};
      await this.getAllData();
    },

    // 切换类型
    checkoutNav(nav){
      this.showNavIndex = nav.id;
      this.query = {};
      if(this.showNavIndex === 0 && this.$route.query.keyword){
        this.$router.push('/blog')
        this.getAllData();
      }
    },

    // 获取分类目录
    async getCategoryList(id){
      const method = apiList.blog.category.method;
      let url = apiList.blog.category.url.replace('{id}',id)
      const {data} = await this.$axios[method](url);

      if(data.success){
        this.formatCategory(data.category)
        return {category:data.category,articles:data.articles}
      }
    },

    // 处理分类目录数据
    formatCategory(category){
      category.forEach(item => {
        item.isDown = true;
        if(item.updatedAt){
          item.updatedAt = moment(item.updatedAt).format("YYYY-MM-DD");
        }
        if(item.children){
          this.formatCategory(item.children)
        }
      })
    }
  }
}
