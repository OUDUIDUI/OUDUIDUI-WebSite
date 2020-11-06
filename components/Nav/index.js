import Modal from '~/components/Modal/index.vue'

export default {
  name: 'Nav',
  components:{
    Modal
  },
  data(){
    return{
      isNavToggle:false,
      routeIndex:0
    }
  },
  mounted() {
    this.initRouteIndex();
  },
  methods:{
    initRouteIndex(){
      const fullPath = this.$route.fullPath;
      if(fullPath.includes('blog')){
        this.routeIndex = 1;
      }else {
        this.routeIndex = 0;
      }
    },

    checkoutRoute(i){
      this.routeIndex = i;
      this.isNavToggle = false;
      const paths = ['/','/blog','/','/'];
      this.$router.push(paths[i]);
    },

    contentMe(type){
      switch (type){
        case 'github':
          window.open("https://github.com/OUDUIDUI","_blank")
          break;
        case 'yuque':
          window.open(
            "https://www.yuque.com/books/share/1e1b68a5-fefd-4647-a3db-8266e73072e6?#",
            "_blank")
          break;
        case 'subscription':
          this.$refs.subscriptionModal.toggleModal();
          break;
        case 'email':
          location = 'mailto: oushihao97@163.com'
          break;
      }
    }
  }
}
