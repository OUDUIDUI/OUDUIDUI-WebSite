<template>
  <div>
    <!--  PC NAV  -->
    <div class="pc">
      <div class="d-flex flex-column align-items-center">
        <div class="line" />
        <div class="container row">
          <div class="col-sm text-center">
            <span>我</span>
          </div>
          <div class="col-sm text-center">
            <span>博客</span>
          </div>
          <div class="col-sm text-center">
            <span>作品</span>
          </div>
          <div class="col-sm text-center">
            <span>关于</span>
          </div>
          <div class="col-sm text-center d-flex justify-content-between">
            <img src="~/static/icon/nav/github.svg" alt="github">
            <img src="~/static/icon/nav/yuque.svg" alt="yuque">
            <img src="~/static/icon/nav/subscription.svg" alt="subscription">
            <img src="~/static/icon/nav/email.svg" alt="email">
          </div>
        </div>
        <div class="line" />
      </div>
    </div>

    <!--  MB NAV  -->
    <div class="mobile">
      <div class="bg-white nav-modal d-flex flex-column justify-content-center align-items-center"
           :class="isNavToggle ? 'active' : ''">
        <div class="text-center">我</div>
        <div class="text-center">博客</div>
        <div class="text-center">作品</div>
        <div class="text-center">关于</div>
      </div>
      <div class="container d-flex align-items-center justify-content-between">
        <div class="left d-flex">
          <img src="~/static/icon/nav/github.svg" alt="github">
          <img src="~/static/icon/nav/yuque.svg" alt="yuque">
          <img src="~/static/icon/nav/subscription.svg" alt="subscription">
          <img src="~/static/icon/nav/email.svg" alt="email">
        </div>
        <div class="right" @click="isNavToggle = !isNavToggle"
             :class="isNavToggle ? 'active' : ''">
          <div class="line" />
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./Nav.js"></script>

<style src="./Nav.css" scoped></style>
