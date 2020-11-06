import BlogItem from "../BlogItem/index.vue"

export default {
  name: "index",
  components:{
    BlogItem
  },
  props:{
    blogList:{
      type: Array,
      required: true
    }
  },
  data(){
    return{
      leftList:[],
      rightList:[],
      heights:[]
    }
  },
  mounted() {
    this.initList();
  },
  methods:{
    initList(){
      for(let blog of this.blogList){
        this.waterfall(blog);
      }
    },

    // 瀑布流布局
    async waterfall(blog){
      if(!this.leftList.length){
        this.leftList.push(blog);
        return;
      }

      if(!this.rightList.length){
        this.rightList.push(blog);
        return;
      }

      const isLeft = await this.getHeight();

      if(isLeft){
        this.leftList.push(blog);
      }else {
        this.rightList.push(blog);
      }
    },

    // 获取高度
    async getHeight(){
      const heights = [0,0];

      return new Promise(resolve => {
       setTimeout(()=>{
         this.$refs.left.forEach(el => {
           heights[0] += el.$el.offsetHeight
         })
         this.$refs.right.forEach(el => {
           heights[1] += el.$el.offsetHeight
         })
         resolve(heights[0] < heights[1]) ;
       },50)
      })
    }
  }
}
