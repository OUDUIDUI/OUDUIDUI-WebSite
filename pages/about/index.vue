<template>
    <div class="container main user-select-none">
        <!--    About    -->
        <div class="about">
            <!--    Platform    -->
            <div class="platform">
                <div class="title">平台</div>
                <div class="content">
                    <div v-for="(platform,index) in platforms" :key="index"
                         class="item d-flex mr-5 mt-3 mb-3"
                         @click="openUrl(platform)">
                        <img :src="platform.icon" :alt="platform.label">
                        <span class="pl-3">{{ platform.label }}</span>
                    </div>
                </div>
            </div>

            <!--    Technology stack    -->
            <div class="stack">
                <div class="title">技术栈</div>
                <div class="content">
                    <div v-for="stack in stacks" :key="stack.title">
                        <div class="stack-title">{{ stack.title }}：</div>
                        <div v-for="item in stack.stacks"
                             class="item d-flex mr-5 mt-3 mb-3"
                             @click="openUrl(item)">
                            <img :src="item.icon" :alt="item.label">
                            <span class="pl-3">{{ item.label }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!--    Contact    -->
            <div class="contact">
                <div class="title">联系我</div>
                <div class="content" @click="contactMe">oushihao97@163.com</div>
            </div>

            <!--    Subscription    -->
            <div class="subscription">
                <div class="title">订阅</div>
                <div class="content">
                    <div class="btn" @click="openSubscription">当有新的博客时请通知我</div>
                </div>
            </div>
        </div>

        <Modal ref="WXModal">
            <div class="d-flex flex-column align-items-center justify-content-center">
                <img :src="modelContent.imageUrl"
                     class="qr-code"
                     :alt="modelContent.label">
                <div class="modal-text">扫描关注{{ modelContent.label }}</div>
            </div>
        </Modal>

        <Modal ref="subscriptionModal">
            <div class="check-userinfo">
                <div class="modal-title">个人信息</div>
                <input class="modal-input" type="text"
                       v-model="subscriptionInfo.nickName"
                       placeholder="请输入你的昵称">
                <input class="modal-input" type="email"
                       v-model="subscriptionInfo.email"
                        placeholder="请输入你的邮箱">
                <button class="modal-btn" @click="commit">提交</button>
            </div>
        </Modal>

        <Alert :message="alert.message" :is-danger="alert.isDanger" ref="alert" />
    </div>
</template>

<script src="./index.js" />

<style src="./index.css" scoped />

