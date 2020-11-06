export default {
  name: "BlogNav",
  data(){
    return{
      navs:[
        {id:0,label:'全部'},
        {id:1,label:'编程'},
        {id:2,label:'设计剪辑'}
      ],
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
    }
  }
}
