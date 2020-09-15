import lottie from 'lottie-web';
import animationData from '../static/bodymovin/logo.json'

export default {
  mounted() {
    this.webInit();
  },
  methods:{
    webInit(){
      lottie.loadAnimation({
        container: document.getElementById('logo'),
        renderer: 'svg',
        autoplay: false,
        loop:false,
        animationData:animationData
      });
      lottie.play()
    }
  }
}
