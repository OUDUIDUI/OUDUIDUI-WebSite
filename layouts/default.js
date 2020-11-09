import Header from '~/components/Header/index.vue'
import Nav from '~/components/Nav/index.vue'
import Footer from '~/components/Footer/index.vue'
import {mapState } from 'vuex'

export default {
  name: "default",
  components:{
    Header,
    Nav,
    Footer
  },
  computed:{
    ...mapState(['cid'])
  },
  mounted() {
    // 生成cid
    if(!this.cid) this.$store.commit('getCid');
  }
}
