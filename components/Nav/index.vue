<template>
  <div class="user-select-none">
    <!--  PC NAV  -->
    <div class="pc">
      <div class="d-flex flex-column align-items-center">
        <div class="line" />
        <div class="container row user-select-none">
          <div class="col-sm text-center focus"
               :class="routeIndex === 0 ? 'text-red' : ''"
               @click="checkoutRoute(0)">
            <span class="user-select-none">我</span>
          </div>
          <div class="col-sm text-center focus"
               :class="routeIndex === 1 ? 'text-red' : ''"
               @click="checkoutRoute(1)">
            <span class="user-select-none">博客</span>
          </div>
          <div class="col-sm text-center focus"
               :class="routeIndex === 2 ? 'text-red' : ''"
               @click="checkoutRoute(2)">
            <span class="user-select-none">作品</span>
          </div>
          <div class="col-sm text-center focus"
               :class="routeIndex === 3 ? 'text-red' : ''"
               @click="checkoutRoute(3)">
            <span class="user-select-none">关于</span>
          </div>
          <div class="col-sm text-center d-flex align-items-center justify-content-between">
            <img src="~/static/icon/nav/github.svg"
                 @click="contentMe('github')"
                 alt="github" class="focus">
            <img src="~/static/icon/nav/yuque.svg"
                 @click="contentMe('yuque')"
                 alt="yuque" class="focus">
            <img src="~/static/icon/nav/subscription.svg"
                 @click="contentMe('subscription')"
                 alt="subscription" class="focus">
            <img src="~/static/icon/nav/email.svg"
                 @click="contentMe('email')"
                 alt="email" class="focus">
          </div>
        </div>
        <div class="line" />
      </div>
    </div>

    <!--  MB NAV  -->
    <div class="mobile">
      <div class="bg-white nav-modal d-flex flex-column
      justify-content-center align-items-center user-select-none"
           :class="isNavToggle ? 'active' : ''">
        <div class="text-center focus"
             :class="routeIndex === 0 ? 'text-red' : ''"
             @click="checkoutRoute(0)">
          我
        </div>
        <div class="text-center focus"
             :class="routeIndex === 1 ? 'text-red' : ''"
             @click="checkoutRoute(1)">
          博客
        </div>
        <div class="text-center focus"
             :class="routeIndex === 2 ? 'text-red' : ''"
             @click="checkoutRoute(2)">
          作品
        </div>
        <div class="text-center focus"
             :class="routeIndex === 3 ? 'text-red' : ''"
             @click="checkoutRoute(3)">
          关于
        </div>
      </div>
      <div class="container d-flex align-items-center justify-content-between">
        <div class="left d-flex">
          <img src="~/static/icon/nav/github.svg"
               @click="contentMe('github')"
               class="focus" alt="github">
          <img src="~/static/icon/nav/yuque.svg"
               @click="contentMe('yuque')"
               class="focus" alt="yuque">
          <img src="~/static/icon/nav/subscription.svg"
               @click="contentMe('subscription')"
               class="focus" alt="subscription">
          <img src="~/static/icon/nav/email.svg"
               @click="contentMe('email')"
               class="focus" alt="email">
        </div>
        <div class="right" @click="isNavToggle = !isNavToggle"
             :class="isNavToggle ? 'active' : ''">
          <div class="line" />
        </div>
      </div>
    </div>

    <Modal ref="subscriptionModal">
      <div class="d-flex flex-column align-items-center justify-content-center">
        <img src="~/static/image/nav/subscription.jpeg"
             class="qr-code"
             alt="公众号">
        <div class="modal-text">扫描关注公众号</div>
      </div>
    </Modal>
  </div>
</template>

<script src="./index.js"></script>

<style src="./index.css" scoped></style>
