<template>
  <div class="alert-main"
       v-if="isShow"
       :class="{'danger':isDanger}">
    {{message}}
  </div>
</template>

<script>
export default {
  name: "Alert",
  props:{
    message:{
      type:String,
      required: true
    },
    isDanger:{
      type:Boolean,
      default: false
    }
  },
  data(){
    return{
      isShow:false
    }
  },
  watch:{
    isShow(){
      if(this.isShow){
        setTimeout(()=>{
          this.isShow = false
        },1500)
      }
    }
  }
}
</script>

<style scoped>
.alert-main{
  min-width: 280px;
  max-width: 90%;
  background: #fff;
  border: 1px solid #333;
  position: fixed;
  top: 20px;
  padding: 15px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  text-align: center;
  box-shadow: 3px 3px 3px rgba(0,0,0,.2);
  z-index: 9999;
}

.alert-main.danger{
  background: #333;
  color: #fff;
}

@media screen and (max-width: 576px) {
  .alert-main{
    font-size: 12px;
    padding: 10px;
  }
}
</style>
