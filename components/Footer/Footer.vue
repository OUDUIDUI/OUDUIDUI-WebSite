<template>
  <footer class="d-flex flex-column align-items-center footer">
    <div class="line" />
    <div class="container d-flex flex-column align-items-end">
      <p>© 2020 ouduidui.cn, All Rights Reserved</p>
      <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">
        粤ICP备19153295号
      </a>
    </div>
  </footer>
</template>

<style scoped>
.footer{
  margin-bottom: 35px;
}

.line{
  width: 99vw;
  height: 1px;
  background: #333333;
  margin-bottom: 20px;
}

p,a{
  font-size: 14px;
  font-weight: 300;
  margin: 0;
}

p{
  padding-bottom: 4px;
}

@media screen and (max-width: 576px) {
  .footer{
    margin-bottom: 25px;
  }

  .line{
    width: 100vw;
    margin-bottom: 15px;
  }

  p,a{
    font-size: 12px;
    font-weight: 200;
  }

  p{
    padding-bottom: 0;
  }
}
</style>
