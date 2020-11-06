export default {
  name: "index",
  props:{
    pagination:{
      type:Object,
      required:true
    }
  },
  mounted() {
    this.currentPage = this.pagination.currentPage;
  },
  data(){
    return{
      currentPage:1
    }
  },
  computed:{
    middlePages(){
      const count = this.pagination.pages;
      if(count <= 2){
        return 0;
      }else if(count > 2 && count <= 10){
        return count - 2;
      }else {
        return this.currentPage >999 ? 5 : 8;
      }
    },
    bigLimit(){
      return this.middlePages > 5 ?
        this.pagination.pages - 6 :
        this.pagination.pages - 3;
    },
    offset(){
      if(this.currentPage <= 5){
        return 2;
      }else if(this.currentPage >= this.bigLimit){
        return this.bigLimit - 2;
      }else {
        return this.middlePages > 5 ?
          this.currentPage -3 :
          this.currentPage -2;
      }
    }
  },
  methods:{
    resetPage(){
      this.currentPage = 1;
    },
    togglePage(i){
      this.$emit('togglePage',i);
      this.currentPage = i;
    },
    prevPage(){
      if(this.currentPage !== 1){
        this.togglePage(this.currentPage - 1)
      }
    },
    nextPage(){
      if(this.currentPage !== this.pagination.pages){
        this.togglePage(this.currentPage + 1)
      }
    }
  }
}
