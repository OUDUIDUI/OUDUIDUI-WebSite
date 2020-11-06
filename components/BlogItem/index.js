export default {
  name: "index",
  props:{
    blog:{
      type: Object,
      required: true
    }
  },
  computed:{
    updatedAt(){
      const dataNow = new Date();
      const updatedAt = new Date(this.blog.updatedAt);
      const timeDifference = dataNow.getTime() - updatedAt.getTime();
      const days = timeDifference / (24*3600*1000);
      if(days >= 1 && days <= 7){
        return Math.floor(days) + '天前'
      }else if(days < 1){
        return Math.floor(timeDifference / (3600*1000)) + '小时前'
      }else {
        return updatedAt;
      }
    }
  }
}