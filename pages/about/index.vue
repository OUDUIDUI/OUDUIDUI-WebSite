<template>
    <div class="container user-select-none">
        <!--    Nav    -->
        <PageNav @checkoutNav="checkoutNav"
             ref="blogNav"
             :navs="navs" :need-search="false" />
        <div class="main">
        <!--    About    -->
        <div class="about" v-if="isAboutPage">
            <!--    Platform    -->
            <div class="platform">
              <div class="title">平台</div>
              <div class="content">
              <div v-for="(platform,index) in platforms" :key="index"
                 class="item d-flex mr-5 mt-3 mb-3"
                 @click="openUrl(platform)">
                  <img :src="platform.icon" :alt="platform.label">
                  <span class="pl-3">{{platform.label}}</span>
              </div>
          </div>
        </div>

            <!--    Technology stack    -->
            <div class="stack">
            <div class="title">技术栈</div>
            <div class="content">
                <div v-for="stack in stacks" :key="stack.title">
                    <div class="stack-title">{{stack.title}}：</div>
                    <div v-for="item in stack.stacks"
                         class="item d-flex mr-5 mt-3 mb-3"
                         @click="openUrl(item)">
                        <img :src="item.icon" :alt="item.label">
                        <span class="pl-3">{{item.label}}</span>
                    </div>
                </div>
            </div>
        </div>

            <!--    Contact    -->
            <div class="contact">
                <div class="title">联系我</div>
                <div class="content" @click="contactMe">oushihao97@163.com</div>
          </div>
        </div>
    </div>

        <Modal ref="subscriptionModal">
            <div class="d-flex flex-column align-items-center justify-content-center">
                <img :src="modelContent.imageUrl"
                     class="qr-code"
                     :alt="modelContent.label">
                <div class="modal-text">扫描关注{{modelContent.label}}</div>
            </div>
        </Modal>
    </div>
</template>

<script src="./index.js"></script>

<style src="./index.css" scoped></style>
