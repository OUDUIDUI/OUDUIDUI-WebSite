export default {
  name: "BlogNav",
  props:{
    navs:{
      type:Array,
      required: true
    },
    needSearch:{
      type:Boolean,
      default: false
    }
  },
  data(){
    return{
      activeIndex: 0,
      isOpenNav:false,

      searchContent:'',
      isOpenSearch: false,
    }
  },
  methods:{
    searchAnimation(isOpenSearch){
      this.isOpenSearch = isOpenSearch;
      if(!isOpenSearch){
        this.searchContent = '';
      }
    },

    navAnimation(){
      this.isOpenNav = !this.isOpenNav;
    },

    checkoutNav(i){
      this.activeIndex = i;
      this.isOpenNav = false;
      this.$emit('checkoutNav',this.navs[i])
    },

    search(){
      this.$emit('search',this.searchContent)
    }
  }
}
